import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/superadmin/Dashboard";

export default function SuperAdminRoutes() {
  return (
    <Routes>
      <Route path="/superadmin/dashboard" element={<Dashboard />} />
    </Routes>
  );
}