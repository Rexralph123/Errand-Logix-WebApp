import Login from "./auth/Login";
import Register from "./auth/Register";
// ...existing imports

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/bookings" element={<BookingPage />} />
  <Route path="/jobs" element={<JobsPage />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
</Routes>



import "./App.css";
    import { useEffect, useRef } from "react";
    import { Routes, Route, useLocation } from "react-router-dom";

    import Navbar from "./components/common/Navbar";
    import Footer from "./components/common/Footer";
    import Logostyle from "./components/common/Logostyle";
    import Hero from "./components/home/Hero"
    import Services from "./components/home/Services";
    import BookingForm from "./components/booking/Bookingform";
    import AboutPage from "./pages/AboutPage";
    import BookingPage from "./pages/BookingPage";
    import JobsPage from "./pages/JobsPage";
    import Coverage from "./components/home/Coverage";

    function useReveal() {
    const rootRef = useRef(null);

    useEffect(() => {
        const nodes = rootRef.current?.querySelectorAll("[data-reveal]");
        if (!nodes || nodes.length === 0) return;

        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);
            }
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
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
        if (location.hash) {
        const id = location.hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
            setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
        }
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

        {/* =================== BOOKING FORM =================== */}
        <BookingForm />
        </div>
    );
    }

    function App() {
    return (
        <>
        <Navbar />

        <main className="main">
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/bookings" element={<BookingPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            </Routes>
        </main>

        <Footer />
        </>
    );
    }

    export default App;