import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowRight } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import FormField from "../components/auth/FormField";
import PasswordField from "../components/auth/PasswordField";
import AuthAlert from "../components/auth/AuthAlert";
import { loginUser, getMyProfile } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Enter your email and password to continue.");
      return;
    }

    setLoading(true);
    try {
      await loginUser(form);
      const profile = await getMyProfile();

      if (!profile?.emailVerified) {
        navigate("/verify-email", { state: { email: form.email } });
        return;
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "We couldn't sign you in. Check your details and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      eyebrow="Welcome Back"
      headline={
        <>
          Your Errands.
          <br />
          One Trusted Team.
        </>
      }
      subtext="Sign in to book errands, track your runner in real time, and manage every task from one place."
    >
      <div className="auth-form-head">
        <h1>Sign in to your account</h1>
        <p>Enter your details below to continue.</p>
      </div>

      <AuthAlert type="error">{error}</AuthAlert>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <FormField
          id="email"
          label="Email Address"
          type="email"
          icon={Mail}
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
        />

        <PasswordField
          id="password"
          label="Password"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
        />

        <div className="auth-row-between">
          <Link to="/forgot-password" className="auth-link">
            Forgot password?
          </Link>
        </div>

        <button className="btn btn-solid-black auth-submit" type="submit" disabled={loading}>
          {loading ? "Signing in..." : (
            <>
              Sign In
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <p className="auth-footer-text">
        Don't have an account?{" "}
        <Link to="/register" className="auth-link">
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Login;