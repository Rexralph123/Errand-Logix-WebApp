// src/pages/users-pages/MyBookingsPage.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DashboardShell, { Icon } from "../../components/user-components/DashboardShell";
import "../../styles/User.css";

/* ============== MOCK DATA ============== */
const ACTIVE_BOOKING = {
  id: "EL-20841",
  type: "Package Delivery",
  pickup: "14 Admiralty Way, Lekki Phase 1",
  destination: "22 Adeola Odeku St, Victoria Island",
  status: "In Transit",
  eta: "18 mins",
  runner: { name: "Tunde Bakare", rating: 4.9 },
};

const BOOKINGS = [
  {
    id: "EL-20841",
    type: "Package Delivery",
    date: "Aug 05, 2026",
    amount: "₦8,500",
    status: "In Transit",
    pickup: "14 Admiralty Way, Lekki Phase 1",
    destination: "22 Adeola Odeku St, Victoria Island",
    runner: { name: "Tunde Bakare", rating: 4.9 },
  },
  {
    id: "EL-20780",
    type: "Grocery Shopping",
    date: "Jul 29, 2026",
    amount: "₦12,500",
    status: "Completed",
    pickup: "Shoprite, Lekki",
    destination: "14 Admiralty Way, Lekki Phase 1",
    runner: { name: "Amara Chukwu", rating: 4.8 },
  },
  {
    id: "EL-20745",
    type: "Document Pickup",
    date: "Jul 24, 2026",
    amount: "₦4,000",
    status: "Completed",
    pickup: "22 Adeola Odeku St, Victoria Island",
    destination: "14 Admiralty Way, Lekki Phase 1",
    runner: { name: "Emeka Obi", rating: 4.7 },
  },
  {
    id: "EL-20698",
    type: "Food Delivery",
    date: "Jul 19, 2026",
    amount: "₦6,200",
    status: "Cancelled",
    pickup: "Terra Kulture, Victoria Island",
    destination: "14 Admiralty Way, Lekki Phase 1",
    runner: null,
  },
  {
    id: "EL-20654",
    type: "Custom Errand",
    date: "Jul 12, 2026",
    amount: "₦9,800",
    status: "Completed",
    pickup: "14 Admiralty Way, Lekki Phase 1",
    destination: "Ikeja City Mall",
    runner: { name: "Bisi Adeyemi", rating: 5.0 },
  },
  {
    id: "EL-20601",
    type: "Medicine Pickup",
    date: "Jul 05, 2026",
    amount: "₦3,200",
    status: "Pending",
    pickup: "HealthPlus, Lekki",
    destination: "14 Admiralty Way, Lekki Phase 1",
    runner: null,
  },
];

const STATUS_STYLES = {
  Completed: "ud-status--success",
  Cancelled: "ud-status--cancelled",
  "In Transit": "ud-status--progress",
  Pending: "ud-status--pending",
};

const FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

function matchesFilter(status, filter) {
  if (filter === "all") return true;
  if (filter === "active") return status === "In Transit" || status === "Pending";
  if (filter === "completed") return status === "Completed";
  if (filter === "cancelled") return status === "Cancelled";
  return true;
}

export default function MyBookingsPage() {
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  const filtered = useMemo(
    () => BOOKINGS.filter((b) => matchesFilter(b.status, filter)),
    [filter]
  );

  return (
    <DashboardShell
      active="history"
      title="My Bookings"
      subtitle="Track your active errand and browse past bookings."
      showPromo={false}
    >
      <div className="ud-bookings-page">
        {/* ---------- ACTIVE BOOKING ---------- */}
        {ACTIVE_BOOKING && (
          <section className="ud-section" style={{ paddingTop: 0 }}>
            <div className="ud-section-title">
              <h2>Active Booking</h2>
            </div>
            <div className="ud-active-card">
              <div className="ud-active-head">
                <div>
                  <p className="ud-active-id">{ACTIVE_BOOKING.id}</p>
                  <p className="ud-active-type">{ACTIVE_BOOKING.type}</p>
                </div>
                <span className={`ud-status ${STATUS_STYLES[ACTIVE_BOOKING.status]}`}>
                  {ACTIVE_BOOKING.status}
                </span>
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

              <div className="ud-active-footer">
                <div className="ud-runner">
                  <div className="ud-avatar ud-avatar--md">
                    {ACTIVE_BOOKING.runner.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="ud-runner-name">{ACTIVE_BOOKING.runner.name}</p>
                    <p className="ud-runner-rating">
                      <Icon name="star" size={13} /> {ACTIVE_BOOKING.runner.rating} · ETA{" "}
                      {ACTIVE_BOOKING.eta}
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
          </section>
        )}

        {/* ---------- HISTORY ---------- */}
        <section className="ud-section">
          <div className="ud-section-title">
            <h2>Booking History</h2>
          </div>

          <div className="ud-filter-tabs">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`ud-pill ${filter === f.key ? "selected" : ""}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="ud-history-list">
              {filtered.map((b) => {
                const isOpen = expandedId === b.id;
                return (
                  <div key={b.id}>
                    <div
                      className="ud-history-row expandable"
                      onClick={() => setExpandedId(isOpen ? null : b.id)}
                    >
                      <div className="ud-history-main">
                        <p className="ud-history-id">{b.id}</p>
                        <p className="ud-history-type">{b.type}</p>
                      </div>
                      <p className="ud-history-date">{b.date}</p>
                      <p className="ud-history-amount">{b.amount}</p>
                      <span className={`ud-status ${STATUS_STYLES[b.status]}`}>{b.status}</span>
                      <button
                        type="button"
                        className="ud-icon-btn ud-history-view"
                        aria-label="View details"
                      >
                        <Icon
                          name="chevron"
                          size={16}
                          className={`ud-history-chevron ${isOpen ? "open" : ""}`}
                        />
                      </button>
                    </div>

                    {isOpen && (
                      <div className="ud-booking-expand">
                        <div className="ud-route">
                          <div className="ud-route-point">
                            <span className="ud-route-dot ud-route-dot--start" />
                            <div>
                              <p className="ud-route-label">Pickup</p>
                              <p className="ud-route-address">{b.pickup}</p>
                            </div>
                          </div>
                          <div className="ud-route-connector" />
                          <div className="ud-route-point">
                            <span className="ud-route-dot ud-route-dot--end" />
                            <div>
                              <p className="ud-route-label">Destination</p>
                              <p className="ud-route-address">{b.destination}</p>
                            </div>
                          </div>
                        </div>
                        {b.runner && (
                          <div className="ud-runner">
                            <div className="ud-avatar ud-avatar--md">
                              {b.runner.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <p className="ud-runner-name">{b.runner.name}</p>
                              <p className="ud-runner-rating">
                                <Icon name="star" size={13} /> {b.runner.rating}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="ud-empty">
              <div className="ud-empty-icon">
                <Icon name="history" size={26} />
              </div>
              <h4>No Bookings Here</h4>
              <p>Nothing matches this filter yet.</p>
              <Link to="/dashboard/book" className="btn btn-solid-black">
                Book an Errand
              </Link>
            </div>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}