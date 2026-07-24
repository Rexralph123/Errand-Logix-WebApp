
import {
    IconBag,
    IconTruck,
    IconFile,
    IconUser,
    IconBriefcase,
    IconBolt,
    IconStore,
    IconSparkle,
    } from "./ui/Icon";

const SERVICES = [
    { icon: IconBag, title: "Grocery & Market Runs", desc: "Fresh produce and market shopping handled and delivered to your door." },
    { icon: IconTruck, title: "Package Pickup & Delivery", desc: "Fast, tracked delivery for parcels across the city." },
    { icon: IconFile, title: "Document Processing", desc: "Collection, submission, and processing of official documents." },
    { icon: IconUser, title: "Personal Errands", desc: "Everyday tasks handled so you can focus on what matters." },
    { icon: IconBriefcase, title: "Corporate Errands", desc: "Reliable errand support for offices and teams." },
    { icon: IconBolt, title: "Utility Bill Payments", desc: "We queue, pay, and confirm your bills on your behalf." },
    { icon: IconStore, title: "Store Purchases", desc: "Buy items from any store in town without leaving home." },
    { icon: IconSparkle, title: "Custom Task Requests", desc: "Got something unusual? Tell us — we'll figure it out." },
    ];

const STEPS = [
    { title: "Tell us the task", desc: "Choose delivery, errand, or a custom request and share the details." },
    { title: "Get matched instantly", desc: "A verified runner near you accepts and confirms the job." },
    { title: "Track in real time", desc: "Follow your runner's progress from pickup to completion." },
    { title: "Relax — it's done", desc: "Get notified, rate the experience, and get your time back." },
    ];

function Services() {
    return (
        <>
        <section className="section section-white services" id="services">
            <div className="section-head center">
            <span className="eyebrow">What We Do</span>
            <h2>One platform for every errand</h2>
            <p>
                From routine tasks to last-minute requests, our runners handle it
                with speed, care, and full transparency.
            </p>
        </div>

        <div className="services-grid">
            {SERVICES.map((s) => (
                <div className="service-card" key={s.title}>
                <div className="service-icon">
                    <s.icon size={22} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
            </div>
            ))}
        </div>
    </section>

    <section className="section section-black" id="how-it-works">
        <div className="section-head center">
            <span className="eyebrow">Simple Process</span>
            <h2 style={{ color: "white" }}>Booking a runner takes under a minute</h2>
            <p>No calls, no back and forth, just tell us what you need.</p>
        </div>

        <div className="steps-grid">
            {STEPS.map((s, i) => (
                <div className="step" key={s.title}>
                <div className="step-num">{i + 1}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
                </div>
            ))}
        </div>
        </section>
    </>
    );
}

export default Services;