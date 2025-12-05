import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute({ children }) {
  const { token, user, role } = useSelector((state) => state.auth);
  const resolvedRole = role || user?.role;

  if (token && resolvedRole) {
    if (resolvedRole === "admin") return <Navigate to="/admin" replace />;
    if (resolvedRole === "student") return <Navigate to="/dashboard" replace />;
    if (resolvedRole === "alumni") return <Navigate to="/alumni" replace />;
  }

  return children;
}
