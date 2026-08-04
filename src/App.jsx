import "./App.css";
import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/common/ProtectedRoute";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Logostyle from "./components/common/Logostyle";
import Hero from "./components/home/Hero";
import Services from "./components/home/Services";
import Coverage from "./components/home/Coverage";
import BookingForm from "./components/booking/Bookingform";

import AboutPage from "./pages/AboutPage";
import BookingPage from "./pages/BookingPage";
import JobsPage from "./pages/JobsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/users-pages/DashboardPage";
import VerifyEmailPage from "./pages/Auths/VerifyEmailPage";
import EmailVerifiedPage from "./pages/Auths/EmailVerifiedPage";
import CompleteProfilePage from "./pages/users-pages/CompleteProfilePage";

import BookErrandPage from "./pages/users-pages/BookErrandPage";
import RewardsPage from "./pages/users-pages/RewardsPage";


// import ForgotPasswordPage from "./pages/ForgotPasswordPage";
// import VerifyEmailPage from "./pages/VerifyEmailPage";

function useReveal() {
  const rootRef = useRef(null);

  useEffect(() => {
    const nodes = rootRef.current?.querySelectorAll("[data-reveal]");

    if (!nodes?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return rootRef;
}

function Home() {
  const location = useLocation();
  const rootRef = useReveal();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");
    const element = document.getElementById(id);

    if (element) {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [location]);

  return (
    <div ref={rootRef}>
      <section className="Hero-section">
        <Hero />
      </section>

      <Logostyle />

      <Services />

      <Coverage />

      <BookingForm />
    </div>
  );
}

function App() {
  const location = useLocation();

  const hideLayout = [
    "/login",
    "/signup",
    "/forgot-password",
    "/verify-email",
    "/email-verified",
    "/complete-profile",
    "/dashboard",
    "/dashboard/book",
    "/dashboard/rewards",
  ].includes(location.pathname.toLowerCase());

  return (
    <AuthProvider>
      {!hideLayout && <Navbar />}

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<AboutPage />} />

          <Route path="/bookings" element={<BookingPage />} />

          <Route path="/jobs" element={<JobsPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/signup" element={<RegisterPage />} />

          <Route path="/verify-email" element={<VerifyEmailPage />} />

          <Route path="/email-verified" element={<EmailVerifiedPage />} />

          // eslint-disable-next-line no-undef, no-undef
          <Route path="/dashboard/book" element={<BookErrandPage />} />

          <Route path="/dashboard/rewards" element={<RewardsPage />} />

          <Route path="/complete-profile" element={
              <ProtectedRoute>
                <CompleteProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>

              
            }
          />

          {/*
          <Route
            path="/forgot-password"
            element={<ForgotPasswordPage />}
          />

          <Route
            path="/verify-email"
            element={<VerifyEmailPage />}
          />
          */}
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </AuthProvider>
  );
}
export default App;