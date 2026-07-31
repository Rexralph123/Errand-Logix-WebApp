// Thin fetch wrapper for the auth endpoints. Swap API_BASE via VITE_API_URL
// if the backend lives on a different origin.
const API_BASE = import.meta.env.VITE_API_URL || "/api/auth";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  let data = {};
  try {
    data = await res.json();
  } catch {
    // no JSON body — fine for empty 204-style responses
  }

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }

  return data;
}

export const authApi = {
  login: (payload) =>
    request("/login", { method: "POST", body: JSON.stringify(payload) }),

  register: (payload) =>
    request("/register", { method: "POST", body: JSON.stringify(payload) }),

  forgotPassword: (email) =>
    request("/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  resetPassword: (payload) =>
    request("/reset-password", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  verifyEmail: (token) =>
    request(`/verify-email?token=${encodeURIComponent(token)}`, {
      method: "POST",
    }),

  resendVerification: (email) =>
    request("/resend-verification", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  completeProfile: (payload) =>
    request("/complete-profile", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};