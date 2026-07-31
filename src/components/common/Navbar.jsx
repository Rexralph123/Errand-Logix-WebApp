import { useState, useRef, useEffect } from "react";
    import { Link, useNavigate } from "react-router-dom";
    import { Menu, X, ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
    import logo from "../../assets/images/Errand-logix-logo.png"; // adjust relative path as needed
    import { useAuth } from "../../hooks/useAuth";

    const NAV_LINKS = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About us" },
    { path: "/bookings", label: "Bookings" },
    { path: "/jobs", label: "Jobs" },
    { path: "/LoginPage", label: "Login"},
    { path: "/RegisterPage", label: "Signup"},
    ];

    // role -> where "Dashboard" should take them
    const DASHBOARD_PATH = {
    customer: "/dashboard",
    admin: "/admin",
    agent: "/agent",
    };

    function getInitials(name) {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    const initials = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0][0];
    return initials.toUpperCase();
    }

    function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);
    const accountRef = useRef(null);
    const navigate = useNavigate();

    const { user, profile, loading, signOut } = useAuth();
    const isLoggedIn = !!user;
    const dashboardPath = DASHBOARD_PATH[profile?.role] || "/dashboard";
    const displayName = profile?.full_name?.trim().split(/\s+/)[0] || "Account";

    const closeMenu = () => setIsOpen(false);
    const closeAccount = () => setAccountOpen(false);

    // Close the account dropdown on outside click / Escape
    useEffect(() => {
        if (!accountOpen) return;

        function handleClick(e) {
        if (accountRef.current && !accountRef.current.contains(e.target)) {
            setAccountOpen(false);
        }
        }
        function handleKey(e) {
        if (e.key === "Escape") setAccountOpen(false);
        }

        document.addEventListener("mousedown", handleClick);
        document.addEventListener("keydown", handleKey);
        return () => {
        document.removeEventListener("mousedown", handleClick);
        document.removeEventListener("keydown", handleKey);
        };
    }, [accountOpen]);

    const handleSignOut = async () => {
        closeAccount();
        closeMenu();
        await signOut();
        navigate("/");
    };

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
            {loading ? (
                // avoid flashing "Sign In" then swapping to the account button
                <div className="nav-auth-placeholder" aria-hidden="true" />
            ) : isLoggedIn ? (
                <>
                {/* Desktop: dropdown */}
                <div className="nav-account" ref={accountRef}>
                    <button
                    className="nav-account-btn"
                    onClick={() => setAccountOpen((prev) => !prev)}
                    aria-expanded={accountOpen}
                    aria-haspopup="true"
                    >
                    <span className="nav-avatar">{getInitials(profile?.full_name)}</span>
                    <span className="nav-account-name">{displayName}</span>
                    <ChevronDown size={16} className={accountOpen ? "caret open" : "caret"} />
                    </button>

                    {accountOpen && (
                    <div className="nav-account-dropdown">
                        <Link to={dashboardPath} onClick={() => { closeAccount(); closeMenu(); }}>
                        <LayoutDashboard size={16} />
                        Dashboard
                        </Link>
                        <button onClick={handleSignOut}>
                        <LogOut size={16} />
                        Sign Out
                        </button>
                    </div>
                    )}
                </div>

                {/* Mobile: inline block, no dropdown */}
                <div className="nav-account-mobile">
                    <div className="nav-account-mobile-id">
                    <span className="nav-avatar">{getInitials(profile?.full_name)}</span>
                    <span className="nav-account-name">{displayName}</span>
                    </div>
                    <Link to={dashboardPath} className="btn-solid-white btn-block" onClick={closeMenu}>
                    Dashboard
                    </Link>
                    <button className="btn-outline-white btn-block" onClick={handleSignOut}>
                    Sign Out
                    </button>
                </div>
                </>
            ) : (
                <>
                <Link to="/login" className="nav-signin-btn" onClick={closeMenu}>
                    Sign In
                </Link>
                <Link to="/register" className="signup-btn" onClick={closeMenu}>
                    Sign up
                </Link>
                </>
            )}
            </div>
        </div>
        </header>
    );
    }

    export default Navbar;