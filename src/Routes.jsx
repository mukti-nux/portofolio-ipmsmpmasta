import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";

import TransparencyReports from "./pages/transparency-reports";
import AdminDashboard from "./pages/admin-dashboard";
import MemberManagementSuite from "./pages/member-management-suite";
import SecretariatDashboard from "./pages/secretariat-dashboard";
import OrganizationProfile from "./pages/organization-profile";
import Homepage from "./pages/homepage";

import RequireAuth from "./pages/auth/RequireAuth";
import Login from "./../src/pages/auth/Login"; // ← walaupun file `Login.jsx` L besar, path tetap /auth/login

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Public routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/transparency-reports" element={<TransparencyReports />} />

          {/* Protected routes */}
          <Route
            path="/admin-dashboard"
            element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/member-management-suite"
            element={
              <RequireAuth>
                <MemberManagementSuite />
              </RequireAuth>
            }
          />
          <Route
            path="/secretariat-dashboard"
            element={
              <RequireAuth>
                <SecretariatDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/organization-profile"
            element={
                <OrganizationProfile />
            }/>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
