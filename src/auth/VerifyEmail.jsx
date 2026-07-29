import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmailOtp, resendEmailOtp } from "../services/authService";

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await verifyEmailOtp({ email, code });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid or expired code");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError("");
    setResent(false);
    try {
      await resendEmailOtp(email);
      setResent(true);
    } catch (err) {
      setError(err.message || "Couldn't resend the code");
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="auth-title">Verify your email</h1>
        <p className="auth-subtitle">
          We sent a 6-digit code to <strong>{email || "your email"}</strong>.
        </p>

        {error && <div className="auth-error">{error}</div>}
        {resent && <div className="auth-success">Code resent — check your inbox.</div>}

        <label className="auth-label">
          Verification code
          <input
            className="auth-input auth-otp-input"
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            required
          />
        </label>

        <button className="btn btn-primary auth-submit" type="submit" disabled={loading || code.length !== 6}>
          {loading ? "Verifying..." : "Verify email"}
        </button>

        <button type="button" className="auth-link-btn" onClick={handleResend}>
          Didn't get a code? Resend
        </button>
      </form>
    </div>
  );
}
