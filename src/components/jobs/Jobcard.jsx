    import { MapPin, Clock, CheckCircle2, ArrowRight } from "lucide-react";

    function JobCard({ role }) {
    const { title, icon: Icon, mode, type, summary, requirements } = role;

    return (
        <div className="job-card">
        <div className="job-card-top">
            <div className="job-icon">
            <Icon size={22} />
            </div>
            <span className="job-badge">No Experience Needed</span>
        </div>

        <h3>{title}</h3>

        <div className="job-meta">
            <span>
            <MapPin size={14} /> {mode}
            </span>
            <span>
            <Clock size={14} /> {type}
            </span>
        </div>

        <p className="job-summary">{summary}</p>

        <ul className="job-requirements">
            {requirements.map((req) => (
            <li key={req}>
                <CheckCircle2 size={15} />
                <span>{req}</span>
            </li>
            ))}
        </ul>

        <a
            className="btn btn-solid-black job-apply-btn"
            href={`mailto:errandngco@gmail.com?subject=Application - ${title}`}
        >
            Apply Now
            <ArrowRight size={16} />
        </a>
        </div>
    );
    }

    export default JobCard;