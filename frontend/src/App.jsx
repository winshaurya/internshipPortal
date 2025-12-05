import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as AppToaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

/* Protected & Public Route */
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

/* ------------------ Admin module imports ------------------ */
import { AdminLayout } from "@/components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CompaniesManagement from "./pages/admin/CompaniesManagement";
import PostingsManagement from "./pages/admin/PostingsManagement";
import ApplicationsManagement from "./pages/admin/ApplicationsManagement";
import TaxonomiesManagement from "./pages/admin/TaxonomiesManagement";
import Analytics from "./pages/admin/Analytics";
import AuditLogs from "./pages/admin/AuditLogs";
import Settings from "./pages/admin/Settings";

/* ------------------ Student / Public module imports ------------------ */
import Index from "./pages/Index";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ResetPassword from "./pages/auth/ResetPassword";
import StudentDashboard from "./components/StudentDashboard";
import StudentProfile from "./pages/Profile/StudentProfile";

/* ------------------ Alumni module imports ------------------ */
import { AlumniLayout } from "@/components/layout/AlumniLayout";
import AlumniIndex from "./pages/AlumniIndex";
import PostingsPage from "./pages/PostingsPage";
import PostJobPage from "./pages/PostJobPage";
import AddCompany from "./pages/AddCompany";
import CompanyProfilePage from "./pages/CompanyProfilePage";
import EditCompanyProfilePage from "./pages/EditCompanyProfilePage";
import EditMyProfilePage from "./pages/EditMyProfilePage";
import JobApplicantsPage from "./pages/JobApplicantsPage";

/* ------------------ Shared ------------------ */
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppToaster />
        <Sonner />

        <BrowserRouter>
          <Routes>

            {/* ---------- Public Routes ---------- */}
            <Route path="/" element={<Index />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />

            {/* ---------- Auth Routes (with PublicRoute) ---------- */}
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }/>
            <Route path="/signup" element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }/>
            <Route path="/signup/student" element={
              <PublicRoute>
                <SignUp userType="student" />
              </PublicRoute>
            }/>
            <Route path="/signup/alumni" element={
              <PublicRoute>
                <SignUp userType="alumni" />
              </PublicRoute>
            }/>
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* ---------- Student Protected Routes ---------- */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/profile"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentProfile />
                </ProtectedRoute>
              }
            />

            {/* ---------- Admin Protected Routes ---------- */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="companies" element={<CompaniesManagement />} />
              <Route path="postings" element={<PostingsManagement />} />
              <Route path="applications" element={<ApplicationsManagement />} />
              <Route path="taxonomies" element={<TaxonomiesManagement />} />
              <Route path="settings" element={<Settings />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="audit-logs" element={<AuditLogs />} />
            </Route>

            {/* ---------- Alumni Protected Routes ---------- */}
            <Route
              path="/alumni"
              element={
                <ProtectedRoute allowedRoles={["alumni"]}>
                  <AlumniLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AlumniIndex />} />
              <Route path="postings" element={<PostingsPage />} />
              <Route path="post-job" element={<PostJobPage />} />
              <Route path="add-company" element={<AddCompany />} />
              <Route path="company-profile" element={<CompanyProfilePage />} />
              <Route path="edit-company-profile" element={<EditCompanyProfilePage />} />
              <Route path="profile" element={<EditMyProfilePage />} />
              <Route path="applications" element={<JobApplicantsPage />} />
            </Route>

            {/* ---------- Not Found ---------- */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>

      </TooltipProvider>
    </QueryClientProvider>
  );
}
