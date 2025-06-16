
import { useState } from "react";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JobApplicationList from "@/components/JobApplicationList";
import StatsCards from "@/components/StatsCards";
import Header from "@/components/Header";
import AuthForm from "@/components/auth/AuthForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import QuickStatsCard from "@/components/QuickStatsCard";
import TipsCard from "@/components/TipsCard";
import ApplicationModal from "@/components/ApplicationModal";
import LandingPage from "@/components/LandingPage";
import { JobApplication } from "@/types/JobApplication";
import { useAuth } from "@/hooks/useAuth";
import { useApplications } from "@/hooks/useApplications";

const Index = () => {
  const { user, loading } = useAuth();
  const { applications, dataLoading, addApplication, updateApplication, deleteApplication } = useApplications(user);
  const [showForm, setShowForm] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null);

  const handleEditApplication = (application: JobApplication) => {
    setEditingApplication(application);
    setShowForm(true);
  };

  const handleUpdateApplication = async (updatedApplication: Omit<JobApplication, 'id' | 'createdAt'>) => {
    if (!editingApplication) return;
    await updateApplication(editingApplication, updatedApplication);
    setShowForm(false);
    setEditingApplication(null);
  };

  const handleAddApplication = async (application: Omit<JobApplication, 'id' | 'createdAt'>) => {
    await addApplication(application);
    setShowForm(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingApplication(null);
  };

  const handleGetStarted = () => {
    setShowAuthForm(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthForm(false);
  };

  // Show loading spinner while checking auth
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show auth form if user clicked get started
  if (showAuthForm && !user) {
    return <AuthForm onSuccess={handleAuthSuccess} />;
  }

  // Show landing page if user is not authenticated
  if (!user) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header with welcome message */}
        <div className="mb-8">
          <Header />
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-gray-600">
              {applications.length === 0 
                ? "Ready to start tracking your job applications? Add your first one below!"
                : `You have ${applications.length} application${applications.length === 1 ? '' : 's'} tracked. Keep up the great work!`
              }
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl flex-1 sm:flex-none"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Application
          </Button>
          {applications.length > 0 && (
            <div className="text-sm text-gray-600 flex items-center">
              <Sparkles className="w-4 h-4 mr-1 text-yellow-500" />
              {applications.filter(app => app.status === 'applied').length} applications awaiting response
            </div>
          )}
        </div>

        {/* Stats Cards - Only show if user has applications */}
        {applications.length > 0 && (
          <div className="mb-8">
            <StatsCards applications={applications} />
          </div>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Applications List */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between text-xl">
                  <span>Your Applications</span>
                  {applications.length > 0 && (
                    <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {applications.length} total
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {dataLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your applications...</p>
                  </div>
                ) : (
                  <JobApplicationList 
                    applications={applications}
                    onEdit={handleEditApplication}
                    onDelete={deleteApplication}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {applications.length > 0 ? (
              <>
                <QuickStatsCard applications={applications} />
                <TipsCard />
              </>
            ) : (
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-center">Getting Started</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="text-6xl mb-4">🚀</div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Start your job search journey by adding your first application. 
                    Track companies, positions, and application status all in one place!
                  </p>
                  <Button 
                    onClick={() => setShowForm(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Application
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Job Application Form Modal */}
        <ApplicationModal
          isOpen={showForm}
          onClose={handleCloseForm}
          onSubmit={editingApplication ? handleUpdateApplication : handleAddApplication}
          editingApplication={editingApplication}
        />
      </div>
    </div>
  );
};

export default Index;
