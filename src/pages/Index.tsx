
import { useState } from "react";
import { Plus } from "lucide-react";
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
import { JobApplication } from "@/types/JobApplication";
import { useAuth } from "@/hooks/useAuth";
import { useApplications } from "@/hooks/useApplications";

const Index = () => {
  const { user, loading } = useAuth();
  const { applications, dataLoading, addApplication, updateApplication, deleteApplication } = useApplications(user);
  const [showForm, setShowForm] = useState(false);
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

  // Show loading spinner while checking auth
  if (loading) {
    return <LoadingSpinner />;
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
                    onDelete={deleteApplication}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats Sidebar */}
          <div className="space-y-6">
            <QuickStatsCard applications={applications} />
            {applications.length > 0 && <TipsCard />}
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
