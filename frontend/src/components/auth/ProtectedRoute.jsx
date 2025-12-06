/*import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  // ❌ Not logged-in = redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Role not allowed = redirect to home
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // ✔ Allowed → show page
  return children;
}
*/