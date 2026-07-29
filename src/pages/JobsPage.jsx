
    import JobCard from "../components/jobs/Jobcard";
    import PerkCard from "../components/home/PerkCard";

    
    
    import {
    Bike,
    Footprints,
    Mail,
    Clock,
    Wallet,
    ShieldCheck,
    Users,
    Sparkles,
    } from "lucide-react";

    const OPEN_ROLES = [
    {
        id: "errand-agent",
        title: "Errand Agent",
        icon: Footprints,
        mode: "On Foot / Own Transport",
        type: "Flexible / Part-time",
        summary:
        "Handle everyday errands for customers around Lagos — grocery runs, document pickups, bill payments, and quick personal tasks.",
        requirements: [
        "Lives in or around Lagos",
        "Has a smartphone with data access",
        "Friendly, reliable, and punctual",
        "No prior experience needed — training provided",
        ],
    },
    {
        id: "delivery-rider",
        title: "Delivery Rider",
        icon: Bike,
        mode: "Bicycle / Motorcycle",
        type: "Full-time / Part-time",
        summary:
        "Pick up and deliver packages, food, and parcels quickly and safely across your assigned zone.",
        requirements: [
        "Owns a bicycle or motorcycle",
        "Has a valid means of ID",
        "Knows key routes around Lagos",
        "No prior experience needed — training provided",
        ],
    },
    ];

    const PERKS = [
    {
        icon: Clock,
        title: "Flexible Hours",
        copy: "Work around your own schedule — pick shifts that fit your life.",
    },
    {
        icon: Wallet,
        title: "Weekly Pay",
        copy: "Get paid weekly for every completed errand or delivery.",
    },
    {
        icon: ShieldCheck,
        title: "Safe Assignments",
        copy: "Every task is verified before it reaches you.",
    },
    {
        icon: Users,
        title: "Growing Team",
        copy: "Join a growing crew building something new across Lagos.",
    },
    ];

    function JobsPage() {
    return (
        <div className="jobs-page">
        {/* =================== JOBS HERO =================== */}
        <section className="jobs-hero">
            <div className="jobs-hero-bg"></div>
            <div className="jobs-hero-inner">
            <span className="eyebrow-pill">
                <Sparkles size={14} />
                We're Hiring
            </span>
            <h1 className="jobs-hero-title">
                Join The <span>Errand Logix</span> Team
            </h1>
            <p className="jobs-hero-sub">
                We're currently looking for Errand Agents and Delivery Riders to
                join our growing team across Lagos. No experience? No problem —
                we'll train you from day one.
            </p>
            </div>
        </section>

        {/* =================== OPEN POSITIONS =================== */}
        <section className="section section-white">
            <div className="section-head center">
            <span className="eyebrow">Open Positions</span>
            <h2>Roles we're hiring for right now</h2>
            <p>
                These two roles are open for starters — more will open as we
                grow.
            </p>
            </div>

            <div className="jobs-grid">
            {OPEN_ROLES.map((role) => (
                <JobCard key={role.id} role={role} />
            ))}
            </div>
        </section>

        {/* =================== WHY JOIN US =================== */}
        <section className="section section-black">
            <div className="section-head center">
            <span className="eyebrow">Why Join Us</span>
            <h2>What you get as part of the team</h2>
            </div>

            <div className="perks-grid">
            {PERKS.map((perk) => (
                <PerkCard key={perk.title} {...perk} />
            ))}
            </div>
        </section>

        {/* =================== JOBS CTA =================== */}
        <section className="jobs-cta">
            <div className="jobs-cta-bg"></div>
            <h2>Ready to start earning?</h2>
            <p>
            Send us your details and we'll reach out with the next steps to
            get you started.
            </p>
            <a
            className="btn btn-solid-white"
            href="mailto:errandngco@gmail.com?subject=Job Application - Errand Logix"
            >
            <Mail size={18} />
            Apply via Email
            </a>
        </section>
        </div>
    );
    }

    export default JobsPage;