import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AgentRoute({ children }) {
  const { user, profile, loading, isFullyVerified } = useAuth();

  if (loading) return <div className="auth-loading">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (!profile?.emailVerified) return <Navigate to="/verify-email" replace />;

  if (!isFullyVerified) return <Navigate to="/login" replace />;

  if (profile?.role !== "agent") return <Navigate to="/dashboard" replace />;

  return children;
}
