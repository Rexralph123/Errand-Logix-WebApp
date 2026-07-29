import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../services/authService";

// Supabase redirects here with a recovery session already active
// after the user clicks the link in their email.
export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      await updatePassword(password);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Couldn't reset your password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="auth-title">Set a new password</h1>

        {error && <div className="auth-error">{error}</div>}

        <label className="auth-label">
          New password
          <input
            className="auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </label>

        <label className="auth-label">
          Confirm new password
          <input
            className="auth-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={8}
            required
          />
        </label>

        <button className="btn btn-primary auth-submit" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update password"}
        </button>
      </form>
    </div>
  );
}
