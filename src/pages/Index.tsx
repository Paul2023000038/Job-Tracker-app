
import { useState, useEffect } from "react";
import { Plus, Briefcase, Clock, TrendingUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JobApplicationForm from "@/components/JobApplicationForm";
import JobApplicationList from "@/components/JobApplicationList";
import StatsCards from "@/components/StatsCards";
import { JobApplication } from "@/types/JobApplication";

const Index = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null);

  // Load applications from localStorage on component mount
  useEffect(() => {
    const savedApplications = localStorage.getItem('jobApplications');
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    }
  }, []);

  // Save applications to localStorage whenever applications change
  useEffect(() => {
    localStorage.setItem('jobApplications', JSON.stringify(applications));
  }, [applications]);

  const handleAddApplication = (application: Omit<JobApplication, 'id' | 'createdAt'>) => {
    const newApplication: JobApplication = {
      ...application,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setApplications(prev => [newApplication, ...prev]);
    setShowForm(false);
  };

  const handleEditApplication = (application: JobApplication) => {
    setEditingApplication(application);
    setShowForm(true);
  };

  const handleUpdateApplication = (updatedApplication: Omit<JobApplication, 'id' | 'createdAt'>) => {
    if (editingApplication) {
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
    }
  };

  const handleDeleteApplication = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingApplication(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Job Tracker</h1>
            <p className="text-lg text-gray-600">Manage your job applications and track your progress</p>
          </div>
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
                  <Briefcase className="w-6 h-6 text-blue-600" />
                  Recent Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <JobApplicationList 
                  applications={applications}
                  onEdit={handleEditApplication}
                  onDelete={handleDeleteApplication}
                />
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Recent Activity */}
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
