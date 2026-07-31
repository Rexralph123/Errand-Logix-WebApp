import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { scrollToHashOrTop } from "../utils/helpers";

import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import AgentRoute from "./AgentRoute";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// --- Public marketing pages ---
const HomePage = lazy(() => import("../pages/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const BookingPage = lazy(() => import("../pages/BookingPage"));
const JobsPage = lazy(() => import("../pages/JobsPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const PricingPage = lazy(() => import("../pages/PricingPage"));

// --- Auth pages ---
const Login = lazy(() => import("../auth/Login"));
const Register = lazy(() => import("../auth/Register"));
const ForgotPassword = lazy(() => import("../auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../auth/ResetPassword"));
const VerifyEmail = lazy(() => import("../auth/VerifyEmail"));
const AuthCallback = lazy(() => import("../auth/AuthCallback"));

// --- Customer dashboard ---
const CustomerDashboard = lazy(() => import("../dashboard/customer/Dashboard"));
const BookErrand = lazy(() => import("../dashboard/customer/BookErrand"));
const MyErrands = lazy(() => import("../dashboard/customer/MyErrands"));
const CustomerPayments = lazy(() => import("../dashboard/customer/Payments"));
const Notifications = lazy(() => import("../dashboard/customer/Notifications"));
const CustomerProfile = lazy(() => import("../dashboard/customer/Profile"));
const CustomerSettings = lazy(() => import("../dashboard/customer/Settings"));

// --- Admin dashboard ---
const AdminDashboard = lazy(() => import("../dashboard/admin/Dashboard"));
const AdminBookings = lazy(() => import("../dashboard/admin/Bookings"));
const AdminCustomers = lazy(() => import("../dashboard/admin/Customers"));
const AdminAgents = lazy(() => import("../dashboard/admin/Agents"));
const AdminPayments = lazy(() => import("../dashboard/admin/Payments"));
const AdminAnalytics = lazy(() => import("../dashboard/admin/Analytics"));
const AdminSettings = lazy(() => import("../dashboard/admin/Settings"));

// --- Agent dashboard ---
const AgentDashboard = lazy(() => import("../dashboard/agent/Dashboard"));
const AssignedJobs = lazy(() => import("../dashboard/agent/AssignedJobs"));
const Earnings = lazy(() => import("../dashboard/agent/Earnings"));
const AgentProfile = lazy(() => import("../dashboard/agent/Profile"));

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

const pageTransition = { duration: 0.28, ease: "easeInOut" };

function RouteLoader() {
  return (
    <div className="route-loader">
      <div className="route-loader-spinner" />
    </div>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      className="page-transition-wrapper"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    scrollToHashOrTop(location.hash);
  }, [location]);

  return (
    <AuthProvider>
      <Suspense fallback={<RouteLoader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* --- Public marketing pages --- */}
            <Route
              path="/"
              element={
                <MainLayout>
                  <PageWrapper>
                    <HomePage />
                  </PageWrapper>
                </MainLayout>
              }
            />
            <Route
              path="/about"
              element={
                <MainLayout>
                  <PageWrapper>
                    <AboutPage />
                  </PageWrapper>
                </MainLayout>
              }
            />
            <Route
              path="/bookings"
              element={
                <MainLayout>
                  <PageWrapper>
                    <BookingPage />
                  </PageWrapper>
                </MainLayout>
              }
            />
            <Route
              path="/jobs"
              element={
                <MainLayout>
                  <PageWrapper>
                    <JobsPage />
                  </PageWrapper>
                </MainLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <MainLayout>
                  <PageWrapper>
                    <ContactPage />
                  </PageWrapper>
                </MainLayout>
              }
            />
            <Route
              path="/pricing"
              element={
                <MainLayout>
                  <PageWrapper>
                    <PricingPage />
                  </PageWrapper>
                </MainLayout>
              }
            />

            {/* --- Auth pages --- */}
            <Route
              path="/login"
              element={
                <AuthLayout>
                  <PageWrapper>
                    <Login />
                  </PageWrapper>
                </AuthLayout>
              }
            />
            <Route
              path="/register"
              element={
                <AuthLayout>
                  <PageWrapper>
                    <Register />
                  </PageWrapper>
                </AuthLayout>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <AuthLayout>
                  <PageWrapper>
                    <ForgotPassword />
                  </PageWrapper>
                </AuthLayout>
              }
            />
            <Route
              path="/reset-password"
              element={
                <AuthLayout>
                  <PageWrapper>
                    <ResetPassword />
                  </PageWrapper>
                </AuthLayout>
              }
            />
            <Route
              path="/verify-email"
              element={
                <AuthLayout>
                  <PageWrapper>
                    <VerifyEmail />
                  </PageWrapper>
                </AuthLayout>
              }
            />
            <Route
              path="/auth/callback"
              element={
                <AuthLayout>
                  <PageWrapper>
                    <AuthCallback />
                  </PageWrapper>
                </AuthLayout>
              }
            />

            {/* --- Customer dashboard (logged-in, email-verified) --- */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <PageWrapper>
                      <CustomerDashboard />
                    </PageWrapper>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/book"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <PageWrapper>
                      <BookErrand />
                    </PageWrapper>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/errands"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <PageWrapper>
                      <MyErrands />
                    </PageWrapper>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/payments"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <PageWrapper>
                      <CustomerPayments />
                    </PageWrapper>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/notifications"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <PageWrapper>
                      <Notifications />
                    </PageWrapper>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/profile"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <PageWrapper>
                      <CustomerProfile />
                    </PageWrapper>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <PageWrapper>
                      <CustomerSettings />
                    </PageWrapper>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* --- Admin dashboard (role: admin) --- */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <DashboardLayout>
                    <PageWrapper>
                      <AdminDashboard />
                    </PageWrapper>
                  </DashboardLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/bookings"
              element={
                <AdminRoute>
                  <DashboardLayout>
                    <PageWrapper>
                      <AdminBookings />
                    </PageWrapper>
                  </DashboardLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/customers"
              element={
                <AdminRoute>
                  <DashboardLayout>
                    <PageWrapper>
                      <AdminCustomers />
                    </PageWrapper>
                  </DashboardLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/agents"
              element={
                <AdminRoute>
                  <DashboardLayout>
                    <PageWrapper>
                      <AdminAgents />
                    </PageWrapper>
                  </DashboardLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/payments"
              element={
                <AdminRoute>
                  <DashboardLayout>
                    <PageWrapper>
                      <AdminPayments />
                    </PageWrapper>
                  </DashboardLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <AdminRoute>
                  <DashboardLayout>
                    <PageWrapper>
                      <AdminAnalytics />
                    </PageWrapper>
                  </DashboardLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <AdminRoute>
                  <DashboardLayout>
                    <PageWrapper>
                      <AdminSettings />
                    </PageWrapper>
                  </DashboardLayout>
                </AdminRoute>
              }
            />

            {/* --- Agent dashboard (role: agent) --- */}
            <Route
              path="/agent"
              element={
                <AgentRoute>
                  <DashboardLayout>
                    <PageWrapper>
                      <AgentDashboard />
                    </PageWrapper>
                  </DashboardLayout>
                </AgentRoute>
              }
            />
            <Route
              path="/agent/jobs"
              element={
                <AgentRoute>
                  <DashboardLayout>
                    <PageWrapper>
                      <AssignedJobs />
                    </PageWrapper>
                  </DashboardLayout>
                </AgentRoute>
              }
            />
            <Route
              path="/agent/earnings"
              element={
                <AgentRoute>
                  <DashboardLayout>
                    <PageWrapper>
                      <Earnings />
                    </PageWrapper>
                  </DashboardLayout>
                </AgentRoute>
              }
            />
            <Route
              path="/agent/profile"
              element={
                <AgentRoute>
                  <DashboardLayout>
                    <PageWrapper>
                      <AgentProfile />
                    </PageWrapper>
                  </DashboardLayout>
                </AgentRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </AuthProvider>
  );
}

export default AppRoutes;