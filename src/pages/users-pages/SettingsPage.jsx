// src/pages/users-pages/SettingsPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardShell, { Icon } from "../../components/user-components/DashboardShell";
import { useAuth } from "../../hooks/useAuth";
import { updateProfile } from "../../services/authApi";
import "../../styles/User.css";

function getInitials(name, email) {
  if (name && name.trim()) {
    const parts = name.trim().split(/\s+/);
    return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
  }
  if (email) return email[0].toUpperCase();
  return "U";
}

function Toggle({ checked, onChange, label }) {
  return (
    <label className="ud-toggle" aria-label={label}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="ud-toggle-track" />
    </label>
  );
}

export default function SettingsPage() {
  const { user, profile, refreshProfile, signOut } = useAuth();
  const navigate = useNavigate();

  /* ---------- account info ---------- */
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [accountForm, setAccountForm] = useState({
    fullName: profile?.fullName || "",
    phone: profile?.phone || "",
  });
  const [accountSaving, setAccountSaving] = useState(false);
  const [accountSaved, setAccountSaved] = useState(false);
  const [accountError, setAccountError] = useState("");

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
    // TODO: upload the file to Supabase Storage and pass the resulting
    // public URL through as `avatarUrl` in the updateProfile call below.
  }

  async function handleAccountSave(e) {
    e.preventDefault();
    setAccountError("");
    setAccountSaved(false);

    if (!accountForm.fullName.trim()) {
      setAccountError("Your name can't be empty.");
      return;
    }

    setAccountSaving(true);
    try {
      await updateProfile({
        fullName: accountForm.fullName,
        phone: accountForm.phone,
      });
      await refreshProfile();
      setAccountSaved(true);
    } catch (err) {
      setAccountError(err.message || "Couldn't save your changes. Please try again.");
    } finally {
      setAccountSaving(false);
    }
  }

  /* ---------- password ---------- */
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState("");

  async function handlePasswordSave(e) {
    e.preventDefault();
    setPwError("");
    setPwSaved(false);

    if (!pwForm.current || !pwForm.next || !pwForm.confirm) {
      setPwError("Fill in all three fields to change your password.");
      return;
    }
    if (pwForm.next.length < 8) {
      setPwError("New password must be at least 8 characters.");
      return;
    }
    if (pwForm.next !== pwForm.confirm) {
      setPwError("New password and confirmation don't match.");
      return;
    }

    setPwSaving(true);
    try {
      // TODO: wire up to your auth provider's password-update call, e.g.
      // await updatePassword({ currentPassword: pwForm.current, newPassword: pwForm.next });
      await new Promise((res) => setTimeout(res, 600));
      setPwSaved(true);
      setPwForm({ current: "", next: "", confirm: "" });
    } catch (err) {
      setPwError(err.message || "Couldn't update your password. Please try again.");
    } finally {
      setPwSaving(false);
    }
  }

  /* ---------- notification preferences ---------- */
  const [prefs, setPrefs] = useState({
    bookingUpdates: true,
    promotions: true,
    sms: false,
    email: true,
  });

  function togglePref(key) {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
    // TODO: persist to backend, e.g. updateProfile({ notificationPrefs: { ...prefs, [key]: !prefs[key] } });
  }

  /* ---------- danger zone ---------- */
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  async function handleLogout() {
    await signOut();
    navigate("/");
  }

  function handleDeleteAccount() {
    // TODO: wire up to your account-deletion endpoint.
    setConfirmingDelete(false);
  }

  const displayInitials = getInitials(profile?.fullName, user?.email);

  return (
    <DashboardShell
      active="settings"
      title="Settings"
      subtitle="Manage your account, security, and notification preferences."
      showPromo={false}
    >
      <div className="ud-settings-page">
        {/* ---------- ACCOUNT INFO ---------- */}
        <div className="ud-settings-card">
          <div className="ud-settings-card-head">
            <div className="ud-settings-card-icon">
              <Icon name="settings" size={18} />
            </div>
            <div>
              <p className="ud-form-title" style={{ marginBottom: 2 }}>
                Account Information
              </p>
              <p className="ud-form-desc" style={{ marginBottom: 0 }}>
                Update your name, phone number, and profile photo.
              </p>
            </div>
          </div>

          <div className="ud-settings-avatar-row">
            <label className="ud-settings-avatar-upload">
              <div className="ud-avatar ud-avatar--lg">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Profile"
                    style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
                  />
                ) : (
                  displayInitials
                )}
              </div>
              <span className="ud-settings-avatar-badge">
                <Icon name="edit" size={11} />
              </span>
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
            </label>
            <p className="ud-settings-avatar-hint">
              JPG or PNG. Square images look best.
            </p>
          </div>

          {accountError && (
            <div className="auth-error-banner" style={{ marginBottom: 18 }}>
              <Icon name="close" size={15} />
              <span>{accountError}</span>
            </div>
          )}

          <form onSubmit={handleAccountSave}>
            <div className="ud-form-grid">
              <div className="ud-field">
                <label className="ud-field-label">
                  Full Name <span className="ud-req">*</span>
                </label>
                <input
                  className="ud-input"
                  value={accountForm.fullName}
                  onChange={(e) => {
                    setAccountSaved(false);
                    setAccountForm({ ...accountForm, fullName: e.target.value });
                  }}
                  required
                />
              </div>
              <div className="ud-field">
                <label className="ud-field-label">Phone Number</label>
                <input
                  className="ud-input"
                  placeholder="e.g. 0801 234 5678"
                  value={accountForm.phone}
                  onChange={(e) => {
                    setAccountSaved(false);
                    setAccountForm({ ...accountForm, phone: e.target.value });
                  }}
                />
              </div>
              <div className="ud-field ud-field-full">
                <label className="ud-field-label">Email Address</label>
                <input className="ud-input" value={user?.email || ""} disabled />
                <span className="ud-form-desc" style={{ margin: "4px 0 0" }}>
                  Contact support to change the email linked to your account.
                </span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <button type="submit" className="btn btn-solid-black" disabled={accountSaving}>
                {accountSaving ? "Saving..." : "Save Changes"}
              </button>
              {accountSaved && (
                <span className="ud-settings-saved-toast">
                  <Icon name="check" size={15} /> Saved
                </span>
              )}
            </div>
          </form>
        </div>

        {/* ---------- PASSWORD ---------- */}
        <div className="ud-settings-card">
          <div className="ud-settings-card-head">
            <div className="ud-settings-card-icon">
              <Icon name="pin" size={18} />
            </div>
            <div>
              <p className="ud-form-title" style={{ marginBottom: 2 }}>
                Password &amp; Security
              </p>
              <p className="ud-form-desc" style={{ marginBottom: 0 }}>
                Choose a strong password you don't use elsewhere.
              </p>
            </div>
          </div>

          {pwError && (
            <div className="auth-error-banner" style={{ marginBottom: 18 }}>
              <Icon name="close" size={15} />
              <span>{pwError}</span>
            </div>
          )}

          <form onSubmit={handlePasswordSave}>
            <div className="ud-form-grid">
              <div className="ud-field ud-field-full">
                <label className="ud-field-label">Current Password</label>
                <input
                  className="ud-input"
                  type="password"
                  value={pwForm.current}
                  onChange={(e) => {
                    setPwSaved(false);
                    setPwForm({ ...pwForm, current: e.target.value });
                  }}
                />
              </div>
              <div className="ud-field">
                <label className="ud-field-label">New Password</label>
                <input
                  className="ud-input"
                  type="password"
                  value={pwForm.next}
                  onChange={(e) => {
                    setPwSaved(false);
                    setPwForm({ ...pwForm, next: e.target.value });
                  }}
                />
              </div>
              <div className="ud-field">
                <label className="ud-field-label">Confirm New Password</label>
                <input
                  className="ud-input"
                  type="password"
                  value={pwForm.confirm}
                  onChange={(e) => {
                    setPwSaved(false);
                    setPwForm({ ...pwForm, confirm: e.target.value });
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <button type="submit" className="btn btn-outline-black" disabled={pwSaving}>
                {pwSaving ? "Updating..." : "Update Password"}
              </button>
              {pwSaved && (
                <span className="ud-settings-saved-toast">
                  <Icon name="check" size={15} /> Password updated
                </span>
              )}
            </div>
          </form>
        </div>

        {/* ---------- NOTIFICATION PREFERENCES ---------- */}
        <div className="ud-settings-card">
          <div className="ud-settings-card-head">
            <div className="ud-settings-card-icon">
              <Icon name="bell" size={18} />
            </div>
            <div>
              <p className="ud-form-title" style={{ marginBottom: 2 }}>
                Notification Preferences
              </p>
              <p className="ud-form-desc" style={{ marginBottom: 0 }}>
                Choose what you hear from us, and how.
              </p>
            </div>
          </div>

          <div className="ud-settings-row">
            <div>
              <p className="ud-settings-row-label">Booking Updates</p>
              <p className="ud-settings-row-desc">
                Runner assignment, ETA changes, and delivery confirmations.
              </p>
            </div>
            <Toggle
              checked={prefs.bookingUpdates}
              onChange={() => togglePref("bookingUpdates")}
              label="Toggle booking updates"
            />
          </div>
          <div className="ud-settings-row">
            <div>
              <p className="ud-settings-row-label">Email Notifications</p>
              <p className="ud-settings-row-desc">Receipts and account activity sent to your inbox.</p>
            </div>
            <Toggle checked={prefs.email} onChange={() => togglePref("email")} label="Toggle email notifications" />
          </div>
          <div className="ud-settings-row">
            <div>
              <p className="ud-settings-row-label">SMS Alerts</p>
              <p className="ud-settings-row-desc">Text messages for time-sensitive updates.</p>
            </div>
            <Toggle checked={prefs.sms} onChange={() => togglePref("sms")} label="Toggle SMS alerts" />
          </div>
          <div className="ud-settings-row">
            <div>
              <p className="ud-settings-row-label">Promotions &amp; Offers</p>
              <p className="ud-settings-row-desc">Discount codes, referral bonuses, and product news.</p>
            </div>
            <Toggle checked={prefs.promotions} onChange={() => togglePref("promotions")} label="Toggle promotions" />
          </div>
        </div>

        {/* ---------- DANGER ZONE ---------- */}
        <div className="ud-settings-card ud-settings-card--danger">
          <div className="ud-settings-card-head">
            <div className="ud-settings-card-icon">
              <Icon name="trash" size={18} />
            </div>
            <div>
              <p className="ud-form-title" style={{ marginBottom: 2 }}>
                Danger Zone
              </p>
              <p className="ud-form-desc" style={{ marginBottom: 0 }}>
                These actions are permanent — proceed with care.
              </p>
            </div>
          </div>

          <div className="ud-settings-row">
            <div>
              <p className="ud-settings-row-label">Log Out</p>
              <p className="ud-settings-row-desc">Sign out of ErrandLogix on this device.</p>
            </div>
            <button type="button" className="btn btn-outline-black" onClick={handleLogout}>
              Log Out
            </button>
          </div>

          <div className="ud-settings-row">
            <div>
              <p className="ud-settings-row-label">Delete Account</p>
              <p className="ud-settings-row-desc">
                Permanently remove your account, bookings, and saved addresses.
              </p>
            </div>
            {confirmingDelete ? (
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  className="btn btn-outline-black"
                  onClick={() => setConfirmingDelete(false)}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-outline-danger" onClick={handleDeleteAccount}>
                  Confirm Delete
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => setConfirmingDelete(true)}
              >
                Delete Account
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}