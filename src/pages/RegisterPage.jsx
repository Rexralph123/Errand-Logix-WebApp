    import { useState } from "react";
    import { Link, useNavigate } from "react-router-dom";
    import { User, Mail, Phone, ArrowRight } from "lucide-react";
    import AuthLayout from "../components/auth/AuthLayout";
    import FormField from "../components/auth/FormField";
    import PasswordField from "../components/auth/PasswordField";
    import AuthAlert from "../components/auth/AuthAlert";
    import { authApi } from "../services/authApi";

    function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!form.fullName || !form.email || !form.phone || !form.password) {
        setError("Fill in every field to create your account.");
        return;
        }
        if (form.password.length < 8) {
        setError("Your password should be at least 8 characters long.");
        return;
        }
        if (form.password !== form.confirmPassword) {
        setError("Your passwords don't match. Please re-enter them.");
        return;
        }
        if (!agreed) {
        setError("Please accept the Terms of Service and Privacy Policy to continue.");
        return;
        }

        setLoading(true);
        try {
        await authApi.register({
            fullName: form.fullName,
            email: form.email,
            phone: form.phone,
            password: form.password,
        });
        navigate(`/verify-email?email=${encodeURIComponent(form.email)}`);
        } catch (err) {
        setError(err.message || "We couldn't create your account. Please try again.");
        } finally {
        setLoading(false);
        }
    }

    return (
        <AuthLayout
        eyebrow="Join Errand Logix"
        headline={
            <>
            Get Your Time Back.
            <br />
            Starting Today.
            </>
        }
        subtext="Create an account to book verified runners for groceries, deliveries, bill payments, and every errand in between."
        >
        <div className="auth-form-head">
            <h1>Create your account</h1>
            <p>It only takes a minute to get started.</p>
        </div>

        <AuthAlert type="error">{error}</AuthAlert>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <FormField
            id="fullName"
            label="Full Name"
            icon={User}
            placeholder="Jane Adeyemi"
            value={form.fullName}
            onChange={handleChange}
            autoComplete="name"
            />

            <FormField
            id="email"
            label="Email Address"
            type="email"
            icon={Mail}
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            />

            <FormField
            id="phone"
            label="Phone Number"
            type="tel"
            icon={Phone}
            placeholder="080X XXX XXXX"
            value={form.phone}
            onChange={handleChange}
            autoComplete="tel"
            />

            <PasswordField
            id="password"
            label="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            hint="Use at least 8 characters."
            />

            <PasswordField
            id="confirmPassword"
            label="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            />

            <label className="auth-checkbox-row" style={{ marginBottom: 22 }}>
            <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
            />
            I agree to the <Link to="/terms" className="auth-link">Terms of Service</Link>{" "}
            and <Link to="/privacy" className="auth-link">Privacy Policy</Link>.
            </label>

            <button className="btn btn-solid-black auth-submit" type="submit" disabled={loading}>
            {loading ? "Creating account..." : (
                <>
                Create Account
                <ArrowRight size={18} />
                </>
            )}
            </button>
        </form>

        <p className="auth-footer-text">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
            Sign in
            </Link>
        </p>
        </AuthLayout>
    );
    }

    export default Register;