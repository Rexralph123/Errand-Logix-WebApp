    import { Link } from "react-router-dom";

    const NAV_LINKS = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About us" },
    { path: "/bookings", label: "Bookings" },
    ];

    function Navbar() {
    return (
        <header className="navbar" id="top">
        <div className="nav-left">
            <div className="logo-container">
            <img src="/Errand Logix LTD Logo .png" alt="Errand Logix Logo" />
            <h1 className="Logo-name">
                Errand <span>Logix</span>
            </h1>
            </div>
        </div>

        <ul className="nav-menu">
            {NAV_LINKS.map((link) => (
            <li key={link.path}>
                <Link to={link.path}>{link.label}</Link>
            </li>
            ))}
        </ul>

        <div className="nav-right">
            <button className="login-btn">Sign In</button>
            <Link to="/bookings" className="signup-btn">
            Book Now
            </Link>
        </div>
        </header>
    );
    }

    export default Navbar;