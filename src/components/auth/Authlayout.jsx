import { Link } from "react-router-dom";

export default function AuthLayout({ eyebrow, headline, subtext, children }) {
  return (
    <div className="auth-shell">
      <div className="auth-brand">
        <div className="auth-brand-bg" />

        <Link to="/" className="auth-brand-top">
          <p className="Logo-name">
            Errand<span>Logix</span>
          </p>
        </Link>

        <div className="auth-brand-mid">
          {eyebrow && <span className="eyebrow-pill">{eyebrow}</span>}
          <h2 className="auth-brand-headline">{headline}</h2>
          <p className="auth-brand-sub">{subtext}</p>
        </div>

        <div className="auth-brand-stats">
          <div className="auth-stat">
            <strong>500+</strong>
            <span>Errands completed</span>
          </div>
          <div className="auth-stat">
            <strong>4.9★</strong>
            <span>Average rating</span>
          </div>
          <div className="auth-stat">
            <strong>&lt;30min</strong>
            <span>Avg. response time</span>
          </div>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-card">{children}</div>
      </div>
    </div>
  );
}