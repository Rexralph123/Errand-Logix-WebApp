import { useState } from "react";
import { useLocation } from "react-router-dom";
import { resendConfirmationEmail } from "../services/authService";

export default function VerifyEmail() {
  const location = useLocation();
  const email = location.state?.email || "";

  const [error, setError] = useState("");
  const [resent, setResent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleResend() {
    setError("");
    setResent(false);
    setLoading(true);
    try {
      await resendConfirmationEmail(email);
      setResent(true);
    } catch (err) {
      setError(err.message || "Couldn't resend the confirmation email");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h1 className="auth-title">Check your email</h1>
        <p className="auth-subtitle">
          We sent a confirmation link to <strong>{email || "your email"}</strong>.
          Click it to finish creating your account — this page will pick up
          from there automatically once you do.
        </p>

        {error && <div className="auth-error">{error}</div>}
        {resent && <div className="auth-success">Confirmation email resent — check your inbox.</div>}

        <button
          type="button"
          className="btn btn-primary auth-submit"
          onClick={handleResend}
          disabled={loading || !email}
        >
          {loading ? "Resending..." : "Resend confirmation email"}
        </button>
      </div>
    </div>
  );
}
