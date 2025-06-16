
import JobApplicationForm from "@/components/JobApplicationForm";
import { JobApplication } from "@/types/JobApplication";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (application: Omit<JobApplication, 'id' | 'createdAt'>) => void;
  editingApplication: JobApplication | null;
}

const ApplicationModal = ({ isOpen, onClose, onSubmit, editingApplication }: ApplicationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <JobApplicationForm
          onSubmit={onSubmit}
          onClose={onClose}
          initialData={editingApplication}
        />
      </div>
    </div>
  );
};

export default ApplicationModal;
