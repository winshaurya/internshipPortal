import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function PublicRoute({ children }) {
  const { user } = useAuth();

  if (user) {
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    if (user.role === "student") return <Navigate to="/dashboard" replace />;
    if (user.role === "alumni") return <Navigate to="/alumni" replace />;
  }

  return children;
}
