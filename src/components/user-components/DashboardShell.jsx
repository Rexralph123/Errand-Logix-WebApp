// src/components/dashboard/DashboardShell.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/User.css";

/* ============================================================
  ICONS
   ============================================================ */
export const ICONS = {
  home: "M3 11.2 12 4l9 7.2M5.5 9.8V20h13V9.8",
  book: "M4 5.2C4 4 5 3.2 6.2 3.2H20v15.6H6.2C5 18.8 4 18 4 16.8V5.2ZM4 16.8c0-1.2 1-2 2.2-2H20",
  history: "M4 12a8 8 0 1 1 2.6 5.9M4 12V6m0 6h5.5M12 8v4.5l3 2",
  gift: "M4 9.5h16v4H4v-4Zm1.2 4h13.6V20H5.2v-6.5ZM12 9.5V20M12 9.5c-1.4 0-4-.6-4-3s2.6-3 4 0c1.4-2.6 4-2.6 4 0s-2.6 3-4 3Z",
  pin: "M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Zm0-8.7a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Z",
  bell: "M6 9a6 6 0 1 1 12 0c0 4 1.5 5.4 1.5 5.9H4.5C4.5 14.4 6 13 6 9Zm4.5 9.5a1.6 1.6 0 0 0 3 0",
  help: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-.02-5.3v-.2c0-1.2.7-1.8 1.5-2.4.8-.6 1.5-1.2 1.5-2.3 0-1.5-1.3-2.4-2.9-2.4-1.4 0-2.6.7-3 1.9M12 17.4h.02",
  settings: "M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Zm8-3.2c0 .5 0 1-.1 1.4l2 1.6-2 3.4-2.3-1a7.6 7.6 0 0 1-2.4 1.4l-.4 2.4H9.2l-.4-2.4a7.6 7.6 0 0 1-2.4-1.4l-2.3 1-2-3.4 2-1.6a7 7 0 0 1 0-2.8l-2-1.6 2-3.4 2.3 1a7.6 7.6 0 0 1 2.4-1.4L9.2 2h5.6l.4 2.4c.9.3 1.7.8 2.4 1.4l2.3-1 2 3.4-2 1.6c.1.4.1.9.1 1.4Z",
  logout: "M9 21H5.5A1.5 1.5 0 0 1 4 19.5v-15A1.5 1.5 0 0 1 5.5 3H9M16 17l5-5-5-5M21 12H9",
  menu: "M3.5 6.5h17M3.5 12h17M3.5 17.5h17",
  close: "m5 5 14 14M19 5 5 19",
  chevron: "m9 6 6 6-6 6",
  package: "M12 3 4 7v10l8 4 8-4V7l-8-4Zm0 0v18M4 7l8 4 8-4",
  file: "M7 3h7l5 5v13H7V3Zm7 0v5h5",
  bag: "M6 8h12l1 12H5L6 8Zm3 0V6a3 3 0 0 1 6 0v2",
  cart: "M3 4h2l2.4 11.4A2 2 0 0 0 9.4 17h7.2a2 2 0 0 0 2-1.6L20 8H6M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  utensils: "M6 3v7a2 2 0 0 0 4 0V3M8 10v11M17 3c-1.7 0-3 2-3 5s1.3 5 3 5v8",
  giftbox: "M4 9.5h16v4H4v-4Zm1.2 4h13.6V20H5.2v-6.5ZM12 9.5V20M12 9.5c-1.4 0-4-.6-4-3s2.6-3 4 0c1.4-2.6 4-2.6 4 0s-2.6 3-4 3Z",
  pill: "M6.5 17.5 15 9a4 4 0 1 1 5.7 5.7L12 23a4 4 0 0 1-5.5-6.5Zm3.2-3.2 4.5 4.5",
  shirt: "M8 3 4 6.5 6.5 9 8 7.5V21h8V7.5L17.5 9 20 6.5 16 3l-2 2h-4L8 3Z",
  sparkles: "m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3ZM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z",
  phone: "M6.6 3.5 9.3 8l-2 1.7a13 13 0 0 0 6 6l1.7-2 4.5 2.7-.5 3.3a2 2 0 0 1-2.2 1.7A17.6 17.6 0 0 1 3.3 5.7a2 2 0 0 1 1.7-2.2l1.6-.1Z",
  chat: "M4 4.5h16v11H8.5L4 19.5v-15Z",
  star: "m12 3.5 2.5 5.2 5.7.8-4.1 4 1 5.7L12 16.5l-5.1 2.7 1-5.7-4.1-4 5.7-.8L12 3.5Z",
  truck: "M3 6h10v9H3V6Zm10 3h4l3 3v3h-7V9ZM6 18a1.8 1.8 0 1 0 0-3.6A1.8 1.8 0 0 0 6 18Zm11 0a1.8 1.8 0 1 0 0-3.6A1.8 1.8 0 0 0 17 18Z",
  edit: "M4 20h4L18.5 9.5a2 2 0 0 0-4-4L4 16v4Zm11-15 4 4",
  trash: "M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13",
  plus: "M12 5v14M5 12h14",
  check: "m5 12 5 5L20 7",
  search: "m21 21-4-4M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z",
  route: "M5 5.5a2.5 2.5 0 1 0 0-.01M5 5.5v6a3 3 0 0 0 3 3h8a3 3 0 0 1 3 3v.5M19 18a2.5 2.5 0 1 0-.01 0",
};

export function Icon({ name, size = 18, ...rest }) {
  const d = ICONS[name];
  if (!d) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d={d} />
    </svg>
  );
}

/* ============================================================
   NAV — every item now points at a real route/hash so the shell
   works the same whether you're on /dashboard or /dashboard/book
   ============================================================ */
const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: "home", to: "/dashboard" },
  { key: "book", label: "Book Errand", icon: "book", to: "/dashboard/book" },
  { key: "history", label: "My Bookings", icon: "history", to: "/dashboard#history" },
  { key: "rewards", label: "Rewards", icon: "gift", to: "/dashboard/rewards" },  
  { key: "addresses", label: "Saved Addresses", icon: "pin", to: "/dashboard#addresses" },
  { key: "notifications", label: "Notifications", icon: "bell", to: "/dashboard#notifications" },
  { key: "support", label: "Support", icon: "help", to: "/dashboard#support" },
  { key: "settings", label: "Settings", icon: "settings", to: null },
];

const NOTIFICATIONS = [
  { key: 1, text: "Your runner Tunde is heading to the pickup location.", time: "5 min ago", unread: true },
  { key: 2, text: "Payment for booking EL-20780 was verified.", time: "3 hrs ago", unread: true },
  { key: 3, text: "Booking EL-20698 was cancelled.", time: "2 days ago", unread: false },
];

const PROMOS = [
  "Free delivery on your first errand this week — use code FIRSTRUN.",
  "Refer a friend and earn 200 reward points instantly.",
  "Weekend special: 15% off Grocery Shopping bookings.",
];

function initialsOf(name, email) {
  if (name && name.trim()) {
    const parts = name.trim().split(/\s+/);
    return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
  }
  if (email) return email[0].toUpperCase();
  return "U";
}

export default function DashboardShell({ active, title, subtitle, showPromo = true, children }) {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const [promoDismissed, setPromoDismissed] = useState(false);

  const displayName = profile?.fullName || user?.email?.split("@")[0] || "there";
  const initials = initialsOf(profile?.fullName, user?.email);
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  async function handleLogout() {
    await signOut();
    navigate("/");
  }

  if (loading) {
    return (
      <div className="ud-loading-screen">
        <div className="ud-loading-mark">
          <span>Errand</span>Logix
        </div>
        <div className="ud-loading-bar">
          <div className="ud-loading-bar-fill" />
        </div>
      </div>
    );
  }

  return (
    <div className="ud-dashboard">
      {sidebarOpen && (
        <button
          type="button"
          className="ud-sidebar-overlay"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside className={`ud-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="ud-sidebar-top">
          <Link to="/" className="ud-sidebar-logo" onClick={() => setSidebarOpen(false)}>
            <span className="logo-style" style={{ fontSize: 24 }}>
              Errand<span>Logix</span>
            </span>
          </Link>
          <button
            type="button"
            className="ud-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        <div className="ud-sidebar-profile">
          <div className="ud-avatar ud-avatar--lg">{initials}</div>
          <div className="ud-sidebar-profile-info">
            <p className="ud-sidebar-profile-name">{displayName}</p>
            <p className="ud-sidebar-profile-email">{user?.email}</p>
          </div>
        </div>

        <nav className="ud-sidebar-nav">
          {NAV_ITEMS.map((item) =>
            item.to ? (
              <Link
                key={item.key}
                to={item.to}
                className={`ud-nav-item ${item.key === active ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            ) : (
              <button
                key={item.key}
                type="button"
                className={`ud-nav-item ${item.key === active ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </button>
            )
          )}
        </nav>

        <div className="ud-sidebar-bottom">
          <button type="button" className="ud-nav-item ud-nav-item--logout" onClick={handleLogout}>
            <Icon name="logout" size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="ud-main">
        <header className="ud-topbar">
          <button
            type="button"
            className="ud-icon-btn ud-topbar-menu-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Icon name="menu" size={20} />
          </button>

          <div className="ud-topbar-greeting">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>

          <div className="ud-topbar-actions">
            <div className="ud-topbar-notif">
              <button
                type="button"
                className="ud-icon-btn"
                onClick={() => setNotifOpen((o) => !o)}
                aria-label="Notifications"
              >
                <Icon name="bell" size={19} />
                {unreadCount > 0 && <span className="ud-badge-dot">{unreadCount}</span>}
              </button>
              {notifOpen && (
                <div className="ud-notif-dropdown">
                  <p className="ud-notif-dropdown-title">Notifications</p>
                  {NOTIFICATIONS.slice(0, 3).map((n) => (
                    <div key={n.key} className={`ud-notif-item ${n.unread ? "unread" : ""}`}>
                      <span className="ud-notif-item-dot" />
                      <div>
                        <p>{n.text}</p>
                        <span>{n.time}</span>
                      </div>
                    </div>
                  ))}
                  <Link
                    to="/dashboard#notifications"
                    className="ud-notif-dropdown-all"
                    onClick={() => setNotifOpen(false)}
                  >
                    View all
                  </Link>
                </div>
              )}
            </div>

            <div className="ud-avatar">{initials}</div>
          </div>
        </header>

        {showPromo && !promoDismissed && (
          <div className="ud-promo">
            <Icon name="sparkles" size={16} />
            <p>{PROMOS[promoIndex % PROMOS.length]}</p>
            <button type="button" onClick={() => setPromoDismissed(true)} aria-label="Dismiss">
              <Icon name="close" size={15} />
            </button>
          </div>
        )}

        <div className="ud-content">{children}</div>
      </div>
    </div>
  );
}