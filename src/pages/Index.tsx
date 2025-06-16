
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JobApplicationForm from "@/components/JobApplicationForm";
import JobApplicationList from "@/components/JobApplicationList";
import StatsCards from "@/components/StatsCards";
import Header from "@/components/Header";
import AuthForm from "@/components/auth/AuthForm";
import { JobApplication } from "@/types/JobApplication";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  // Load applications from Supabase when user is authenticated
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

  const handleAddApplication = async (application: Omit<JobApplication, 'id' | 'createdAt'>) => {
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
        status: data.status,
        appliedDate: data.applied_date,
        source: data.source,
        notes: data.notes || '',
        contactPerson: data.contact_person || '',
        contactEmail: data.contact_email || '',
        jobUrl: data.job_url || '',
        createdAt: data.created_at,
      };

      setApplications(prev => [newApplication, ...prev]);
      setShowForm(false);
      
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

  const handleEditApplication = (application: JobApplication) => {
    setEditingApplication(application);
    setShowForm(true);
  };

  const handleUpdateApplication = async (updatedApplication: Omit<JobApplication, 'id' | 'createdAt'>) => {
    if (!editingApplication) return;

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
      setShowForm(false);
      setEditingApplication(null);
      
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

  const handleDeleteApplication = async (id: string) => {
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

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingApplication(null);
  };

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth form if user is not authenticated
  if (!user) {
    return <AuthForm onSuccess={() => {}} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with sign out */}
        <Header />

        {/* Add Application Button */}
        <div className="flex justify-end mb-8">
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Application
          </Button>
        </div>

        {/* Stats Cards */}
        <StatsCards applications={applications} />

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Applications List */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  Recent Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                {dataLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading applications...</p>
                  </div>
                ) : (
                  <JobApplicationList 
                    applications={applications}
                    onEdit={handleEditApplication}
                    onDelete={handleDeleteApplication}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="w-5 h-5 text-green-600" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="font-semibold text-blue-600">
                    {applications.filter(app => {
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return new Date(app.createdAt) > weekAgo;
                    }).length} applications
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Interview Rate</span>
                  <span className="font-semibold text-green-600">
                    {applications.length > 0 
                      ? Math.round((applications.filter(app => 
                          ['interview_scheduled', 'interviewing', 'offer', 'accepted'].includes(app.status)
                        ).length / applications.length) * 100)
                      : 0}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Response Rate</span>
                  <span className="font-semibold text-purple-600">
                    {applications.length > 0 
                      ? Math.round((applications.filter(app => 
                          app.status !== 'applied'
                        ).length / applications.length) * 100)
                      : 0}%
                  </span>
                </div>
              </CardContent>
            </Card>

            {applications.length > 0 && (
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                    Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 inline mr-2 text-green-500" />
                    Follow up on applications after 1-2 weeks
                  </div>
                  <div className="text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 inline mr-2 text-green-500" />
                    Customize your resume for each position
                  </div>
                  <div className="text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 inline mr-2 text-green-500" />
                    Research the company before interviews
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Job Application Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <JobApplicationForm
                onSubmit={editingApplication ? handleUpdateApplication : handleAddApplication}
                onClose={handleCloseForm}
                initialData={editingApplication}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
