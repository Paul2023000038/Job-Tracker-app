
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, BarChart3, Calendar, Users, CheckCircle, ArrowRight } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const features = [
    {
      icon: Briefcase,
      title: "Track Applications",
      description: "Keep all your job applications organized in one place with detailed information about each opportunity."
    },
    {
      icon: BarChart3,
      title: "Visual Analytics",
      description: "See your application progress with clear statistics and insights to improve your job search."
    },
    {
      icon: Calendar,
      title: "Timeline Management",
      description: "Track application dates, interview schedules, and follow-up reminders efficiently."
    },
    {
      icon: Users,
      title: "Contact Tracking",
      description: "Store contact information for recruiters and hiring managers for easy follow-up."
    }
  ];

  const benefits = [
    "Never lose track of job applications again",
    "Improve your application success rate",
    "Stay organized throughout your job search",
    "Follow up at the right time with reminders"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Job Tracker</h1>
          </div>
          <Button 
            onClick={onGetStarted}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Get Started
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Track Your Job Search
            <span className="text-blue-600 block">Like a Pro</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Stop losing track of job applications. Organize, monitor, and optimize your job search 
            with our comprehensive tracking system.
          </p>
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
          >
            Start Tracking Applications
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Why Job Seekers Love Our Platform
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-4">Ready to Get Started?</h4>
              <p className="mb-6 opacity-90">
                Join thousands of job seekers who have organized their job search and landed their dream jobs.
              </p>
              <Button 
                onClick={onGetStarted}
                variant="secondary"
                className="w-full"
              >
                Create Your Free Account
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
            <div className="text-gray-600">Applications Tracked</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
            <div className="text-gray-600">Success Rate Improvement</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">2,500+</div>
            <div className="text-gray-600">Happy Job Seekers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
