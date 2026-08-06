// src/pages/users-pages/NotificationsPage.jsx
import { useMemo, useState } from "react";
import DashboardShell, { Icon } from "../../components/user-components/DashboardShell";
import "../../styles/User.css";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    text: "Your runner Tunde is heading to the pickup location.",
    time: "5 min ago",
    group: "Today",
    icon: "truck",
    unread: true,
  },
  {
    id: 2,
    text: "Payment for booking EL-20780 was verified.",
    time: "3 hrs ago",
    group: "Today",
    icon: "check",
    unread: true,
  },
  {
    id: 3,
    text: "You earned 60 reward points from booking EL-20780.",
    time: "3 hrs ago",
    group: "Today",
    icon: "gift",
    unread: false,
  },
  {
    id: 4,
    text: "Booking EL-20698 was cancelled.",
    time: "2 days ago",
    group: "Earlier",
    icon: "history",
    unread: false,
  },
  {
    id: 5,
    text: "Your address 'Office' was updated successfully.",
    time: "5 days ago",
    group: "Earlier",
    icon: "pin",
    unread: false,
  },
  {
    id: 6,
    text: "Welcome to ErrandLogix! Book your first errand to get started.",
    time: "2 weeks ago",
    group: "Earlier",
    icon: "sparkles",
    unread: false,
  },
];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter((n) => n.unread).length;

  const grouped = useMemo(() => {
    const visible =
      filter === "unread" ? notifications.filter((n) => n.unread) : notifications;
    return visible.reduce((acc, n) => {
      acc[n.group] = acc[n.group] || [];
      acc[n.group].push(n);
      return acc;
    }, {});
  }, [notifications, filter]);

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  function markOneRead(id) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  }

  const groups = Object.keys(grouped);

  return (
    <DashboardShell
      active="notifications"
      title="Notifications"
      subtitle="Stay updated on your errands and account activity."
      showPromo={false}
    >
      <div className="ud-notifications-page">
        <section className="ud-section" style={{ paddingTop: 0 }}>
          <div className="ud-section-title">
            <div className="ud-filter-tabs" style={{ margin: 0 }}>
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  className={`ud-pill ${filter === f.key ? "selected" : ""}`}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                  {f.key === "unread" && unreadCount > 0 ? ` (${unreadCount})` : ""}
                </button>
              ))}
            </div>
            <button type="button" className="ud-link-btn" onClick={markAllRead}>
              Mark all as read
            </button>
          </div>

          {groups.length > 0 ? (
            <div className="ud-notif-page-list">
              {groups.map((group) => (
                <div key={group}>
                  <p className="ud-notif-group-label">{group}</p>
                  {grouped[group].map((n) => (
                    <div
                      className={`ud-notif-item ${n.unread ? "unread" : ""}`}
                      key={n.id}
                      onClick={() => markOneRead(n.id)}
                      style={{ cursor: n.unread ? "pointer" : "default" }}
                    >
                      <div className="ud-notif-item-icon">
                        <Icon name={n.icon} size={16} />
                      </div>
                      <div>
                        <p>{n.text}</p>
                        <span>{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="ud-empty">
              <div className="ud-empty-icon">
                <Icon name="bell" size={26} />
              </div>
              <h4>You're All Caught Up</h4>
              <p>No unread notifications right now.</p>
            </div>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}