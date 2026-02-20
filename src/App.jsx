import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";

import Sidebar from "./components/collegeadmin/CollegeAdminSidebar";
import Navbar from "./components/collegeadmin/CollegeAdminNavbar";

import Dashboard from "./pages/college-admin/Dashboard";
import Students from "./pages/college-admin/Students";
import ProjectStudents from "./pages/college-admin/ProjectStudents";
import Certificates from "./pages/college-admin/Certificates";
import Exams from "./pages/college-admin/Exams";
import Help from "./pages/college-admin/Help";

/* ---------- COLLEGE ADMIN LAYOUT ---------- */
function CollegeAdminLayout() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 flex-1 min-h-screen bg-gray-100">
        <Navbar />

        <main className="p-8 w-full">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route
  path="projects/:projectId"
  element={<ProjectStudents />}
/>
            <Route path="certificates" element={<Certificates />} />
            <Route path="exams" element={<Exams />} />
            <Route path="help" element={<Help />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

/* ---------- APP ---------- */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Landing />} />

        {/* COLLEGE ADMIN */}
        <Route path="/college-admin/*" element={<CollegeAdminLayout />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}