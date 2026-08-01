import "./App.css";
import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

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

// import RegisterPage from "./pages/RegisterPage";
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
  ].includes(location.pathname.toLowerCase());

  return (
    <>
      {!hideLayout && <Navbar />}

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<AboutPage />} />

          <Route path="/bookings" element={<BookingPage />} />

          <Route path="/jobs" element={<JobsPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/signup" element={<RegisterPage />} />

          {/*
          <Route path="/register" element={<RegisterPage />} />

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
    </>
  );
}

export default App;