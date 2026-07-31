# Auth setup — Errand Logix

## What this gives you
- Email/password signup + login via Supabase Auth
- Email verification: magic link (click to confirm, no code to type)
- Account counts as active once email is verified
- WhatsApp number is collected as a contact field (for delivery updates)
  but is not OTP-verified — no free provider exists for WhatsApp OTP
  (Meta itself charges for authentication-category messages, so every
  vendor built on top of the WhatsApp Cloud API, Twilio included, charges
  for this)
- No government ID step

## 1. Install packages
```
npm install @supabase/supabase-js react-router-dom
```

## 2. Supabase project setup
1. Create a project at supabase.com if you don't have one yet.
2. Run `supabase/migrations/001_profiles_and_verification.sql` in the SQL editor
   (creates `profiles` table + auto-create trigger + RLS policies).
3. Dashboard → Authentication → Providers → Email: make sure
   "Confirm email" is turned ON. The default "Confirm signup" template
   already uses `{{ .ConfirmationURL }}`, which is the magic link — no
   template changes needed.
4. Dashboard → Authentication → URL Configuration: add
   `http://localhost:5173/auth/callback` (and your production domain's
   `/auth/callback`) to **Redirect URLs**, or Supabase will reject the
   redirect after signup.
5. Copy your Project URL and anon key into `.env` (see `.env.example`).

## 3. Drop the files into your project
Copy everything under `src/` into your `errand-logix-webapp/src/` at the
matching paths, and `supabase/` into your project root. Then wire
`AppRoutes` into `App.jsx` (or merge these routes into your existing
`routes/AppRoutes.jsx` alongside your public pages).

## If you want WhatsApp OTP back later
There's no genuinely free option at any real volume — Meta charges per
message for authentication-category conversations even on its own Cloud
API, and every BSP (Twilio, Termii, etc.) sits on top of that and adds
its own fee. If you outgrow email-only verification, budget for it as a
real line item rather than hunting for a free workaround.

## Still TODO (not built here, per your note)
- Dashboard, Admin, and Agent areas
- `AdminRoute.jsx` / `AgentRoute.jsx` (same pattern as `ProtectedRoute.jsx`,
  just also check `profile.role`)
