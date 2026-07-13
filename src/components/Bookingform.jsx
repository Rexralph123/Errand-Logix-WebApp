    import { useState } from "react";
    import {
    Truck,
    ShoppingBag,
    FileText,
    Briefcase,
    Zap,
    Store,
    Sparkles,
    CheckCircle2,
    Info,
    Mail,
    } from "lucide-react";

    // ── Replace these with your real business contacts ──────────────────────
    const BUSINESS_WHATSAPP_NUMBER = "2348000000000"; // digits only, country code, no + or leading 0
    const BUSINESS_EMAIL = "bookings@errandlogix.com";
    // ──────────────────────────────────────────────────────────────────────

    function IconWhatsapp({ size = 18 }) {
    // lucide-react has no official WhatsApp brand icon, so this custom SVG is kept
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.94 7.94 0 0 0-6.87 11.9L4 20l4.2-1.1a7.9 7.9 0 0 0 3.85 1h.01a7.94 7.94 0 0 0 5.54-13.58zm-5.55 12.2h-.01a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.5.65.67-2.43-.16-.25a6.6 6.6 0 1 1 12.28-3.5 6.56 6.56 0 0 1-6.68 6.59zm3.62-4.94c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.44.1-.13.19-.5.64-.62.78-.11.13-.23.15-.42.05a5.4 5.4 0 0 1-1.6-.98 6 6 0 0 1-1.1-1.37c-.12-.2 0-.3.09-.4.09-.09.2-.23.3-.35.1-.11.13-.19.2-.32.06-.13.03-.24-.02-.34-.05-.1-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.34h-.38c-.13 0-.34.05-.52.24-.18.19-.68.66-.68 1.6s.7 1.86.79 1.99c.1.13 1.37 2.09 3.32 2.93.46.2.83.32 1.11.41.47.15.9.13 1.24.08.38-.06 1.17-.48 1.33-.94.17-.46.17-.86.12-.94-.05-.09-.18-.14-.38-.24z" />
        </svg>
    );
    }

    const TABS = [
    { key: "delivery", label: "Delivery Booking", sub: "Send or receive a package", icon: Truck },
    { key: "errand", label: "Errand Booking", sub: "Grocery, bills, documents & more", icon: ShoppingBag },
    { key: "custom", label: "Custom Concierge", sub: "Describe your own request", icon: Sparkles },
    ];

    const TASK_TYPES = [
    { key: "grocery", label: "Grocery Run", icon: ShoppingBag },
    { key: "document", label: "Document Task", icon: FileText },
    { key: "bills", label: "Bill Payment", icon: Zap },
    { key: "purchase", label: "Store Purchase", icon: Store },
    { key: "corporate", label: "Corporate", icon: Briefcase },
    { key: "other", label: "Other", icon: Sparkles },
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

    function ContactFields({ data, update, showRecipient }) {
    return (
        <>
        <Field label="Your Name" required>
            <input
            placeholder="Full name"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            />
        </Field>
        <Field label="Your WhatsApp Number" required>
            <input
            placeholder="e.g. 0803 XXX XXXX"
            value={data.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
            />
        </Field>
        {!showRecipient && (
            <Field label="Your Email (optional)">
            <input
                type="email"
                placeholder="you@example.com"
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
            />
            </Field>
        )}
        </>
    );
    }

    function DeliveryForm({ data, setData }) {
    const update = (k, v) => setData((d) => ({ ...d, [k]: v }));
    return (
        <>
        <h3 className="form-title">Delivery Booking</h3>
        <p className="form-desc">
            Tell us where your package is coming from and going to — we'll match
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
            <ContactFields data={data} update={update} />
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
            Pick the type of errand and give us the details — a verified runner
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
            <ContactFields data={data} update={update} />
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
            need — our concierge team will scope it and confirm pricing.
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
            <ContactFields data={data} update={update} />
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

    function buildMessageLines(tab, data, total) {
    const lines = [`New Booking — ${TABS.find((t) => t.key === tab).label}`, ""];

    if (tab === "delivery") {
        lines.push(`Pickup: ${data.pickup || "—"}`);
        lines.push(`Drop-off: ${data.dropoff || "—"}`);
        lines.push(`Recipient: ${data.recipient || "—"} (${data.phone || "—"})`);
        lines.push(`Size: ${PACKAGE_SIZES.find((p) => p.key === data.size)?.label || "—"}`);
        lines.push(`Speed: ${URGENCY.find((u) => u.key === data.urgency)?.label || "—"}`);
        if (data.notes) lines.push(`Notes: ${data.notes}`);
    } else if (tab === "errand") {
        lines.push(`Errand: ${TASK_TYPES.find((t) => t.key === data.taskType)?.label || "—"}`);
        lines.push(`Location: ${data.location || "—"}`);
        lines.push(`Drop-off: ${data.dropoff || "—"}`);
        lines.push(`Speed: ${URGENCY.find((u) => u.key === data.urgency)?.label || "—"}`);
        if (data.details) lines.push(`Details: ${data.details}`);
        if (data.budget) lines.push(`Budget: ₦${data.budget}`);
    } else {
        lines.push(`Tier: ${CONCIERGE_TIERS.find((t) => t.key === data.tier)?.label || "—"}`);
        lines.push(`Request: ${data.description || "—"}`);
        if (data.date) lines.push(`Date: ${data.date}`);
        if (data.time) lines.push(`Time: ${data.time}`);
        if (data.budget) lines.push(`Budget: ₦${data.budget}`);
    }

    lines.push("");
    lines.push(`Customer Name: ${data.name || "—"}`);
    lines.push(`Customer WhatsApp: ${data.whatsapp || "—"}`);
    if (data.email) lines.push(`Customer Email: ${data.email}`);
    lines.push(total !== null ? `Estimated Fee: ₦${total.toLocaleString()}` : "Estimated Fee: On Review");

    return lines;
    }

    function validate(tab, data) {
    if (!data.name || data.name.trim().length < 2) return "Please enter your name.";
    if (!data.whatsapp || data.whatsapp.trim().length < 7)
        return "Please enter a valid WhatsApp number so we can confirm your booking.";

    if (tab === "delivery") {
        if (!data.pickup || !data.dropoff) return "Please fill in both pickup and drop-off addresses.";
        if (!data.recipient || !data.phone) return "Please add the recipient's name and phone number.";
    }
    if (tab === "errand") {
        if (!data.location || !data.dropoff) return "Please fill in the errand location and drop-off address.";
    }
    if (tab === "custom") {
        if (!data.description || data.description.trim().length < 10)
        return "Please describe your request in a bit more detail.";
    }
    return "";
    }

    function BookingForm() {
    const [tab, setTab] = useState("delivery");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const [deliveryData, setDeliveryData] = useState({
        pickup: "", dropoff: "", recipient: "", phone: "", size: "small", urgency: "standard",
        notes: "", name: "", whatsapp: "", email: "",
    });
    const [errandData, setErrandData] = useState({
        taskType: "grocery", location: "", dropoff: "", details: "", urgency: "standard",
        budget: "", name: "", whatsapp: "", email: "",
    });
    const [customData, setCustomData] = useState({
        tier: "onetime", description: "", date: "", time: "", budget: "",
        name: "", whatsapp: "", email: "",
    });

    const dataFor = { delivery: deliveryData, errand: errandData, custom: customData };
    const total = estimateTotal(tab, dataFor[tab]);

    const switchTab = (key) => {
        setTab(key);
        setSubmitted(false);
        setError("");
    };

    const handleWhatsApp = () => {
        const data = dataFor[tab];
        const msg = validate(tab, data);
        if (msg) return setError(msg);
        setError("");

        const message = buildMessageLines(tab, data, total).join("\n");
        const url = `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank", "noopener,noreferrer");
        setSubmitted(true);
    };

    const handleEmail = () => {
        const data = dataFor[tab];
        const msg = validate(tab, data);
        if (msg) return setError(msg);
        setError("");

        const subject = `New Booking — ${TABS.find((t) => t.key === tab).label}`;
        const body = buildMessageLines(tab, data, total).join("\n");
        const mailtoLink = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(
        subject
        )}&body=${encodeURIComponent(body)}`;
        const a = document.createElement("a");
        a.href = mailtoLink;
        a.click();
        setSubmitted(true);
    };

    return (
        <section className="booking" id="booking">
        <div className="section-head center" style={{ paddingTop: 90 }} data-reveal>
            <span className="eyebrow">Get Started</span>
            <h2>Book your errand</h2>
            <p>
            Choose delivery, errand, or a fully custom concierge request —
            confirm details, and a verified runner takes it from here.
            </p>
        </div>

        <div className="booking-card" data-reveal>
            <div className="tab-row">
            {TABS.map((t) => (
                <button
                type="button"
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
                <CheckCircle2 size={32} />
                </div>
                <h3>Request sent!</h3>
                <p>
                Your booking details are on their way to us. A verified Errand
                Logix runner will confirm shortly by WhatsApp or email.
                </p>
                <button type="button" className="btn btn-solid-black" onClick={() => switchTab(tab)}>
                Book Another Task
                </button>
            </div>
            ) : (
            <div className="booking-layout">
                <div className="booking-body">
                {tab === "delivery" && <DeliveryForm data={deliveryData} setData={setDeliveryData} />}
                {tab === "errand" && <ErrandForm data={errandData} setData={setErrandData} />}
                {tab === "custom" && <CustomForm data={customData} setData={setCustomData} />}
                {error && <p className="form-error">{error}</p>}
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

                <div className="summary-row">
                    <span>WhatsApp</span>
                    <span>{dataFor[tab].whatsapp || "—"}</span>
                </div>

                <div className="summary-total">
                    <span>{total === null ? "Quote" : "Estimated Fee"}</span>
                    <strong>{total === null ? "On Review" : `₦${total.toLocaleString()}`}</strong>
                </div>

                <div className="summary-note">
                    <Info size={16} />
                    <span>
                    Final pricing is confirmed by your runner before the task
                    begins. No hidden charges.
                    </span>
                </div>

                <div className="submit-stack">
                    <button type="button" className="btn btn-whatsapp btn-block" onClick={handleWhatsApp}>
                    <IconWhatsapp size={18} />
                    Confirm on WhatsApp
                    </button>
                    <button type="button" className="btn btn-outline-white btn-block" onClick={handleEmail}>
                    <Mail size={18} />
                    Confirm by Email
                    </button>
                </div>
                </div>
            </div>
            )}
        </div>
        </section>
    );
    }

    export default BookingForm;