// src/pages/VerifyEmailPage.jsx
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MailCheck, ArrowLeft, ShieldCheck, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { resendConfirmationEmail } from "../../services/authApi";

import logo from "../../assets/images/Errand-logix-logo.png";
import heroAgent from "../../assets/images/Herosec-Agent.png";
import "../../styles/auth.css";

const RESEND_COOLDOWN = 30; // seconds

function VerifyEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  async function handleResend() {
    if (!email || cooldown > 0) return;

    setStatus("sending");
    setError("");
    try {
      await resendConfirmationEmail(email);
      setStatus("sent");
      setCooldown(RESEND_COOLDOWN);
    } catch (err) {
      setStatus("error");
      setError(err.message || "We couldn't resend the email. Please try again.");
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
            Almost There.
            <br />
            <span className="auth-brand-accent">One Last Step.</span>
          </h1>
          <p className="auth-brand-sub">
            Confirm your email so we can secure your account and get you booking errands.
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
        <div className="auth-form-card verify-card">
          <Link to="/" className="auth-back-link">
            <ArrowLeft size={15} />
            Return to Homepage
          </Link>

          <div className="verify-icon-circle">
            <MailCheck size={30} />
          </div>

          <div className="auth-form-head" style={{ textAlign: "center" }}>
            <h1>Check your inbox</h1>
            <p>
              We've sent a confirmation link to{" "}
              {email ? <strong>{email}</strong> : "your email address"}. Click the
              link to activate your account.
            </p>
          </div>

          {status === "sent" && (
            <div className="auth-success-banner">
              <CheckCircle2 size={16} />
              <span>Confirmation email resent. Check your inbox and spam folder.</span>
            </div>
          )}

          {status === "error" && (
            <div className="auth-error-banner">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="button"
            className="btn btn-solid-black auth-submit"
            onClick={handleResend}
            disabled={status === "sending" || cooldown > 0 || !email}
          >
            {status === "sending" ? (
              "Sending..."
            ) : cooldown > 0 ? (
              `Resend available in ${cooldown}s`
            ) : (
              <>
                <RefreshCw size={16} />
                Resend Confirmation Email
              </>
            )}
          </button>

          {!email && (
            <p className="auth-hint" style={{ textAlign: "center", marginTop: 10 }}>
              We couldn't find your email from this session — head back and sign
              up again, or resend from the login page once you try signing in.
            </p>
          )}

          <div className="verify-divider" />

          <p className="auth-footer-text">
            Wrong email or already verified?{" "}
            <Link to="/login" className="auth-link">
              Go to Sign In
            </Link>
          </p>

          <button
            type="button"
            className="auth-guest-link"
            onClick={() => navigate("/")}
          >
            Continue without verifying for now
          </button>
        </div>

        <div className="auth-mini-footer">
          <span>© {new Date().getFullYear()} Errand Logix Ltd.</span>
          <span className="auth-mini-footer-links">
            <a>Privacy Policy</a>
            <span>·</span>
            <a>Terms of Service</a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailPage;