import { Link } from "react-router-dom";
import DashboardShell, {
  Icon,
} from "../../components/user-components/DashboardShell";

export default function RewardsPage() {
  return (
    <DashboardShell
      active="rewards"
      title="Rewards"
      subtitle="Earn points every time you book an errand."
      showPromo={false}
    >
      <section className="ud-section">
        <div className="ud-rewards-page">
          <div className="ud-rewards-page-icon">
            <Icon name="gift" size={30} />
          </div>

          <h3>No Rewards Yet</h3>

          <p>
            Our rewards program is coming soon. Once it launches, you'll earn
            points for every completed errand and redeem them for discounts,
            free deliveries, and exclusive perks.
          </p>

          <Link to="/dashboard/book" className="btn btn-solid-black">
            Book an Errand
          </Link>
        </div>
      </section>
    </DashboardShell>
  );
}