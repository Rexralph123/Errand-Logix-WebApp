    import { useState } from "react";
    import { Link } from "react-router-dom";
    import { Menu, X } from "lucide-react";
    import logo from "../../assets/images/Errand-logix-logo.png"; // adjust relative path as needed

    const NAV_LINKS = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About us" },
    { path: "/bookings", label: "Bookings" },
    { path: "/jobs", label: "Jobs" },
    ];

    function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <header className="navbar" id="top">
        <div className="nav-left">
            <div className="logo-container">
            <img src={logo} alt="Errand Logix Logo" />
            <h1 className="Logo-name">
                Errand <span>Logix</span>
            </h1>
            </div>
        </div>

        {/* Mobile menu icon button — toggles the collapsible nav below */}
        <button
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
        >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <div className={`nav-collapse ${isOpen ? "open" : ""}`}>
            <ul className="nav-menu">
            {NAV_LINKS.map((link) => (
                <li key={link.path}>
                <Link to={link.path} onClick={closeMenu}>
                    {link.label}
                </Link>
                </li>
            ))}
            </ul>

            <div className="nav-right">
            <button className="login-btn" onClick={closeMenu}>
                Sign In
            </button>
            <Link to="/bookings" className="signup-btn" onClick={closeMenu}>
                Book Now
            </Link>
            </div>
        </div>
        </header>
    );
    }

    export default Navbar;