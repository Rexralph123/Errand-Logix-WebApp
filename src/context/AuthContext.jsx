
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { getMyProfile, logoutUser } from "../services/authApi";

const AuthContext = createContext(undefined);

// ==========================
// DEVELOPMENT MODE
// ==========================
const DEV_MODE = true; // Change to false when you're ready to use Supabase

const DEV_USER = {
  id: "dev-user-1",
  email: "rex@example.com",
};

const DEV_PROFILE = {
  full_name: "Rex Michael",
  email: "rex@example.com",
  whatsapp_number: "08012345678",
  address: "12 Ago Palace Way",
  area: "Ago Palace Way",
  landmark: "Opposite First Bank",
  emailVerified: true,
  profileComplete: true,
};

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    if (DEV_MODE) {
      setProfile(DEV_PROFILE);
      return DEV_PROFILE;
    }

    try {
      const p = await getMyProfile();
      setProfile(p);
      return p;
    } catch {
      setProfile(null);
      return null;
    }
  }, []);

  useEffect(() => {
    // ==========================
    // DEVELOPMENT MODE
    // ==========================
    if (DEV_MODE) {
      setSession({
        user: DEV_USER,
      });

      setProfile(DEV_PROFILE);
      setLoading(false);
      return;
    }

    let mounted = true;

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!mounted) return;

      setSession(session);

      if (session) {
        await refreshProfile();
      }

      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);

        if (session) {
          await refreshProfile();
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [refreshProfile]);

  const signOut = useCallback(async () => {
    if (DEV_MODE) {
      console.log("Development Mode: Sign Out");
      return;
    }

    await logoutUser();
  }, []);

  const value = {
    session,
    user: DEV_MODE ? DEV_USER : session?.user ?? null,
    profile,
    loading,
    isFullyVerified: !!profile?.emailVerified,
    refreshProfile,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return ctx;
}