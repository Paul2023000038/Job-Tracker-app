
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JobApplication, statusLabels } from "@/types/JobApplication";

interface JobApplicationFormProps {
  onSubmit: (application: Omit<JobApplication, 'id' | 'createdAt'>) => void;
  onClose: () => void;
  initialData?: JobApplication | null;
}

const JobApplicationForm = ({ onSubmit, onClose, initialData }: JobApplicationFormProps) => {
  const [formData, setFormData] = useState({
    company: initialData?.company || '',
    position: initialData?.position || '',
    location: initialData?.location || '',
    salary: initialData?.salary || '',
    status: initialData?.status || 'applied',
    appliedDate: initialData?.appliedDate || new Date().toISOString().split('T')[0],
    source: initialData?.source || '',
    notes: initialData?.notes || '',
    contactPerson: initialData?.contactPerson || '',
    contactEmail: initialData?.contactEmail || '',
    jobUrl: initialData?.jobUrl || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {initialData ? 'Edit Application' : 'Add New Application'}
        </h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="company">Company *</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              placeholder="e.g., Google"
              required
            />
          </div>
          <div>
            <Label htmlFor="position">Position *</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => handleInputChange('position', e.target.value)}
              placeholder="e.g., Software Engineer"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="e.g., San Francisco, CA"
              required
            />
          </div>
          <div>
            <Label htmlFor="salary">Salary Range</Label>
            <Input
              id="salary"
              value={formData.salary}
              onChange={(e) => handleInputChange('salary', e.target.value)}
              placeholder="e.g., $80,000 - $120,000"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(statusLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="appliedDate">Applied Date *</Label>
            <Input
              id="appliedDate"
              type="date"
              value={formData.appliedDate}
              onChange={(e) => handleInputChange('appliedDate', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="source">Source *</Label>
            <Input
              id="source"
              value={formData.source}
              onChange={(e) => handleInputChange('source', e.target.value)}
              placeholder="e.g., LinkedIn, Indeed, Company Website"
              required
            />
          </div>
          <div>
            <Label htmlFor="jobUrl">Job Posting URL</Label>
            <Input
              id="jobUrl"
              type="url"
              value={formData.jobUrl}
              onChange={(e) => handleInputChange('jobUrl', e.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contactPerson">Contact Person</Label>
            <Input
              id="contactPerson"
              value={formData.contactPerson}
              onChange={(e) => handleInputChange('contactPerson', e.target.value)}
              placeholder="e.g., John Smith"
            />
          </div>
          <div>
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input
              id="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              placeholder="john.smith@company.com"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            placeholder="Add any additional notes about this application..."
            rows={3}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
            {initialData ? 'Update Application' : 'Add Application'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobApplicationForm;
