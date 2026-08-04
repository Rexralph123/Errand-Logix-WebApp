// src/hooks/useAuth.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { getMyProfile } from "../services/authApi";

const AuthContext = createContext(undefined);

// Dev-only bypass: skips Supabase entirely and hands the app a fake
// logged-in user + profile, so you can jump straight into user pages
// while coding/designing. Only active when BOTH are true:
//   1. import.meta.env.DEV  (never true in a production build)
//   2. VITE_DEV_BYPASS_AUTH=true is set in your local .env
// Add this to your .env (NOT .env.production, and keep it out of git):
//   VITE_DEV_BYPASS_AUTH=true
const DEV_BYPASS_AUTH =
  import.meta.env.DEV && import.meta.env.VITE_DEV_BYPASS_AUTH === "true";

const FAKE_USER = {
  id: "dev-fake-user-id",
  email: "dev@errandlogix.local",
};

const FAKE_PROFILE = {
  id: "dev-fake-user-id",
  email: "dev@errandlogix.local",
  fullName: "Dev Preview",
  emailVerified: true,
  whatsappVerified: true,
  // Add/adjust fields here to match whatever shape getMyProfile()
  // normally returns, so pages relying on profile.* don't break.
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(DEV_BYPASS_AUTH ? FAKE_USER : null);
  const [profile, setProfile] = useState(DEV_BYPASS_AUTH ? FAKE_PROFILE : null);
  const [loading, setLoading] = useState(!DEV_BYPASS_AUTH);

  async function loadProfile() {
    try {
      const data = await getMyProfile();
      setProfile(data);
    } catch {
      setProfile(null);
    }
  }

  useEffect(() => {
    if (DEV_BYPASS_AUTH) {
      if (import.meta.env.DEV) {
        // Loud on purpose so it's impossible to miss in the console.
        console.warn(
          "[dev-bypass] Auth is SKIPPED — using a fake logged-in user. " +
            "Set VITE_DEV_BYPASS_AUTH=false in .env to test real auth."
        );
      }
      return;
    }

    let mounted = true;

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
      if (session?.user) await loadProfile();
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await loadProfile();
      } else {
        setProfile(null);
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    if (DEV_BYPASS_AUTH) {
      // Nothing real to sign out of — just clear local state so you
      // can see the logged-out UI if you need to.
      setUser(null);
      setProfile(null);
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut, refreshProfile: loadProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}