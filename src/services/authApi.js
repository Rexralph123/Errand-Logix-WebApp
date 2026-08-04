// src/services/authApi.js
import { supabase } from "../lib/supabase";

export async function registerUser({ fullName, email, password, whatsappNumber }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, whatsapp_number: whatsappNumber },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
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

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${window.location.origin}/auth/callback` },
  });
  if (error) throw error;
}

export async function resendConfirmationEmail(email) {
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
  });
  if (error) throw error;
}

export async function getMyProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  if (error) throw error;

  return { ...data, email: user.email, emailVerified: !!user.email_confirmed_at };
}

export async function updateProfile({ fullName, whatsappNumber }) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");

  const { data, error } = await supabase
    .from("profiles")
    .update({ full_name: fullName, whatsapp_number: whatsappNumber })
    .eq("id", user.id)
    .select()
    .single();
  if (error) throw error;
  return data;
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