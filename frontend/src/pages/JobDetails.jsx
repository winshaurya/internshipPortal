import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Calendar,
  Building,
  Users,
  BookOpen,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useJobDetailsQuery, useListApplicantsQuery } from "@/store/services/jobApi";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("description");

  const profileComplete = false;
  const { data: jobData, isLoading: jobLoading } = useJobDetailsQuery(id, {
    skip: !id,
  });
  const { data: applicantsData } = useListApplicantsQuery(id, {
    skip: !id,
  });

  const jobDetails = jobData?.job || null;
  const applicantCount =
    applicantsData?.count ||
    applicantsData?.applicants?.length ||
    0;

  const handleApply = () => {
    if (!profileComplete) {
      alert("Redirecting to complete your profile...");
      navigate("/?complete-profile=true");
      return;
    }
    alert("Application submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      {jobLoading && (
        <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-muted-foreground">
          Loading job details...
        </div>
      )}
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-4">
        <div className="max-w-7xl mx-auto px-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="text-primary-foreground hover:bg-primary-foreground/10 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">
                        {jobDetails?.job_title || "Job Details"}
                      </h1>
                      <p className="text-lg text-muted-foreground">
                        {jobDetails?.company_name}
                      </p>
                    </div>
                  </div>

                  <Badge variant="secondary">
                    {jobDetails?.type || "N/A"}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{jobDetails?.location || "—"}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{jobDetails?.experience || "—"}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Apply by{" "}
                      {jobDetails?.created_at
                        ? new Date(jobDetails.created_at).toDateString()
                        : "—"}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{applicantCount} applicants</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {(jobDetails?.skills || []).map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="text-lg font-semibold text-primary">
                  {jobDetails?.stipend || "—"}
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="responsibilities">
                  Responsibilities
                </TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                <TabsTrigger value="company">Company</TabsTrigger>
              </TabsList>

              {/* Description */}
              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line">
                      {jobDetails?.job_description ||
                        "No description provided."}
                    </p>

                    <Separator className="my-6" />

                    <h3 className="font-semibold mb-3">Benefits</h3>
                    <ul className="space-y-2">
                      {(jobDetails?.benefits || []).map((b, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Responsibilities */}
              <TabsContent value="responsibilities" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Responsibilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {(jobDetails?.responsibilities || []).map(
                        (r, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm">{r}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Requirements */}
              <TabsContent value="requirements" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {(jobDetails?.requirements || []).map((req, index) => (
                        <li
                          key={index}
                          className="flex items-start space-x-2"
                        >
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Eligibility */}
              <TabsContent value="eligibility" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Eligibility Criteria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {(jobDetails?.eligibility || []).map((criteria, i) => (
                        <li
                          key={i}
                          className="flex items-start space-x-2"
                        >
                          <BookOpen className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Company */}
              <TabsContent value="company" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      About {jobDetails?.companyInfo?.name || "Company"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Founded
                        </span>
                        <p className="font-medium">
                          {jobDetails?.companyInfo?.founded || "—"}
                        </p>
                      </div>

                      <div>
                        <span className="text-sm text-muted-foreground">
                          Company Size
                        </span>
                        <p className="font-medium">
                          {jobDetails?.companyInfo?.size || "—"}
                        </p>
                      </div>

                      <div>
                        <span className="text-sm text-muted-foreground">
                          Industry
                        </span>
                        <p className="font-medium">
                          {jobDetails?.companyInfo?.industry || "—"}
                        </p>
                      </div>

                      <div>
                        <span className="text-sm text-muted-foreground">
                          Website
                        </span>
                        <p className="font-medium text-primary">
                          {jobDetails?.companyInfo?.website || "—"}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {jobDetails?.company_about || "No company details."}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply */}
            <Card>
              <CardContent className="p-6">
                {!profileComplete && (
                  <Alert className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Complete your profile to apply for this job.
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={handleApply}
                  className="w-full mb-4"
                  disabled={!profileComplete}
                >
                  {profileComplete
                    ? "Apply Now"
                    : "Complete Profile to Apply"}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Posted {jobDetails?.posted || "—"}
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Job Type
                    </span>
                    <p className="font-medium">{jobDetails?.type || "—"}</p>
                  </div>

                  <div>
                    <span className="text-sm text-muted-foreground">
                      Experience Level
                    </span>
                    <p className="font-medium">
                      {jobDetails?.experience || "—"}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm text-muted-foreground">
                      Location
                    </span>
                    <p className="font-medium">
                      {jobDetails?.location || "—"}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm text-muted-foreground">
                      Application Deadline
                    </span>
                    <p className="font-medium">
                      {jobDetails?.applyBy || "—"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "React Developer",
                      company: "StartupHub",
                      type: "Internship",
                    },
                    {
                      title: "Full Stack Developer",
                      company: "WebCorp",
                      type: "Full-time",
                    },
                    {
                      title: "UI Developer",
                      company: "DesignTech",
                      type: "Contract",
                    },
                  ].map((job, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-3 hover:bg-accent cursor-pointer transition-colors"
                    >
                      <h4 className="font-medium text-sm">{job.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {job.company}
                      </p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {job.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
