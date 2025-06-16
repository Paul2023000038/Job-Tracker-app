
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, User, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
  };

  // Get user initials for avatar fallback
  const getUserInitials = (email: string) => {
    const name = email.split('@')[0];
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-1">Job Tracker</h1>
            <p className="text-lg text-gray-600">Manage your job applications and track your progress</p>
          </div>
        </div>
      </div>
      
      {user && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt={user.email} />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-semibold">
                {getUserInitials(user.email || '')}
              </AvatarFallback>
            </Avatar>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">Welcome back!</div>
              <div className="text-xs text-gray-600">{user.email}</div>
            </div>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
