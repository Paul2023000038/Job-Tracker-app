
import { TrendingUp, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TipsCard = () => {
  return (
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
  );
};

export default TipsCard;
