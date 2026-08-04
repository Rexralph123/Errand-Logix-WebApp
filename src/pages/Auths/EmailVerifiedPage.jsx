// src/pages/Auths/EmailVerifiedPage.jsx
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { resendConfirmationEmail } from "../../services/authApi";

import logo from "../../assets/images/Errand-logix-logo.png";
import heroAgent from "../../assets/images/Herosec-Agent.png";
import "../../styles/auth.css";

/**
 * Supabase redirects back to this page after someone clicks the
 * confirmation link in their email. On success it appends session
 * tokens (picked up automatically by supabase-js / useAuth). On
 * failure — expired or already-used link — it appends `error` and
 * `error_description` instead, either in the hash or query string.
 */
function parseAuthParams(location) {
  const hashParams = new URLSearchParams(location.hash.replace(/^#/, ""));
  const searchParams = new URLSearchParams(location.search);
  return {
    error: hashParams.get("error") || searchParams.get("error"),
    errorDescription:
      hashParams.get("error_description") || searchParams.get("error_description"),
  };
}

function StatusIcon({ status }) {
  if (status === "success") return <CheckCircle2 size={32} />;
  if (status === "error") return <XCircle size={32} />;
  return <Loader2 size={32} />;
}

function EmailVerifiedPage() {
  const { user, profile, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const [message, setMessage] = useState("");
  const [resendState, setResendState] = useState("idle"); // idle | sending | sent

  const email = user?.email || location.state?.email || "";

  useEffect(() => {
    const { error, errorDescription } = parseAuthParams(location);

    if (error) {
      setStatus("error");
      setMessage(
        errorDescription
          ? decodeURIComponent(errorDescription.replace(/\+/g, " "))
          : "This confirmation link is invalid or has expired."
      );
      return;
    }

    // Still resolving the session from the URL — keep showing the spinner.
    if (loading) return;

    if (user && profile?.emailVerified) {
      setStatus("success");
      return;
    }

    if (user && !profile?.emailVerified) {
      setStatus("error");
      setMessage(
        "We couldn't confirm your email from this link. Try again or resend a new one below."
      );
      return;
    }

    setStatus("error");
    setMessage(
      "This confirmation link is invalid or has expired. Request a new one below."
    );
  }, [loading, user, profile, location]);

  async function handleResend() {
    if (!email || resendState === "sending") return;
    setResendState("sending");
    try {
      await resendConfirmationEmail(email);
      setResendState("sent");
    } catch {
      setResendState("idle");
    }
  }

  return (
    <div className="auth-shell">
      {/* =================== BRAND PANEL =================== */}
      <div className="auth-brand">
        <div className="auth-brand-bg" />

        <Link to="/" className="auth-brand-top">
          <div className="logo-container">
            <img src={logo} alt="Errand Logix" />
            <h2 className="Logo-name">
              Errand <span>Logix</span>
            </h2>
          </div>
        </Link>

        <div className="auth-brand-visual">
          <div className="auth-visual-glow" />
          <div className="auth-visual-frame">
            <img src={heroAgent} alt="Verified Errand Logix runner on assignment" />
          </div>

          <div className="auth-visual-badge badge-top">
            <ShieldCheck size={15} />
            <span>Verified Runners Only</span>
          </div>

          <div className="auth-visual-badge badge-bottom">
            <span className="auth-visual-stars">⭐⭐⭐⭐⭐</span>
            <span>Rated 4.5/5 by customers</span>
          </div>
        </div>

        <div className="auth-brand-mid">
          <h1 className="auth-brand-headline">
            {status === "success" ? (
              <>
                You're In.
                <br />
                <span className="auth-brand-accent">Let's Finish Setup.</span>
              </>
            ) : (
              <>
                Almost There.
                <br />
                <span className="auth-brand-accent">One Last Step.</span>
              </>
            )}
          </h1>
          <p className="auth-brand-sub">
            {status === "success"
              ? "Your email is confirmed. A couple more details and you're ready to book your first errand."
              : "Confirm your email so we can secure your account and get you booking errands."}
          </p>
        </div>

        <div className="auth-brand-stats">
          <div className="auth-stat">
            <strong>50+</strong>
            <span>Completed Errands</span>
          </div>
          <div className="auth-stat">
            <strong>3+</strong>
            <span>Verified Runners</span>
          </div>
          <div className="auth-stat">
            <strong>98%</strong>
            <span>Customer Satisfaction</span>
          </div>
        </div>
      </div>

      {/* =================== FORM PANEL =================== */}
      <div className="auth-form-side">
        <div className="auth-form-card">
          <Link to="/" className="auth-back-link">
            <ArrowLeft size={15} />
            Return to Homepage
          </Link>

          <div className="auth-status-box">
            <div
              className={`auth-status-icon ${
                status === "verifying" ? "pending spinning" : status
              }`}
            >
              <StatusIcon status={status} />
            </div>

            {status === "verifying" && (
              <>
                <h1>Confirming your email...</h1>
                <p>Hang tight, this only takes a second.</p>
              </>
            )}

            {status === "success" && (
              <>
                <h1>Email confirmed</h1>
                <p>
                  {email ? (
                    <>
                      You're verified as <strong>{email}</strong>.
                    </>
                  ) : (
                    "Your email has been verified."
                  )}{" "}
                  Let's finish setting up your profile so runners know where to
                  find you.
                </p>
                <button
                  className="btn btn-solid-black auth-submit"
                  onClick={() => navigate("/complete-profile")}
                >
                  Complete Your Profile
                  <ArrowRight size={18} />
                </button>
              </>
            )}

            {status === "error" && (
              <>
                <h1>Link expired or invalid</h1>
                <p>{message}</p>

                <div className="auth-resend-row">
                  <span>Didn't work?</span>
                  <button
                    type="button"
                    className="auth-resend-btn"
                    onClick={handleResend}
                    disabled={!email || resendState === "sending"}
                  >
                    {resendState === "sending"
                      ? "Sending..."
                      : resendState === "sent"
                      ? "Email sent! Check your inbox."
                      : "Resend confirmation email"}
                  </button>
                </div>

                <Link
                  to="/login"
                  className="btn btn-outline-black auth-submit"
                  style={{ marginTop: 8, textAlign: "center" }}
                >
                  Back to Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="auth-mini-footer">
          <span>© {new Date().getFullYear()} Errand Logix Ltd.</span>
        </div>
      </div>
    </div>
  );
}

export default EmailVerifiedPage;