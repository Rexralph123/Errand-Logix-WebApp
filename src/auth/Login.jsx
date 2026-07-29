import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, getMyProfile } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
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
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Log in to manage your errands and deliveries.</p>

        {error && <div className="auth-error">{error}</div>}

        <label className="auth-label">
          Email
          <input
            className="auth-input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className="auth-label">
          Password
          <input
            className="auth-input"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <div className="auth-row">
          <a className="auth-link" href="/forgot-password">Forgot password?</a>
        </div>

        <button className="btn btn-primary auth-submit" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>

        <p className="auth-switch">
          Don't have an account? <a href="/register">Create one</a>
        </p>
      </form>
    </div>
  );
}
