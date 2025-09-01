import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import TransparencyReports from './pages/transparency-reports';
import AdminDashboard from './pages/admin-dashboard';
import MemberManagementSuite from './pages/member-management-suite';
import SecretariatDashboard from './pages/secretariat-dashboard';
import OrganizationProfile from './pages/organization-profile';
import Homepage from './pages/homepage';
import Login from './pages/auth/Login';
import RequireAuth from './pages/auth/RequireAuth';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<Homepage />} />
          <Route path="/transparency-reports" element={<TransparencyReports />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/member-management-suite" element={<MemberManagementSuite />} />
          <Route
            path="/secretariat-dashboard"
            element={
              <RequireAuth>
                <SecretariatDashboard />
              </RequireAuth>
            } />
          <Route path="/organization-profile" element={<OrganizationProfile />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
