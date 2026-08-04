// src/pages/users-pages/DashboardPage.jsx
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import DashboardShell, { Icon } from "../../components/user-components/DashboardShell";
import { useEffect } from "react";
import "../../styles/User.css";


/* ============== MOCK DATA (unchanged) ============== */
const STATS = [
  { key: "completed", label: "Completed Errands", value: 24, icon: "check" },
  { key: "active", label: "Active Booking", value: 1, icon: "truck" },
  { key: "pending", label: "Pending Bookings", value: 2, icon: "history" },
  { key: "points", label: "Reward Points", value: 860, icon: "gift" },
];

const QUICK_ACTIONS = [
  { key: "package", label: "Package Delivery", icon: "package" },
  { key: "document", label: "Document Pickup", icon: "file" },
  { key: "shopping", label: "Personal Shopping", icon: "bag" },
  { key: "grocery", label: "Grocery Shopping", icon: "cart" },
  { key: "food", label: "Food Delivery", icon: "utensils" },
  { key: "giftdelivery", label: "Gift Delivery", icon: "giftbox" },
  { key: "medicine", label: "Medicine Pickup", icon: "pill" },
  { key: "laundry", label: "Laundry Pickup", icon: "shirt" },
  { key: "custom", label: "Custom Errand", icon: "sparkles" },
];

const ACTIVE_BOOKING = {
  id: "EL-20841",
  type: "Package Delivery",
  pickup: "14 Admiralty Way, Lekki Phase 1",
  destination: "22 Adeola Odeku St, Victoria Island",
  status: "In Transit",
  statusIndex: 3,
  eta: "18 mins",
  runner: { name: "Tunde Bakare", rating: 4.9, phone: "+234 803 555 0142" },
};

const BOOKING_STEPS = ["Runner Assigned", "Heading to Pickup", "Picked Up", "In Transit", "Delivered"];

const BOOKING_HISTORY = [
  { id: "EL-20780", type: "Grocery Shopping", date: "Jul 29, 2026", amount: "₦12,500", status: "Completed" },
  { id: "EL-20745", type: "Document Pickup", date: "Jul 24, 2026", amount: "₦4,000", status: "Completed" },
  { id: "EL-20698", type: "Food Delivery", date: "Jul 19, 2026", amount: "₦6,200", status: "Cancelled" },
  { id: "EL-20654", type: "Custom Errand", date: "Jul 12, 2026", amount: "₦9,800", status: "Completed" },
];

const ADDRESSES = [
  { key: "home", label: "Home", address: "14 Admiralty Way, Lekki Phase 1, Lagos", isDefault: true },
  { key: "office", label: "Office", address: "22 Adeola Odeku St, Victoria Island, Lagos", isDefault: false },
];

const NOTIFICATIONS = [
  { key: 1, text: "Your runner Tunde is heading to the pickup location.", time: "5 min ago", unread: true },
  { key: 2, text: "Payment for booking EL-20780 was verified.", time: "3 hrs ago", unread: true },
  { key: 3, text: "Booking EL-20698 was cancelled.", time: "2 days ago", unread: false },
];

const STATUS_STYLES = {
  Completed: "ud-status--success",
  "Payment Confirmed": "ud-status--success",
  Delivered: "ud-status--success",
  Cancelled: "ud-status--cancelled",
  "Payment Failed": "ud-status--cancelled",
  "In Transit": "ud-status--progress",
  "Heading to Pickup": "ud-status--progress",
  "Runner Assigned": "ud-status--progress",
  "Awaiting Payment": "ud-status--pending",
  "Awaiting Verification": "ud-status--pending",
};

function initialsOf(name) {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
}

function greetingFor(hour) {
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const location = useLocation();

  const displayName = profile?.fullName || user?.email?.split("@")[0] || "there";
  const firstName = displayName.split(" ")[0];
  const greeting = useMemo(() => greetingFor(new Date().getHours()), []);

  // Scroll to whichever section the sidebar/topbar linked to (#history, #rewards, etc.)
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    }
  }, [location]);

  return (
    <DashboardShell
      active="dashboard"
      title={`${greeting}, ${firstName}`}
      subtitle="Welcome back. What can we help you accomplish today?"
    >
      {/* ---------- HERO ---------- */}
      <section className="ud-hero">
        <div className="ud-hero-text">
          <span className="ud-hero-tag">Member since 2026</span>
          <h2>
            Where do you need <span>an errand run</span> today?
          </h2>
          <p>Book a runner in minutes, track it live, and let us handle the rest.</p>
          <div className="ud-hero-actions">
            <Link to="/dashboard/book" className="btn btn-solid-white">
              <Icon name="plus" size={16} /> Book an Errand
            </Link>
            <a href="#history" className="btn btn-outline-white">
              View My Bookings
            </a>
          </div>
        </div>
        <div className="ud-hero-art" aria-hidden="true">
          <svg viewBox="0 0 320 220" className="ud-route-svg">
            <path
              d="M20 170 C 90 170, 70 60, 150 60 S 260 150, 300 40"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="3"
              strokeDasharray="2 12"
              strokeLinecap="round"
            />
            <circle cx="20" cy="170" r="8" fill="#F59E0B" />
            <circle cx="300" cy="40" r="8" fill="#fff" />
            <g transform="translate(150,60)">
              <circle r="16" fill="#fff" />
              <path d="M-6 0h12M0 -6v12" stroke="#0a0a0a" strokeWidth="2" />
            </g>
          </svg>
        </div>
      </section>

      {/* ---------- QUICK STATS ---------- */}
      <section className="ud-section" id="stats">
        <div className="ud-stats-grid">
          {STATS.map((s) => (
            <div className="ud-stat-card" key={s.key}>
              <div className="ud-stat-icon">
                <Icon name={s.icon} size={20} />
              </div>
              <div>
                <p className="ud-stat-value">{s.value}</p>
                <p className="ud-stat-label">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- QUICK ACTIONS ---------- */}
      <section className="ud-section">
        <div className="ud-section-title">
          <h2>Quick Actions</h2>
        </div>
        <div className="ud-quick-actions-grid">
          {QUICK_ACTIONS.map((a) => (
            <Link to="/dashboard/book" key={a.key} className="ud-quick-action-card">
              <div className="ud-quick-action-icon">
                <Icon name={a.icon} size={20} />
              </div>
              <span>{a.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- ACTIVE BOOKING ---------- */}
      <section className="ud-section">
        <div className="ud-section-title">
          <h2>Active Booking</h2>
        </div>

        {ACTIVE_BOOKING ? (
          <div className="ud-active-card">
            <div className="ud-active-head">
              <div>
                <p className="ud-active-id">{ACTIVE_BOOKING.id}</p>
                <p className="ud-active-type">{ACTIVE_BOOKING.type}</p>
              </div>
              <span className={`ud-status ${STATUS_STYLES[ACTIVE_BOOKING.status]}`}>{ACTIVE_BOOKING.status}</span>
            </div>

            <div className="ud-route">
              <div className="ud-route-point">
                <span className="ud-route-dot ud-route-dot--start" />
                <div>
                  <p className="ud-route-label">Pickup</p>
                  <p className="ud-route-address">{ACTIVE_BOOKING.pickup}</p>
                </div>
              </div>
              <div className="ud-route-connector" />
              <div className="ud-route-point">
                <span className="ud-route-dot ud-route-dot--end" />
                <div>
                  <p className="ud-route-label">Destination</p>
                  <p className="ud-route-address">{ACTIVE_BOOKING.destination}</p>
                </div>
              </div>
            </div>

            <div className="ud-progress">
              <div className="ud-progress-track">
                <div
                  className="ud-progress-fill"
                  style={{ width: `${(ACTIVE_BOOKING.statusIndex / (BOOKING_STEPS.length - 1)) * 100}%` }}
                />
              </div>
              <div className="ud-progress-steps">
                {BOOKING_STEPS.map((step, i) => (
                  <span key={step} className={i <= ACTIVE_BOOKING.statusIndex ? "done" : ""}>
                    {step}
                  </span>
                ))}
              </div>
            </div>

            <div className="ud-active-footer">
              <div className="ud-runner">
                <div className="ud-avatar ud-avatar--md">{initialsOf(ACTIVE_BOOKING.runner.name)}</div>
                <div>
                  <p className="ud-runner-name">{ACTIVE_BOOKING.runner.name}</p>
                  <p className="ud-runner-rating">
                    <Icon name="star" size={13} /> {ACTIVE_BOOKING.runner.rating} · ETA {ACTIVE_BOOKING.eta}
                  </p>
                </div>
              </div>
              <div className="ud-active-actions">
                <button type="button" className="ud-btn-pill">
                  <Icon name="phone" size={15} /> Call
                </button>
                <button type="button" className="ud-btn-pill">
                  <Icon name="chat" size={15} /> Chat
                </button>
                <button type="button" className="ud-btn-pill ud-btn-pill--dark">
                  Track Booking
                </button>
              </div>
            </div>
          </div>
        ) : (
          <EmptyState
            icon="truck"
            title="No Active Booking"
            text="You don't have an errand in progress right now."
            ctaLabel="Book an Errand"
            ctaTo="/dashboard/book"
          />
        )}
      </section>

      {/* ---------- HISTORY + SIDE WIDGETS ---------- */}
      <section className="ud-split">
        <div className="ud-split-main" id="history">
          <div className="ud-section-title">
            <h2>Booking History</h2>
            <button type="button" className="ud-link-btn">
              View all <Icon name="chevron" size={14} />
            </button>
          </div>

          {BOOKING_HISTORY.length > 0 ? (
            <div className="ud-history-list">
              {BOOKING_HISTORY.map((b) => (
                <div className="ud-history-row" key={b.id}>
                  <div className="ud-history-main">
                    <p className="ud-history-id">{b.id}</p>
                    <p className="ud-history-type">{b.type}</p>
                  </div>
                  <p className="ud-history-date">{b.date}</p>
                  <p className="ud-history-amount">{b.amount}</p>
                  <span className={`ud-status ${STATUS_STYLES[b.status]}`}>{b.status}</span>
                  <button type="button" className="ud-icon-btn ud-history-view" aria-label="View details">
                    <Icon name="chevron" size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon="history"
              title="No Booking History"
              text="Your completed and past errands will show up here."
              ctaLabel="Book your first errand"
              ctaTo="/dashboard/book"
            />
          )}
        </div>

        <div className="ud-split-side">
          <div className="ud-widget" id="rewards">
            <div className="ud-widget-head">
              <h3>Rewards</h3>
              <span className="ud-level-badge">Silver</span>
            </div>
            <p className="ud-rewards-points">860</p>
            <p className="ud-rewards-caption">points · 140 to Gold</p>
            <div className="ud-progress-track ud-progress-track--sm">
              <div className="ud-progress-fill" style={{ width: "72%" }} />
            </div>
            <button type="button" className="btn btn-outline-black ud-widget-btn">
              Invite Friends
            </button>
          </div>

          <div className="ud-widget" id="addresses">
            <div className="ud-widget-head">
              <h3>Saved Addresses</h3>
            </div>
            {ADDRESSES.map((a) => (
              <div className="ud-address-item" key={a.key}>
                <div className="ud-address-icon">
                  <Icon name="pin" size={16} />
                </div>
                <div className="ud-address-info">
                  <p>
                    {a.label} {a.isDefault && <span className="ud-address-default">Default</span>}
                  </p>
                  <span>{a.address}</span>
                </div>
                <button type="button" className="ud-icon-btn ud-icon-btn--sm" aria-label="Edit address">
                  <Icon name="edit" size={14} />
                </button>
              </div>
            ))}
            <button type="button" className="ud-widget-add">
              <Icon name="plus" size={15} /> Add New Address
            </button>
          </div>

          <div className="ud-widget" id="notifications">
            <div className="ud-widget-head">
              <h3>Notifications</h3>
              <button type="button" className="ud-link-btn ud-link-btn--sm">
                Clear all
              </button>
            </div>
            {NOTIFICATIONS.map((n) => (
              <div className={`ud-notif-item ${n.unread ? "unread" : ""}`} key={n.key}>
                <span className="ud-notif-item-dot" />
                <div>
                  <p>{n.text}</p>
                  <span>{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SUPPORT ---------- */}
      <section className="ud-section" id="support">
        <div className="ud-section-title">
          <h2>Support</h2>
        </div>
        <div className="ud-support-grid">
          <a className="ud-support-item" href="https://wa.me/2340000000000" target="_blank" rel="noreferrer">
            <Icon name="chat" size={19} />
            <span>WhatsApp Support</span>
          </a>
          <a className="ud-support-item" href="tel:+2340000000000">
            <Icon name="phone" size={19} />
            <span>Call Customer Care</span>
          </a>
          <button type="button" className="ud-support-item">
            <Icon name="help" size={19} />
            <span>FAQs</span>
          </button>
          <button type="button" className="ud-support-item">
            <Icon name="file" size={19} />
            <span>Submit a Complaint</span>
          </button>
        </div>
      </section>
    </DashboardShell>
  );
}

function EmptyState({ icon, title, text, ctaLabel, ctaTo }) {
  return (
    <div className="ud-empty">
      <div className="ud-empty-icon">
        <Icon name={icon} size={26} />
      </div>
      <h4>{title}</h4>
      <p>{text}</p>
      {ctaTo && (
        <Link to={ctaTo} className="btn btn-solid-black">
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}