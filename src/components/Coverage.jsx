    import { MapPin, CheckCircle2, Clock3 } from "lucide-react";

    const ACTIVE_AREAS = [
    {
        name: "Ago Palace Way",
        note: "Full-day coverage, fastest average pickup time on the network.",
    },
    {
        name: "Festac Town",
        note: "Full-day coverage, including Festac Link Bridge and 1st Avenue.",
    },
    ];

    const COMING_SOON_AREAS = [
    "Surulere",
    "Yaba",
    "Ikeja",
    "Lekki",
    "Victoria Island",
    "Ikoyi",
    "Ajah",
    "Apapa",
    "Oshodi",
    "Alaba",
    ];

    function Coverage() {
    return (
        <section className="section section-white coverage-section" data-reveal>
        <div className="section-head center">
            <span className="eyebrow">Service Areas</span>
            <h2>Where we're delivering right now</h2>
            <p>
            We're starting small and doing it properly. Right now we run full coverage
            in Ago Palace Way and Festac — everywhere else in Lagos is next.
            </p>
        </div>

        <div className="coverage-grid coverage-grid-active">
            {ACTIVE_AREAS.map((area) => (
            <div className="coverage-card active" key={area.name}>
                <div className="coverage-card-top">
                <div className="coverage-icon">
                    <MapPin size={20} />
                </div>
                <span className="coverage-badge live">
                    <CheckCircle2 size={13} /> Now delivering
                </span>
                </div>
                <h3>{area.name}</h3>
                <p>{area.note}</p>
            </div>
            ))}
        </div>

        <div className="coverage-soon-head">
            <h4>Coming soon across Lagos</h4>
            <p>Not in Ago Palace Way or Festac? We're headed your way next.</p>
        </div>

        <div className="coverage-grid coverage-grid-soon">
            {COMING_SOON_AREAS.map((area) => (
            <div className="coverage-card soon" key={area}>
                <span className="coverage-badge soon">
                <Clock3 size={12} /> Coming soon
                </span>
                <h5>{area}</h5>
            </div>
            ))}
        </div>
        </section>
    );
    }

    export default Coverage;