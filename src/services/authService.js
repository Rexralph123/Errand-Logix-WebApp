import { supabase } from "../lib/supabase";

/**
 * Create a new account. Supabase sends the email OTP automatically
 * (make sure "Confirm email" is ON and the confirm-signup template
 * uses {{ .Token }} so it's a 6-digit code, not a magic link —
 * Supabase Dashboard > Authentication > Email Templates > Confirm signup).
 */
export async function registerUser({ fullName, email, password, whatsappNumber }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        whatsapp_number: whatsappNumber, // must be E.164, e.g. +2348012345678
      },
    },
  });
  if (error) throw error;
  return data;
}

export async function loginUser({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/** Verify the 6-digit code Supabase emailed the user after signup */
export async function verifyEmailOtp({ email, code }) {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: code,
    type: "signup",
  });
  if (error) throw error;
  return data;
}

/** Resend the email OTP (e.g. user says they didn't get it) */
export async function resendEmailOtp(email) {
  const { error } = await supabase.auth.resend({ type: "signup", email });
  if (error) throw error;
}

/** Fetch the current user's profile + verification flags */
export async function getMyProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  if (error) throw error;

  return { ...data, email: user.email, emailVerified: !!user.email_confirmed_at };
}

export async function requestPasswordReset(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
}

export async function updatePassword(newPassword) {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
}
