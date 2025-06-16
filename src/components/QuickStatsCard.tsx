
import { Clock, TrendingUp, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobApplication } from "@/types/JobApplication";

interface QuickStatsCardProps {
  applications: JobApplication[];
}

const QuickStatsCard = ({ applications }: QuickStatsCardProps) => {
  return (
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
  );
};

export default QuickStatsCard;
