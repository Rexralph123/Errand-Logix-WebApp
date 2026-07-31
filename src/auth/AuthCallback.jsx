import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

/**
 * Landing page for the Supabase magic-link redirect (emailRedirectTo).
 * supabase-js reads the token out of the URL on load (detectSessionInUrl:
 * true) and fires SIGNED_IN once the session is set — we just wait for
 * that and then move on to the dashboard.
 */
export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    let finished = false;

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (finished) return;
      if (session) {
        finished = true;
        navigate("/dashboard", { replace: true });
      }
    });

    // Fallback in case the session was already set before this component
    // mounted (or the SIGNED_IN event fired before we subscribed).
    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (finished) return;
      if (sessionError) {
        setError(sessionError.message);
        return;
      }
      if (data?.session) {
        finished = true;
        navigate("/dashboard", { replace: true });
      }
    });

    const timeout = setTimeout(() => {
      if (!finished) {
        setError("That link looks expired or invalid. Try requesting a new one.");
      }
    }, 8000);

    return () => {
      finished = true;
      clearTimeout(timeout);
      listener?.subscription?.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h1 className="auth-title">Confirming your account…</h1>
        {error ? (
          <div className="auth-error">{error}</div>
        ) : (
          <p className="auth-subtitle">Hang on a second while we sign you in.</p>
        )}
      </div>
    </div>
  );
}
