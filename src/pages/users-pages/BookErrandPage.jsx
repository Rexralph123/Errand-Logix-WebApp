// src/pages/users-pages/BookErrandPage.jsx
import DashboardShell from "../../components/user-components/DashboardShell";
import DashboardBookingForm from "../../components/user-components/DashboardBookingForm";
import "../../styles/User.css";

export default function BookErrandPage() {
  return (
    <DashboardShell
      active="book"
      title="Book an Errand"
      subtitle="Pick a service, fill in the details, and confirm."
      showPromo={false}
    >
      <div className="ud-book-page">
        <DashboardBookingForm />
      </div>
    </DashboardShell>
  );
}