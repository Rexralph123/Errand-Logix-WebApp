// src/pages/users-pages/BookErrandPage.jsx
import DashboardShell from "../../components/user-components/DashboardShell";
import BookingForm from "../../components/booking/Bookingform";
import "../../styles/User.css";

export default function BookErrandPage() {
  return (
    <DashboardShell active="book" title="Book an Errand" subtitle="Pick a service, fill in the details, and confirm." showPromo={false}>
      <div className="ud-book-page">
        <BookingForm />
      </div>
    </DashboardShell>
  );
}