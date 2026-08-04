import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  MessageCircle,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { registerUser } from "../services/authApi";

import logo from "../assets/images/Errand-logix-logo.png";
import heroAgent from "../assets/images/Herosec-Agent.png";
import "../styles/auth.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    whatsappNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function normalizeWhatsapp(raw) {
    // Nigerian-friendly normalizer: 0801... -> +234801..., otherwise trust E.164 input
    const trimmed = raw.trim().replace(/[\s-]/g, "");
    if (trimmed.startsWith("+")) return trimmed;
    if (trimmed.startsWith("0")) return "+234" + trimmed.slice(1);
    if (trimmed.startsWith("234")) return "+" + trimmed;
    return trimmed;
  }

  async function handleGoogleSignUp() {
    setError("");
    try {
      // TODO: wire up to Supabase — supabase.auth.signInWithOAuth({ provider: "google" })
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || "We couldn't connect to Google. Please try again.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.fullName || !form.email || !form.whatsappNumber || !form.password) {
      setError("Fill in every field to continue.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Privacy Policy and Terms of Service to continue.");
      return;
    }

    setLoading(true);
    try {
      await registerUser({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        whatsappNumber: normalizeWhatsapp(form.whatsappNumber),
      });
      navigate("/verify-email", { state: { email: form.email } });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
            Join Us.
            <br />
            <span className="auth-brand-accent">Relax From Day One.</span>
          </h1>
          <p className="auth-brand-sub">
            Create your account to book errands, track your runner in real
            time, and manage every task from one place.
          </p>
        </div>

        <div className="auth-brand-illustration" aria-hidden="true">
          <svg viewBox="0 0 420 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M45 35H375"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="4 6"
            />

            {/* Package */}
            <g transform="translate(18,22)" strokeWidth="1.6">
              <rect x="0" y="4" width="24" height="20" rx="2" />
              <path d="M0 11h24" />
              <path d="M12 4v20" />
            </g>

            {/* Bike */}
            <g transform="translate(133,17)" strokeWidth="1.6">
              <circle cx="5" cy="24" r="6" />
              <circle cx="29" cy="24" r="6" />
              <path d="M5 24l8-16h6l6 10" />
              <path d="M13 8h6" />
              <path d="M19 24h10l-6-10" />
            </g>

            {/* Location pin */}
            <g transform="translate(258,15) scale(1.3)" strokeWidth="1.6">
              <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21z" />
              <circle cx="12" cy="9.5" r="2.4" />
            </g>

            {/* Phone with tracking dot */}
            <g transform="translate(378,14) scale(1.15)" strokeWidth="1.6">
              <rect x="2" y="1" width="16" height="26" rx="3" />
              <path d="M2 6h16M2 23h16" />
              <path d="M6 14a4 4 0 0 1 8 0" strokeDasharray="2 2" />
              <circle cx="10" cy="14" r="1.8" fill="currentColor" stroke="none" />
            </g>
          </svg>
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

          <div className="auth-form-head">
            <h1>Create your account</h1>
            <p>Book errands and deliveries across Lagos and beyond.</p>
          </div>

          {error && (
            <div className="auth-error-banner">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="fullName">Full Name</label>
              <div className="auth-input-icon">
                <User size={17} />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Jane Doe"
                  value={form.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="email">Email Address</label>
              <div className="auth-input-icon">
                <Mail size={17} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="whatsappNumber">WhatsApp Number</label>
              <div className="auth-input-icon">
                <MessageCircle size={17} />
                <input
                  id="whatsappNumber"
                  name="whatsappNumber"
                  type="tel"
                  placeholder="e.g. 0801 234 5678"
                  value={form.whatsappNumber}
                  onChange={handleChange}
                  autoComplete="tel"
                />
              </div>
              <span className="auth-hint">
                We'll use this to reach you about your errands and deliveries.
              </span>
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="auth-input-icon has-toggle">
                <Lock size={17} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  minLength={8}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              <span className="auth-hint">Must be at least 8 characters.</span>
            </div>

            <div className="field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="auth-input-icon has-toggle">
                <Lock size={17} />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  minLength={8}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <label className="auth-checkbox-row" style={{ marginBottom: 22 }}>
              <input
                type="checkbox"
                name="agreed"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              I agree to the <a>Privacy Policy</a> and <a>Terms of Service</a>
            </label>

            <button
              className="btn btn-solid-black auth-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                "Creating account..."
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="auth-divider">OR</div>

          <button
            type="button"
            className="auth-google-btn"
            onClick={handleGoogleSignUp}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.68-3.88 2.68-6.62z"
              />
              <path
                fill="#34A853"
                d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18z"
              />
              <path
                fill="#FBBC05"
                d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03l2.99-2.33z"
              />
              <path
                fill="#EA4335"
                d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.97l2.99 2.33C4.66 5.17 6.65 3.58 9 3.58z"
              />
            </svg>
            Sign up with Google
          </button>

          <div className="auth-trust-row">
            <span>
              <ShieldCheck size={14} />
              Secure Signup
            </span>
            <span className="auth-trust-dot">·</span>
            <span>Verified Runner Network</span>
          </div>

          <p className="auth-footer-text">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Log in
            </Link>
          </p>
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