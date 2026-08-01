import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function AuthAlert({ type = "error", children }) {
  if (!children) return null;

  const isError = type === "error";
  return (
    <div className={isError ? "auth-error-banner" : "auth-success-banner"}>
      {isError ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
      <span>{children}</span>
    </div>
  );
}