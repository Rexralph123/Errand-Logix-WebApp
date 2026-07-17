    import "./App.css";
    import { useEffect } from "react";
    import { Routes, Route, useLocation } from "react-router-dom";

    import Navbar from "./components/Navbar";
    import Footer from "./components/Footer";
    import Logostyle from "./components/Logostyle";
    import Hero from "./components/Hero";
    import Services from "./components/Services";
    import Booking from "./components/Booking";
    import AboutPage from "./pages/AboutPage";
    import BookingPage from "./pages/BookingPage";

    function Home() {
    const location = useLocation();

    // Scroll to a section if we arrived via a hash link (e.g. /#services)
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
        <>
        <section className="Hero-section">
            <Hero />
        </section>

        <Logostyle />

        <section id="services">
            <Services />
        </section>

        <section id="home-booking">
            <Booking />
        </section>
        </>
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