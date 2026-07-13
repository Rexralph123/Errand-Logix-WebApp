    import "./App.css";
    import { Routes, Route } from "react-router-dom";

    import Navbar from "./components/Navbar";
    import Footer from "./components/Footer";
    import Logostyle from "./components/Logostyle";
    import Hero from "./components/Hero";
    import Services from "./components/Services";
    import Booking from "./components/Booking";
    import AboutPage from "./pages/AboutPage";
    import BookingPage from "./pages/BookingPage";

    function Home() {
    return (
        <>
        <section className="Hero-section">
            <Hero />
        </section>

        <Logostyle />
        <Services />
        <Booking />
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