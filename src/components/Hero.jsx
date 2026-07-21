import { IconBolt } from "./icons";

function scrollToId(id) {
    const el = document.getElementById(id);

    if (el) {
        el.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
}

function Hero() {
    return (
        <section className="hero">

            {/* Left Content */}
            <div className="hero-left">

                <span className="hero-tag">
                    🚀 Trusted Errand Services Across Lagos
                </span>

                <h1>
                    Every Task.
                    <br />
                    <span>Handled Professionally</span>
                </h1>

                <p className="hero-sub">
                    Whether it's shopping, deliveries, document processing,
                    pharmacy pickups, bill payments or personal errands,
                    Errand Logix connects you with trusted, verified runners
                    who save you time while you focus on what matters most
                </p>

                <div className="hero-actions">

                    <button
                        className="btn btn-solid-black"
                        onClick={() => scrollToId("booking")}
                    >
                        Book an Errand
                        <IconBolt size={18} />
                    </button>

                    <button
                        className="btn btn-outline-black"
                        onClick={() => scrollToId("services")}
                    >
                        Explore Services
                    </button>

                </div>

                <div className="hero-trust">

                    <div className="trust-item">
                        ⭐⭐⭐⭐⭐ <span>Rated 4.5/5</span>
                    </div>

                    <div className="trust-item">
                        ✔ Verified Agents
                    </div>

                    <div className="trust-item">
                        ⚡ Same-Day Service
                    </div>

                </div>

                <div className="hero-stats">

                    <div className="stat-card">
                        <h2>50+</h2>
                        <p>Completed Errands</p>
                    </div>

                    <div className="stat-card">
                        <h2>3+</h2>
                        <p>Verified Runners</p>
                    </div>

                    <div className="stat-card">
                        <h2>98%</h2>
                        <p>Customer Satisfaction</p>
                    </div>

                </div>

            </div>

            {/* Right Content */}
            <div className="hero-right">

                <div className="hero-bg"></div>

                <img
                    src="/Agent black back (3).png"
                    alt="Errand Logix Agent"
                    className="hero-image"
                />

                <div className="floating-card top">
                    📦 Package Delivered
                </div>

                <div className="floating-card middle">
                    🛒 Grocery Shopping
                </div>

                <div className="floating-card bottom">
                    🏃 Available in Minutes
                </div>

            </div>

        </section>
    );
}

export default Hero;