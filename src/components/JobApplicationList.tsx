
import { useState } from "react";
import { MoreHorizontal, ExternalLink, Pencil, Trash2, MapPin, DollarSign, Calendar, Building, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { JobApplication, statusLabels, statusColors } from "@/types/JobApplication";

interface JobApplicationListProps {
  applications: JobApplication[];
  onEdit: (application: JobApplication) => void;
  onDelete: (id: string) => void;
}

const JobApplicationList = ({ applications, onEdit, onDelete }: JobApplicationListProps) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  if (applications.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-blue-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <Building className="w-12 h-12 text-blue-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">No applications yet</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Ready to land your dream job? Start by adding your first application and take control of your job search journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Track application status</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>Monitor your progress</span>
          </div>
        </div>
      </div>
    );
  }

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <div
          key={app.id}
          className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-200 bg-white cursor-pointer hover:border-blue-200"
          onClick={() => toggleCard(app.id)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{app.position}</h3>
                      <p className="text-gray-700 font-medium text-base">{app.company}</p>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${statusColors[app.status]} whitespace-nowrap ml-4`}>
                      {statusLabels[app.status]}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {app.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      Applied {getTimeAgo(app.appliedDate)}
                    </span>
                    {app.salary && (
                      <span className="flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4" />
                        {app.salary}
                      </span>
                    )}
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-60 hover:opacity-100">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white border shadow-lg z-50">
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(app); }}>
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit Application
                    </DropdownMenuItem>
                    {app.jobUrl && (
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); window.open(app.jobUrl, '_blank'); }}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Job Posting
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem 
                      onClick={(e) => { e.stopPropagation(); onDelete(app.id); }}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {expandedCard === app.id && (
            <div className="mt-5 pt-5 border-t border-gray-100 animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700 min-w-[80px]">Source:</span>
                    <span className="text-gray-600">{app.source}</span>
                  </div>
                  {app.contactPerson && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700 min-w-[80px]">Contact:</span>
                      <span className="text-gray-600">{app.contactPerson}</span>
                    </div>
                  )}
                  {app.contactEmail && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700 min-w-[80px]">Email:</span>
                      <span className="text-gray-600">{app.contactEmail}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700 min-w-[100px]">Applied:</span>
                    <span className="text-gray-600">{formatDate(app.appliedDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700 min-w-[100px]">Added:</span>
                    <span className="text-gray-600">{formatDate(app.createdAt)}</span>
                  </div>
                </div>
              </div>
              {app.notes && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-700 mb-2">Notes:</p>
                  <p className="text-gray-600 leading-relaxed">{app.notes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default JobApplicationList;
