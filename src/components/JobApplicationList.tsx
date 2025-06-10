
import { useState } from "react";
import { MoreHorizontal, ExternalLink, Pencil, Trash2, MapPin, DollarSign, Calendar, Building } from "lucide-react";
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
      <div className="text-center py-12">
        <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
        <p className="text-gray-500">Start tracking your job applications by adding your first one!</p>
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

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <div
          key={app.id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-white cursor-pointer"
          onClick={() => toggleCard(app.id)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{app.position}</h3>
                  <p className="text-gray-600 font-medium">{app.company}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {app.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(app.appliedDate)}
                    </span>
                    {app.salary && (
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {app.salary}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[app.status]}`}>
                    {statusLabels[app.status]}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white border shadow-lg">
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(app); }}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      {app.jobUrl && (
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); window.open(app.jobUrl, '_blank'); }}>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Job
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
          </div>

          {expandedCard === app.id && (
            <div className="mt-4 pt-4 border-t border-gray-200 animate-fade-in">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600"><strong>Source:</strong> {app.source}</p>
                  {app.contactPerson && (
                    <p className="text-gray-600"><strong>Contact:</strong> {app.contactPerson}</p>
                  )}
                  {app.contactEmail && (
                    <p className="text-gray-600"><strong>Email:</strong> {app.contactEmail}</p>
                  )}
                </div>
                <div>
                  <p className="text-gray-600"><strong>Applied:</strong> {formatDate(app.appliedDate)}</p>
                  <p className="text-gray-600"><strong>Added:</strong> {formatDate(app.createdAt)}</p>
                </div>
              </div>
              {app.notes && (
                <div className="mt-3">
                  <p className="text-gray-600"><strong>Notes:</strong></p>
                  <p className="text-gray-700 mt-1">{app.notes}</p>
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
