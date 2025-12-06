import { Search, Bell, MessageSquare, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold">✨ logo</div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs, companies..."
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
            />
          </div>
        </div>
      </div>
    </header>
  );
}