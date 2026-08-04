// src/pages/CompleteProfilePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  MapPin,
  Home,
  Landmark,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { updateProfile } from "../../services/authApi";

import logo from "../../assets/images/Errand-logix-logo.png";
import "../../styles/auth.css";

const AREAS = [
  { name: "Ago Palace Way", active: true },
  { name: "Festac Town", active: true },
  { name: "Surulere", active: false },
  { name: "Yaba", active: false },
  { name: "Ikeja", active: false },
  { name: "Lekki", active: false },
  { name: "Victoria Island", active: false },
  { name: "Ikoyi", active: false },
  { name: "Ajah", active: false },
  { name: "Apapa", active: false },
  { name: "Oshodi", active: false },
  { name: "Alaba", active: false },
];

function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return (parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0][0]).toUpperCase();
}

function CompleteProfilePage() {
  const { profile, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [form, setForm] = useState({ address: "", area: "", landmark: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.address || !form.area) {
      setError("Add your address and area so runners know where to find you.");
      return;
    }

    setSaving(true);
    try {
      // TODO: if avatarFile is set, upload it to Supabase Storage first and
      // pass the resulting public URL through as `avatarUrl` alongside the
      // rest of the profile fields below.
      await updateProfile({
        address: form.address,
        area: form.area,
        landmark: form.landmark,
        profileComplete: true,
      });
      await refreshProfile();
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Couldn't save your profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function handleSkip() {
    navigate("/dashboard");
  }

  return (
    <div className="auth-shell">
      {/* =================== BRAND PANEL =================== */}
      <div className="auth-brand">
        <div className="auth-brand-bg" />

        <div className="auth-brand-top">
          <div className="logo-container">
            <img src={logo} alt="Errand Logix" />
            <h2 className="Logo-name">
              Errand <span>Logix</span>
            </h2>
          </div>
        </div>

        <div className="auth-brand-mid">
          <h1 className="auth-brand-headline">
            One Last Step.
            <br />
            <span className="auth-brand-accent">Help Runners Find You.</span>
          </h1>
          <p className="auth-brand-sub">
            Add your address and area so your first errand goes out without a
            hitch — no back and forth over WhatsApp for directions.
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
          <div className="auth-steps">
            <div className="auth-step-dot done" />
            <div className="auth-step-dot done" />
            <div className="auth-step-dot" />
          </div>

          <div className="auth-form-head">
            <h1>Complete your profile</h1>
            <p>
              Welcome{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}!
              Just a couple of details and you're ready to book.
            </p>
          </div>

          {error && (
            <div className="auth-error-banner">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <label className="auth-avatar-upload" htmlFor="avatar">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Profile preview" />
              ) : profile?.full_name ? (
                <span className="auth-avatar-initials">{getInitials(profile.full_name)}</span>
              ) : (
                <Camera size={22} />
              )}
              <span className="auth-avatar-badge">
                <Camera size={13} />
              </span>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </label>

            <div className="field">
              <label htmlFor="address">Delivery Address</label>
              <div className="auth-input-icon">
                <Home size={17} />
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="e.g. 12 Oshodi Close, off Ago Palace Way"
                  value={form.address}
                  onChange={handleChange}
                  autoComplete="street-address"
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="area">Area</label>
              <div className="auth-input-icon">
                <MapPin size={17} />
                <select id="area" name="area" value={form.area} onChange={handleChange}>
                  <option value="" disabled>
                    Select your area
                  </option>
                  {AREAS.map((a) => (
                    <option key={a.name} value={a.name}>
                      {a.name}
                      {!a.active ? " (Coming Soon)" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <span className="auth-hint">
                Outside Ago Palace Way or Festac? Pick it anyway — we'll notify
                you when we launch there.
              </span>
            </div>

            <div className="field">
              <label htmlFor="landmark">
                Nearest Landmark{" "}
                <span style={{ fontWeight: 400, color: "#999" }}>(optional)</span>
              </label>
              <div className="auth-input-icon">
                <Landmark size={17} />
                <input
                  id="landmark"
                  name="landmark"
                  type="text"
                  placeholder="e.g. Opposite First Bank"
                  value={form.landmark}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              className="btn btn-solid-black auth-submit"
              type="submit"
              disabled={saving}
            >
              {saving ? (
                "Saving..."
              ) : (
                <>
                  Finish Setup
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="auth-footer-text">
            <button
              type="button"
              className="auth-link"
              style={{ background: "none", border: "none", cursor: "pointer" }}
              onClick={handleSkip}
            >
              I'll do this later
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CompleteProfilePage;