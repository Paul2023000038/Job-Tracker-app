
export interface JobApplication {
  id: string;
  company: string;
  position: string;
  location: string;
  salary?: string;
  status: 'applied' | 'interview_scheduled' | 'interviewing' | 'offer' | 'rejected' | 'accepted' | 'withdrawn';
  appliedDate: string;
  source: string;
  notes?: string;
  contactPerson?: string;
  contactEmail?: string;
  jobUrl?: string;
  createdAt: string;
}

export const statusLabels = {
  applied: 'Applied',
  interview_scheduled: 'Interview Scheduled',
  interviewing: 'Interviewing',
  offer: 'Offer Received',
  rejected: 'Rejected',
  accepted: 'Accepted',
  withdrawn: 'Withdrawn'
};

export const statusColors = {
  applied: 'bg-blue-100 text-blue-800',
  interview_scheduled: 'bg-yellow-100 text-yellow-800',
  interviewing: 'bg-purple-100 text-purple-800',
  offer: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  accepted: 'bg-emerald-100 text-emerald-800',
  withdrawn: 'bg-gray-100 text-gray-800'
};
