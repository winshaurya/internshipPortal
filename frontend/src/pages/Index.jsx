import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GraduationCap,
  Users,
  Briefcase,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { logout as logoutAction } from "@/store/slices/authSlice";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const isAuthenticated = Boolean(token);
  const displayName =
    user?.name || user?.email?.split("@")[0] || "User";

  const handleLogout = () => {
    dispatch(logoutAction());
    setMobileMenuOpen(false);
  };

  const features = [
    {
      icon: Users,
      title: "Alumni Network",
      description:
        "Connect with SGSITS alumni working in top companies worldwide",
    },
    {
      icon: Briefcase,
      title: "Job Opportunities",
      description:
        "Access exclusive job postings and internships from alumni companies",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description:
        "Get mentorship and career guidance from experienced professionals",
    },
    {
      icon: CheckCircle,
      title: "Quality Matches",
      description:
        "Smart matching based on your skills, branch, and preferences",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg sm:text-xl font-bold">
                SGSITS Alumni Portal
              </span>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <span className="font-medium">Welcome, {displayName}</span>
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button variant="gradient" asChild>
                    <Link to="/signup">Get Started</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-accent/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95">
            <div className="px-4 py-3 flex flex-col gap-2">

              {isAuthenticated ? (
                <>
                  <p className="px-4 py-2 font-medium">Welcome, {displayName}</p>
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    asChild
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to="/login">Sign In</Link>
                  </Button>

                  <Button
                    variant="gradient"
                    asChild
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to="/signup">Get Started</Link>
                  </Button>
                </>
              )}

            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bridge Your Career with
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                {" "}
                SGSITS Alumni
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Connect with alumni, discover exclusive job opportunities, and accelerate your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="lg" asChild>
                <Link to="/signup/student">
                  Join as Student
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/signup/alumni">Join as Alumni</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose SGSITS Alumni Portal?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <span className="font-semibold">SGSITS Alumni Portal</span>
            <span className="text-sm text-muted-foreground">
              Ac 2025 All rights reserved.
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
