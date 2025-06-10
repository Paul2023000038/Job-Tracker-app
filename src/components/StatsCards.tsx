
import { Briefcase, Clock, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobApplication } from "@/types/JobApplication";

interface StatsCardsProps {
  applications: JobApplication[];
}

const StatsCards = ({ applications }: StatsCardsProps) => {
  const totalApplications = applications.length;
  const activeApplications = applications.filter(app => 
    !['rejected', 'accepted', 'withdrawn'].includes(app.status)
  ).length;
  const interviews = applications.filter(app => 
    ['interview_scheduled', 'interviewing', 'offer', 'accepted'].includes(app.status)
  ).length;
  const offers = applications.filter(app => 
    ['offer', 'accepted'].includes(app.status)
  ).length;
  const rejections = applications.filter(app => app.status === 'rejected').length;

  const stats = [
    {
      title: "Total Applications",
      value: totalApplications,
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Applications",
      value: activeApplications,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Interviews",
      value: interviews,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Offers",
      value: offers,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-full`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
