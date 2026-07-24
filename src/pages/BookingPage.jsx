    import { useEffect, useRef } from "react";
    import { ShieldCheck, Clock, MessageCircle, Sparkles, ArrowRight } from "lucide-react";
    import BookingForm from "../components/Bookingform";

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
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const TRUST_POINTS = [
    { icon: ShieldCheck, label: "Verified Runners" },
    { icon: Clock, label: "Same-Day Completion" },
    { icon: MessageCircle, label: "Instant WhatsApp Confirmation" },
    ];

    function BookingPage() {
    const rootRef = useReveal();

    return (
        <div ref={rootRef}>
        {/* =================== BOOKING HERO =================== */}
        <section className="about-hero">
            <div className="about-hero-bg"></div>
            <div className="about-hero-inner" data-reveal>
            <span className="eyebrow-pill">
                <Sparkles size={14} />
                Book Now
            </span>
            <h1 className="about-hero-title">
                Tell Us The Task.
                <br />
                <span>We'll Handle The Rest.</span>
            </h1>
            <p className="about-hero-sub">
                Fill in the details below and confirm instantly on WhatsApp,
                a verified Errand Logix runner will pick it up shortly after.
            </p>
            <div className="about-hero-actions">
                <button className="btn btn-solid-black" onClick={() => scrollToId("booking")}>
                Start Booking
                <ArrowRight size={18} />
                </button>
            </div>

            <div className="booking-trust-row">
                {TRUST_POINTS.map(({ icon: Icon, label }) => (
                <div className="trust-item" key={label}>
                    <Icon size={16} />
                    <span>{label}</span>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* =================== BOOKING FORM =================== */}
        <BookingForm />

        {/* =================== HELP STRIP =================== */}
        <section className="booking-help" data-reveal>
            <MessageCircle size={22} />
            <div>
            <h4>Not sure what to book?</h4>
            <p>
                Message us directly on WhatsApp and our team will scope your
                request and confirm pricing personally.
            </p>
            </div>

            <a
            className="btn btn-outline-black"
            href="https://wa.me/2349050412857"
            target="_blank"
            rel="noopener noreferrer"
            >
            Chat With Us
            </a>
        </section>
        </div>
    );
    }

    export default BookingPage;