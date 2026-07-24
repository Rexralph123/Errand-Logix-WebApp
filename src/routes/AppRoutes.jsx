    import { Suspense, lazy, useEffect } from "react";
    import { Routes, Route, useLocation } from "react-router-dom";
    import { AnimatePresence, motion } from "framer-motion";
    import { scrollToHashOrTop } from "../utils/helpers";

    const Home = lazy(() => import("../pages/Home"));
    const About = lazy(() => import("../pages/About"));
    const Bookings = lazy(() => import("../pages/Bookings"));

    const pageVariants = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
    };

    const pageTransition = { duration: 0.28, ease: "easeInOut" };

    function RouteLoader() {
    return (
        <div className="route-loader">
        <div className="route-loader-spinner" />
        </div>
    );
    }

    function PageWrapper({ children }) {
    return (
        <motion.div
        className="page-transition-wrapper"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
        >
        {children}
        </motion.div>
    );
    }

    function AppRoutes() {
    const location = useLocation();

    useEffect(() => {
        scrollToHashOrTop(location.hash);
    }, [location]);

    return (
        <Suspense fallback={<RouteLoader />}>
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/bookings" element={<PageWrapper><Bookings /></PageWrapper>} />
            </Routes>
        </AnimatePresence>
        </Suspense>
    );
    }

    export default AppRoutes;