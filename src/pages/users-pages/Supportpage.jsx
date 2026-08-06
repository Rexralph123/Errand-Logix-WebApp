// src/pages/users-pages/SupportPage.jsx
import { useState } from "react";
import DashboardShell, { Icon } from "../../components/user-components/DashboardShell";
import "../../styles/User.css";

const FAQS = [
  {
    q: "How do I track my errand?",
    a: "Open My Bookings from the sidebar and select your active booking. You'll see the runner's live status, ETA, and route from pickup to destination.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept card payments, bank transfers, and cash on delivery for select errand types. You can choose your preferred method at checkout when booking.",
  },
  {
    q: "Can I cancel or reschedule a booking?",
    a: "Yes. Go to My Bookings, open the relevant booking, and use the cancel option before a runner is assigned. Once a runner is en route, please contact support instead.",
  },
  {
    q: "How do reward points work?",
    a: "You earn points automatically for every completed errand. Points can be redeemed for discounts and free deliveries once our rewards program launches.",
  },
  {
    q: "What if my item is lost or damaged?",
    a: "Submit a complaint below with your booking ID and details. Our support team will investigate and get back to you within 24 hours.",
  },
];

const EMPTY_FORM = { subject: "", bookingId: "", message: "" };

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  function toggleFaq(i) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.subject.trim() || !form.message.trim()) return;
    setSubmitted(true);
    setForm(EMPTY_FORM);
  }

  return (
    <DashboardShell
      active="support"
      title="Support"
      subtitle="Get help fast — chat with us, call, or browse FAQs."
      showPromo={false}
    >
      <div className="ud-support-page">
        {/* ---------- QUICK CONTACT ---------- */}
        <section className="ud-section" style={{ paddingTop: 0 }}>
          <div className="ud-section-title">
            <h2>Contact Us</h2>
          </div>
          <div className="ud-support-grid">
            <a
              className="ud-support-item"
              href="https://wa.me/2340000000000"
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="chat" size={19} />
              <span>WhatsApp Support</span>
            </a>
            <a className="ud-support-item" href="tel:+2340000000000">
              <Icon name="phone" size={19} />
              <span>Call Customer Care</span>
            </a>
            <a className="ud-support-item" href="mailto:support@errandlogix.com">
              <Icon name="file" size={19} />
              <span>Email Support</span>
            </a>
            <a className="ud-support-item" href="#complaint">
              <Icon name="help" size={19} />
              <span>Submit a Complaint</span>
            </a>
          </div>
        </section>

        {/* ---------- FAQs ---------- */}
        <section className="ud-section">
          <div className="ud-section-title">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="ud-faq-list">
            {FAQS.map((f, i) => (
              <div className={`ud-faq-item ${openIndex === i ? "open" : ""}`} key={f.q}>
                <button type="button" className="ud-faq-question" onClick={() => toggleFaq(i)}>
                  <span>{f.q}</span>
                  <Icon name="chevron" size={16} style={{ transform: "rotate(90deg)" }} />
                </button>
                {openIndex === i && <p className="ud-faq-answer">{f.a}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* ---------- COMPLAINT FORM ---------- */}
        <section className="ud-section" id="complaint">
          <div className="ud-section-title">
            <h2>Submit a Complaint</h2>
          </div>

          <div className="ud-support-form-card">
            {submitted ? (
              <div className="ud-booking-success" style={{ padding: "30px 20px" }}>
                <div className="ud-booking-success-icon">
                  <Icon name="check" size={26} />
                </div>
                <h3>Complaint Received</h3>
                <p>
                  Thanks for letting us know. Our support team will review this and get back to
                  you within 24 hours.
                </p>
                <button
                  type="button"
                  className="btn btn-outline-black"
                  onClick={() => setSubmitted(false)}
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="ud-form-grid">
                  <div className="ud-field">
                    <label className="ud-field-label">
                      Subject <span className="ud-req">*</span>
                    </label>
                    <input
                      className="ud-input"
                      placeholder="e.g. Damaged package"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      required
                    />
                  </div>
                  <div className="ud-field">
                    <label className="ud-field-label">Booking ID</label>
                    <input
                      className="ud-input"
                      placeholder="e.g. EL-20780"
                      value={form.bookingId}
                      onChange={(e) => setForm({ ...form, bookingId: e.target.value })}
                    />
                  </div>
                  <div className="ud-field ud-field-full">
                    <label className="ud-field-label">
                      Message <span className="ud-req">*</span>
                    </label>
                    <textarea
                      className="ud-textarea ud-textarea-lg"
                      placeholder="Tell us what happened"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-solid-black">
                  Submit Complaint
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}