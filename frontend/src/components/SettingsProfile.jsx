import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Save, Moon, Bell, Shield, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SettingsProfile() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "Harshita Pandey",
    email: "harshita@sgsits.ac.in",
    darkMode: false,
    emailNotifications: true,
    twoFactorAuth: false,
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* 🧍 Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <User className="w-5 h-5 text-primary" />
            Account Settings
          </CardTitle>
          <CardDescription>
            Manage your personal information and contact details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* 🌙 Theme Preference */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Moon className="w-5 h-5 text-primary" />
            Theme Preferences
          </CardTitle>
          <CardDescription>
            Switch between light and dark modes for your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between py-3">
          <Label htmlFor="darkMode" className="text-base">
            Enable Dark Mode
          </Label>
          <Switch
            id="darkMode"
            checked={formData.darkMode}
            onCheckedChange={(checked) => handleChange("darkMode", checked)}
          />
        </CardContent>
      </Card>

      {/* 🔔 Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Bell className="w-5 h-5 text-primary" />
            Notifications
          </CardTitle>
          <CardDescription>
            Choose how you want to receive updates and alerts.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between py-3">
          <Label htmlFor="emailNotifications" className="text-base">
            Email Notifications
          </Label>
          <Switch
            id="emailNotifications"
            checked={formData.emailNotifications}
            onCheckedChange={(checked) =>
              handleChange("emailNotifications", checked)
            }
          />
        </CardContent>
      </Card>

      {/* 🔒 Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Shield className="w-5 h-5 text-primary" />
            Privacy & Security
          </CardTitle>
          <CardDescription>
            Protect your account with advanced security settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between py-3">
          <Label htmlFor="twoFactorAuth" className="text-base">
            Enable Two-Factor Authentication
          </Label>
          <Switch
            id="twoFactorAuth"
            checked={formData.twoFactorAuth}
            onCheckedChange={(checked) =>
              handleChange("twoFactorAuth", checked)
            }
          />
        </CardContent>
      </Card>

      <Separator />

      {/* 💾 Save Button */}
      <div className="flex justify-end">
        <Button variant="gradient" onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
