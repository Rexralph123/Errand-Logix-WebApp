    import "./App.css";
    import { useEffect, useRef } from "react";
    import { Routes, Route, useLocation } from "react-router-dom";

    import Navbar from "./components/Navbar";
    import Footer from "./components/Footer";
    import Logostyle from "./components/Logostyle";
    import Hero from "./components/Hero"
    import Services from "./components/Services";
    import BookingForm from "./components/Bookingform";
    import AboutPage from "./pages/AboutPage";
    import BookingPage from "./pages/BookingPage";

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
            </Routes>
        </main>

        <Footer />
        </>
    );
    }

    export default App;