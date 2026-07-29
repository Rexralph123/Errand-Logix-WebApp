import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    whatsappNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function normalizeWhatsapp(raw) {
    // Nigerian-friendly normalizer: 0801... -> +234801..., otherwise trust E.164 input
    const trimmed = raw.trim().replace(/[\s-]/g, "");
    if (trimmed.startsWith("+")) return trimmed;
    if (trimmed.startsWith("0")) return "+234" + trimmed.slice(1);
    if (trimmed.startsWith("234")) return "+" + trimmed;
    return trimmed;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
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
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">
          Book errands and deliveries across Lagos and beyond.
        </p>

        {error && <div className="auth-error">{error}</div>}

        <label className="auth-label">
          Full name
          <input
            className="auth-input"
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </label>

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
          WhatsApp number
          <input
            className="auth-input"
            type="tel"
            name="whatsappNumber"
            placeholder="e.g. 0801 234 5678"
            value={form.whatsappNumber}
            onChange={handleChange}
            required
          />
          <span className="auth-hint">We'll use this to reach you about your errands/deliveries.</span>
        </label>

        <label className="auth-label">
          Password
          <input
            className="auth-input"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            minLength={8}
            required
          />
        </label>

        <label className="auth-label">
          Confirm password
          <input
            className="auth-input"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            minLength={8}
            required
          />
        </label>

        <button className="btn btn-primary auth-submit" type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
        </button>

        <p className="auth-switch">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </form>
    </div>
  );
}
