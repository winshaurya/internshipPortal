import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { token, user, role } = useSelector((state) => state.auth);
  const resolvedRole = role || user?.role;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !resolvedRole) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && resolvedRole && !allowedRoles.includes(resolvedRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
