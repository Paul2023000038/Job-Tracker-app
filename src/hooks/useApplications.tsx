
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { JobApplication } from "@/types/JobApplication";
import { User } from "@supabase/supabase-js";

export const useApplications = (user: User | null) => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadApplications();
    } else {
      setApplications([]);
      setDataLoading(false);
    }
  }, [user]);

  const loadApplications = async () => {
    try {
      setDataLoading(true);
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedApplications: JobApplication[] = data.map(app => ({
        id: app.id,
        company: app.company,
        position: app.position,
        location: app.location || '',
        salary: app.salary || '',
        status: app.status as JobApplication['status'],
        appliedDate: app.applied_date,
        source: app.source,
        notes: app.notes || '',
        contactPerson: app.contact_person || '',
        contactEmail: app.contact_email || '',
        jobUrl: app.job_url || '',
        createdAt: app.created_at,
      }));

      setApplications(formattedApplications);
    } catch (error: any) {
      toast({
        title: "Error loading applications",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDataLoading(false);
    }
  };

  const addApplication = async (application: Omit<JobApplication, 'id' | 'createdAt'>) => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .insert([{
          user_id: user?.id,
          company: application.company,
          position: application.position,
          location: application.location,
          salary: application.salary,
          status: application.status,
          applied_date: application.appliedDate,
          source: application.source,
          notes: application.notes,
          contact_person: application.contactPerson,
          contact_email: application.contactEmail,
          job_url: application.jobUrl,
        }])
        .select()
        .single();

      if (error) throw error;

      const newApplication: JobApplication = {
        id: data.id,
        company: data.company,
        position: data.position,
        location: data.location || '',
        salary: data.salary || '',
        status: data.status as JobApplication['status'],
        appliedDate: data.applied_date,
        source: data.source,
        notes: data.notes || '',
        contactPerson: data.contact_person || '',
        contactEmail: data.contact_email || '',
        jobUrl: data.job_url || '',
        createdAt: data.created_at,
      };

      setApplications(prev => [newApplication, ...prev]);
      
      toast({
        title: "Application added",
        description: "Your job application has been saved successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error adding application",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateApplication = async (editingApplication: JobApplication, updatedApplication: Omit<JobApplication, 'id' | 'createdAt'>) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({
          company: updatedApplication.company,
          position: updatedApplication.position,
          location: updatedApplication.location,
          salary: updatedApplication.salary,
          status: updatedApplication.status,
          applied_date: updatedApplication.appliedDate,
          source: updatedApplication.source,
          notes: updatedApplication.notes,
          contact_person: updatedApplication.contactPerson,
          contact_email: updatedApplication.contactEmail,
          job_url: updatedApplication.jobUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingApplication.id);

      if (error) throw error;

      const updated: JobApplication = {
        ...updatedApplication,
        id: editingApplication.id,
        createdAt: editingApplication.createdAt,
      };

      setApplications(prev => 
        prev.map(app => app.id === editingApplication.id ? updated : app)
      );
      
      toast({
        title: "Application updated",
        description: "Your job application has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating application",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteApplication = async (id: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setApplications(prev => prev.filter(app => app.id !== id));
      
      toast({
        title: "Application deleted",
        description: "Your job application has been deleted.",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting application",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return {
    applications,
    dataLoading,
    addApplication,
    updateApplication,
    deleteApplication,
  };
};
