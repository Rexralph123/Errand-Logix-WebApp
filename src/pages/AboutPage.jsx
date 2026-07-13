
import { useEffect, useRef } from "react";
import {
    ShoppingCart,
    UtensilsCrossed,
    Package,
    FileText,
    Wallet,
    Pill,
    Briefcase,
    User,
    Building2,
    Sparkles,
    ShieldCheck,
    Clock,
    Zap,
    Award,
    Eye,
    Heart,
    Lightbulb,
    ArrowRight,
    Star,
    Quote,
    Users,
    MapPin,
    Mail,
} from "lucide-react";

/* --------------------------------------------------------------------
   Scroll-reveal hook — lightweight, no external libs.
   Adds .in-view to any element with data-reveal once it enters the
   viewport, and never re-runs (no flicker on scroll-back).
   -------------------------------------------------------------------- */
function useReveal() {
    const rootRef = useRef(null);

    useEffect(() => {
        const nodes = rootRef.current?.querySelectorAll("[data-reveal]");
        if (!nodes || nodes.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
        );

        nodes.forEach((node) => observer.observe(node));
        return () => observer.disconnect();
    }, []);

    return rootRef;
}

function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

/* --------------------------------------------------------------------
   Static content
   -------------------------------------------------------------------- */
const SERVICES = [
    { icon: ShoppingCart, label: "Grocery Shopping" },
    { icon: UtensilsCrossed, label: "Food Pickups" },
    { icon: Package, label: "Parcel Delivery" },
    { icon: FileText, label: "Document Processing" },
    { icon: Wallet, label: "Bill Payments" },
    { icon: Pill, label: "Pharmacy Pickups" },
    { icon: Briefcase, label: "Office Errands" },
    { icon: User, label: "Personal Errands" },
    { icon: Building2, label: "Business Support" },
    { icon: Sparkles, label: "Custom Requests" },
];

const VALUES = [
    { icon: ShieldCheck, title: "Trust", copy: "Every runner is verified, so your errands are always in safe hands." },
    { icon: Clock, title: "Reliability", copy: "We show up when we say we will, every single time." },
    { icon: Zap, title: "Speed", copy: "Fast turnarounds without cutting corners on quality." },
    { icon: Award, title: "Professionalism", copy: "A standard of service that respects your time and trust." },
    { icon: Eye, title: "Transparency", copy: "Clear pricing and honest updates, from booking to completion." },
    { icon: Heart, title: "Customer First", copy: "Every decision we make starts with what's best for you." },
    { icon: Lightbulb, title: "Innovation", copy: "Constantly improving how technology makes daily life easier." },
];

const TEAM = [
    {
        name: "Obisike Ugonna Michael",
        role: "Founder & CEO",
        copy: "Visionary entrepreneur passionate about solving everyday problems through technology and innovative logistics solutions. Leads the company's strategy, product vision and customer experience.",
        initials: "OM",
    },
    {
        name: "Eric Ejogu",
        role: "Operations & Logistics",
        copy: "Coordinates daily operations, supports logistics planning and helps ensure errands are completed efficiently while maintaining high service standards.",
        initials: "EE",
    },
];

const STATS = [
    { value: "12,000+", label: "Completed Errands" },
    { value: "800+", label: "Trusted Runners" },
    { value: "4.9★", label: "Customer Rating" },
    { value: "98%", label: "Customer Satisfaction" },
];

const WHY_FEATURES = [
    { icon: ShieldCheck, title: "Verified Runners", copy: "Every runner passes identity and background checks before joining the platform." },
    { icon: MapPin, title: "Live Tracking", copy: "Know exactly where your errand stands from pickup to completion." },
    { icon: Zap, title: "Same-Day Service", copy: "Most errands are completed within hours, not days." },
    { icon: Eye, title: "Transparent Pricing", copy: "No hidden charges — you see the full cost before you book." },
];

function AboutPage() {
    const rootRef = useReveal();

    return (
        <div ref={rootRef}>
            {/* =================== HERO ABOUT =================== */}
            <section className="about-hero">
                <div className="about-hero-bg"></div>
                <div className="about-hero-inner" data-reveal>
                    <span className="eyebrow-pill">
                        <Sparkles size={14} />
                        About Errand Logix
                    </span>
                    <h1 className="about-hero-title">
                        You Relax.
                        <br />
                        <span>We Run The Errands.</span>
                    </h1>
                    <p className="about-hero-sub">
                        Errand Logix is a technology-driven platform connecting busy
                        individuals and businesses with trusted, professional runners —
                        so the everyday tasks get done without ever slowing you down.
                    </p>
                    <div className="about-hero-actions">
                        <button
                            className="btn btn-solid-black"
                            onClick={() => scrollToId("cta")}
                        >
                            Book an Errand
                            <ArrowRight size={18} />
                        </button>
                        <button
                            className="btn btn-outline-black"
                            onClick={() => scrollToId("our-story")}
                        >
                            Our Story
                        </button>
                    </div>
                </div>
            </section>

            {/* =================== WHO WE ARE =================== */}
            <section className="section section-white">
                <div className="section-head center" data-reveal>
                    <span className="eyebrow">Who We Are</span>
                    <h2>
                        A trusted layer between you<br />and everyday tasks
                    </h2>
                    <p>
                        Errand Logix helps individuals and businesses complete everyday
                        tasks quickly, securely and affordably. From groceries to
                        government paperwork, our network of verified runners is built
                        to handle it — reliably, transparently, and on your schedule.
                    </p>
                </div>

                <div className="services-chip-grid" data-reveal>
                    {SERVICES.map(({ icon: Icon, label }) => (
                        <div className="service-chip" key={label}>
                            <div className="service-chip-icon">
                                <Icon size={20} />
                            </div>
                            <span>{label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* =================== OUR STORY =================== */}
            <section className="section section-black" id="our-story">
                <div className="story-layout">
                    <div className="story-copy" data-reveal>
                        <span className="eyebrow">Our Story</span>
                        <h2>Built from a problem we lived, not one we imagined</h2>
                        <p>
                            Errand Logix began with a simple observation: the people
                            working hardest to build their careers and support their
                            families were the same people who had no time left to run a
                            single errand. Groceries went unbought, documents went
                            unprocessed, and small tasks quietly piled into stress.
                        </p>
                        <p>
                            Founder Obisike Ugonna Michael saw this pattern repeat across
                            professionals, parents and small business owners in Lagos —
                            capable people, stretched thin by the logistics of daily
                            life. Existing options were informal, inconsistent, or simply
                            didn't scale. So he set out to build something different: a
                            platform where reliability isn't the exception, it's the
                            standard.
                        </p>
                        <p>
                            What started as a focused idea has grown into a technology
                            driven service built on trust, innovation and convenience —
                            connecting people to verified runners through a platform
                            designed to feel effortless. At its core, Errand Logix is
                            about community: giving people back their time, one errand
                            at a time.
                        </p>
                    </div>

                    <div className="story-quote-card" data-reveal>
                        <Quote size={28} className="quote-mark" />
                        <p>
                            We didn't set out to build another delivery app. We set out
                            to give people their time back — and build a company Lagos
                            could trust with the small things that matter most.
                        </p>
                        <div className="story-quote-author">
                            <div className="avatar-circle">OM</div>
                            <div>
                                <strong>Obisike Ugonna Michael</strong>
                                <span>Founder &amp; CEO, Errand Logix</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =================== MISSION & VISION =================== */}
            <section className="section section-white">
                <div className="section-head center" data-reveal>
                    <span className="eyebrow">Mission &amp; Vision</span>
                    <h2>What drives everything we build</h2>
                </div>

                <div className="mv-grid" data-reveal>
                    <div className="mv-card">
                        <div className="mv-icon">
                            <Zap size={22} />
                        </div>
                        <h3>Our Mission</h3>
                        <p>
                            To simplify everyday living by connecting individuals and
                            businesses with trusted, professional errand runners who
                            handle daily tasks efficiently, securely, and affordably.
                        </p>
                    </div>

                    <div className="mv-card mv-card-dark">
                        <div className="mv-icon">
                            <Star size={22} />
                        </div>
                        <h3>Our Vision</h3>
                        <p>
                            To become Africa's most trusted technology-driven errand and
                            lifestyle assistance platform.
                        </p>
                    </div>
                </div>
            </section>

            {/* =================== CORE VALUES =================== */}
            <section className="section section-black">
                <div className="section-head center" data-reveal>
                    <span className="eyebrow">Core Values</span>
                    <h2>The principles behind every errand</h2>
                </div>

                <div className="values-grid" data-reveal>
                    {VALUES.map(({ icon: Icon, title, copy }) => (
                        <div className="value-card" key={title}>
                            <div className="value-icon">
                                <Icon size={22} />
                            </div>
                            <h4>{title}</h4>
                            <p>{copy}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* =================== MEET THE TEAM =================== */}
            <section className="section section-white">
                <div className="section-head center" data-reveal>
                    <span className="eyebrow">Meet The Team</span>
                    <h2>The people behind Errand Logix</h2>
                    <p>
                        We're a small, growing team building something we believe Lagos
                        genuinely needs — and we're actively expanding to bring more
                        passionate people on board.
                    </p>
                </div>

                <div className="team-grid" data-reveal>
                    {TEAM.map(({ name, role, copy, initials }) => (
                        <div className="team-card" key={name}>
                            <div className="team-avatar">{initials}</div>
                            <h3>{name}</h3>
                            <span className="team-role">{role}</span>
                            <p>{copy}</p>
                            <div className="team-contact">
                                <Mail size={15} />
                                <span>Errand Logix Team</span>
                            </div>
                        </div>
                    ))}

                    <div className="team-card team-card-join">
                        <div className="team-avatar team-avatar-ghost">
                            <Users size={22} />
                        </div>
                        <h3>We're Growing</h3>
                        <span className="team-role">Join Our Team</span>
                        <p>
                            We're actively building a passionate team committed to
                            delivering exceptional service across Lagos and beyond.
                        </p>
                    </div>
                </div>
            </section>

            {/* =================== WHY CHOOSE ERRAND LOGIX =================== */}
            <section className="section section-black">
                <div className="section-head center" data-reveal>
                    <span className="eyebrow">Why Choose Errand Logix</span>
                    <h2>Numbers that back up the promise</h2>
                </div>

                <div className="why-stats-grid" data-reveal>
                    {STATS.map(({ value, label }) => (
                        <div className="why-stat-card" key={label}>
                            <h3>{value}</h3>
                            <p>{label}</p>
                        </div>
                    ))}
                </div>

                <div className="why-features-grid" data-reveal>
                    {WHY_FEATURES.map(({ icon: Icon, title, copy }) => (
                        <div className="why-feature-card" key={title}>
                            <div className="why-feature-icon">
                                <Icon size={20} />
                            </div>
                            <div>
                                <h4>{title}</h4>
                                <p>{copy}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* =================== CALL TO ACTION =================== */}
            <section className="about-cta" id="cta" data-reveal>
                <div className="about-cta-bg"></div>
                <h2>
                    Ready to get your time back?
                </h2>
                <p>
                    Book your first errand in minutes and let a verified Errand Logix
                    runner handle the rest.
                </p>
                <div className="about-cta-actions">
                    <button
                        className="btn btn-solid-white"
                        onClick={() => scrollToId("booking")}
                    >
                        Book an Errand Today
                        <ArrowRight size={18} />
                    </button>
                    <button
                        className="btn btn-outline-white"
                        onClick={() => scrollToId("services")}
                    >
                        Explore Services
                    </button>
                </div>
            </section>
        </div>
    );
}

export default AboutPage;