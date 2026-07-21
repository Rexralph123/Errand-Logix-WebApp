import { useState } from "react";
import {
  IconTruck,
  IconBag,
  IconFile,
  IconBriefcase,
  IconBolt,
  IconStore,
  IconSparkle,
  IconCheck,
  IconInfo,
} from "../icons";

const TABS = [
  { key: "delivery", label: "Delivery Booking", sub: "Send or receive a package", icon: IconTruck },
  { key: "errand", label: "Errand Booking", sub: "Grocery, bills, documents & more", icon: IconBag },
  { key: "custom", label: "Custom Concierge", sub: "Describe your own request", icon: IconSparkle },
];

const TASK_TYPES = [
  { key: "grocery", label: "Grocery Run", icon: IconBag },
  { key: "document", label: "Document Task", icon: IconFile },
  { key: "bills", label: "Bill Payment", icon: IconBolt },
  { key: "purchase", label: "Store Purchase", icon: IconStore },
  { key: "corporate", label: "Corporate", icon: IconBriefcase },
  { key: "other", label: "Other", icon: IconSparkle },
];

const PACKAGE_SIZES = [
  { key: "small", label: "Small (envelope/bag)", fee: 1500 },
  { key: "medium", label: "Medium (box/parcel)", fee: 2500 },
  { key: "large", label: "Large (bulky item)", fee: 4000 },
];

const URGENCY = [
  { key: "standard", label: "Standard (same day)", fee: 0 },
  { key: "express", label: "Express (2 hours)", fee: 1500 },
  { key: "urgent", label: "Urgent (60 mins)", fee: 3000 },
];

const CONCIERGE_TIERS = [
  { key: "onetime", label: "One-Time Task" },
  { key: "premium", label: "Premium Concierge" },
  { key: "corporate", label: "Corporate Retainer" },
];

function Field({ label, required, children }) {
  return (
    <div className="field">
      <label>
        {label} {required && <span className="req">*</span>}
      </label>
      {children}
    </div>
  );
}

function DeliveryForm({ data, setData }) {
  const update = (k, v) => setData((d) => ({ ...d, [k]: v }));
  return (
    <>
      <h3 className="form-title">Delivery Booking</h3>
      <p className="form-desc">
        Tell us where your package is coming from and going to, we'll match
        you with a nearby runner.
      </p>

      <div className="form-grid">
        <Field label="Pickup Address" required>
          <input
            placeholder="e.g. 14 Allen Avenue, Ikeja"
            value={data.pickup}
            onChange={(e) => update("pickup", e.target.value)}
          />
        </Field>
        <Field label="Drop-off Address" required>
          <input
            placeholder="e.g. 5 Admiralty Way, Lekki"
            value={data.dropoff}
            onChange={(e) => update("dropoff", e.target.value)}
          />
        </Field>
        <Field label="Recipient Name" required>
          <input
            placeholder="Full name"
            value={data.recipient}
            onChange={(e) => update("recipient", e.target.value)}
          />
        </Field>
        <Field label="Recipient Phone" required>
          <input
            placeholder="080X XXX XXXX"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Package Size" required>
        <div className="pill-group">
          {PACKAGE_SIZES.map((p) => (
            <button
              key={p.key}
              type="button"
              className={`pill ${data.size === p.key ? "selected" : ""}`}
              onClick={() => update("size", p.key)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Delivery Speed" required>
        <div className="pill-group">
          {URGENCY.map((u) => (
            <button
              key={u.key}
              type="button"
              className={`pill ${data.urgency === u.key ? "selected" : ""}`}
              onClick={() => update("urgency", u.key)}
            >
              {u.label}
            </button>
          ))}
        </div>
      </Field>

      <div className="field full">
        <label>Delivery Notes (optional)</label>
        <textarea
          placeholder="Fragile item, call before arrival, gate code, etc."
          value={data.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
      </div>
    </>
  );
}

function ErrandForm({ data, setData }) {
  const update = (k, v) => setData((d) => ({ ...d, [k]: v }));
  return (
    <>
      <h3 className="form-title">Errand Booking</h3>
      <p className="form-desc">
        Pick the type of errand and give us the details, a verified runner
        will take it from there.
      </p>

      <Field label="Type of Errand" required>
        <div className="task-grid">
          {TASK_TYPES.map((t) => (
            <button
              type="button"
              key={t.key}
              className={`task-chip ${data.taskType === t.key ? "selected" : ""}`}
              onClick={() => update("taskType", t.key)}
            >
              <t.icon size={20} />
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </Field>

      <div className="form-grid">
        <Field label="Errand Location" required>
          <input
            placeholder="Where should the runner go?"
            value={data.location}
            onChange={(e) => update("location", e.target.value)}
          />
        </Field>
        <Field label="Delivery / Drop-off Address" required>
          <input
            placeholder="Where should it be delivered?"
            value={data.dropoff}
            onChange={(e) => update("dropoff", e.target.value)}
          />
        </Field>
      </div>

      <div className="field full">
        <label>Task Details</label>
        <textarea
          placeholder="List items, document type, bill account number, or specific instructions"
          value={data.details}
          onChange={(e) => update("details", e.target.value)}
        />
      </div>

      <Field label="How Soon?" required>
        <div className="pill-group">
          {URGENCY.map((u) => (
            <button
              key={u.key}
              type="button"
              className={`pill ${data.urgency === u.key ? "selected" : ""}`}
              onClick={() => update("urgency", u.key)}
            >
              {u.label}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Estimated Budget for Items (₦)">
        <input
          type="number"
          placeholder="e.g. 15000"
          value={data.budget}
          onChange={(e) => update("budget", e.target.value)}
        />
      </Field>
    </>
  );
}

function CustomForm({ data, setData }) {
  const update = (k, v) => setData((d) => ({ ...d, [k]: v }));
  return (
    <>
      <h3 className="form-title">Customize Your Request</h3>
      <p className="form-desc">
        Have a task that doesn't fit a category? Describe exactly what you
        need, our concierge team will scope it and confirm pricing.
      </p>

      <Field label="Service Tier" required>
        <div className="pill-group">
          {CONCIERGE_TIERS.map((t) => (
            <button
              key={t.key}
              type="button"
              className={`pill ${data.tier === t.key ? "selected" : ""}`}
              onClick={() => update("tier", t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Field>

      <div className="field full">
        <label>
          Describe Your Request <span className="req">*</span>
        </label>
        <textarea
          style={{ minHeight: 130 }}
          placeholder="Tell us exactly what you need done, including any locations, timing, or special requirements..."
          value={data.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </div>

      <div className="form-grid">
        <Field label="Preferred Date">
          <input
            type="date"
            value={data.date}
            onChange={(e) => update("date", e.target.value)}
          />
        </Field>
        <Field label="Preferred Time">
          <input
            type="time"
            value={data.time}
            onChange={(e) => update("time", e.target.value)}
          />
        </Field>
        <Field label="Estimated Budget (₦)">
          <input
            type="number"
            placeholder="Optional — helps us scope it"
            value={data.budget}
            onChange={(e) => update("budget", e.target.value)}
          />
        </Field>
        <Field label="Contact Phone" required>
          <input
            placeholder="080X XXX XXXX"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </Field>
      </div>
    </>
  );
}

function estimateTotal(tab, data) {
  const base = { delivery: 1500, errand: 1200, custom: 0 }[tab];
  const urgencyFee = (URGENCY.find((u) => u.key === data.urgency) || {}).fee || 0;
  const sizeFee =
    tab === "delivery" ? (PACKAGE_SIZES.find((p) => p.key === data.size) || {}).fee || 0 : 0;
  if (tab === "custom") return null;
  return base + urgencyFee + sizeFee;
}

function Booking() {
  const [tab, setTab] = useState("delivery");
  const [submitted, setSubmitted] = useState(false);

  const [deliveryData, setDeliveryData] = useState({
    pickup: "", dropoff: "", recipient: "", phone: "", size: "small", urgency: "standard", notes: "",
  });
  const [errandData, setErrandData] = useState({
    taskType: "grocery", location: "", dropoff: "", details: "", urgency: "standard", budget: "",
  });
  const [customData, setCustomData] = useState({
    tier: "onetime", description: "", date: "", time: "", budget: "", phone: "",
  });

  const dataFor = { delivery: deliveryData, errand: errandData, custom: customData };
  const total = estimateTotal(tab, dataFor[tab]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const switchTab = (key) => {
    setTab(key);
    setSubmitted(false);
  };

  return (
    <section className="booking" id="booking">
      <div className="section-head center" style={{ paddingTop: 90 }}>
        <span className="eyebrow">Get Started</span>
        <h2>Book your errand</h2>
        <p>
          Choose delivery, errand, or a fully custom concierge request,
          confirm details, and a verified runner takes it from here.
        </p>
      </div>

      <div className="booking-card">
        <div className="tab-row">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`tab-btn ${tab === t.key ? "active" : ""}`}
              onClick={() => switchTab(t.key)}
            >
              <span className="tab-icon">
                <t.icon size={20} />
              </span>
              <span className="tab-label">{t.label}</span>
              <span className="tab-sub">{t.sub}</span>
            </button>
          ))}
        </div>

        {submitted ? (
          <div className="success-box">
            <div className="success-icon">
              <IconCheck size={32} />
            </div>
            <h3>Request received!</h3>
            <p>
              A verified Errand Logix runner will be assigned shortly. You'll
              get an SMS and in-app update as soon as your task is picked up.
            </p>
            <button className="btn btn-solid-black" onClick={() => switchTab(tab)}>
              Book Another Task
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="booking-layout">
              <div className="booking-body">
                {tab === "delivery" && <DeliveryForm data={deliveryData} setData={setDeliveryData} />}
                {tab === "errand" && <ErrandForm data={errandData} setData={setErrandData} />}
                {tab === "custom" && <CustomForm data={customData} setData={setCustomData} />}
              </div>

              <div className="summary-panel">
                <h4>Order Summary</h4>

                <div className="summary-row">
                  <span>Service</span>
                  <span>{TABS.find((t) => t.key === tab).label}</span>
                </div>

                {tab === "delivery" && (
                  <>
                    <div className="summary-row">
                      <span>Package Size</span>
                      <span>{PACKAGE_SIZES.find((p) => p.key === deliveryData.size)?.label || "—"}</span>
                    </div>
                    <div className="summary-row">
                      <span>Speed</span>
                      <span>{URGENCY.find((u) => u.key === deliveryData.urgency)?.label || "—"}</span>
                    </div>
                  </>
                )}

                {tab === "errand" && (
                  <>
                    <div className="summary-row">
                      <span>Task Type</span>
                      <span>{TASK_TYPES.find((t) => t.key === errandData.taskType)?.label || "—"}</span>
                    </div>
                    <div className="summary-row">
                      <span>Speed</span>
                      <span>{URGENCY.find((u) => u.key === errandData.urgency)?.label || "—"}</span>
                    </div>
                  </>
                )}

                {tab === "custom" && (
                  <div className="summary-row">
                    <span>Tier</span>
                    <span>{CONCIERGE_TIERS.find((t) => t.key === customData.tier)?.label || "—"}</span>
                  </div>
                )}

                <div className="summary-total">
                  <span>{total === null ? "Quote" : "Estimated Fee"}</span>
                  <strong>{total === null ? "On Review" : `₦${total.toLocaleString()}`}</strong>
                </div>

                <div className="summary-note">
                  <IconInfo size={16} />
                  <span>
                    Final pricing is confirmed by your runner before the task
                    begins. No hidden charges.
                  </span>
                </div>

                <button type="submit" className="btn btn-solid-white btn-block" style={{ marginTop: 28 }}>
                  Confirm Booking
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export default Booking;