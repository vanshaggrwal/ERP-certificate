import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* ================= ADMIN ================= */
import CollegeAdminSidebar from "./components/college-admin/CollegeAdminSidebar";
import CollegeAdminNavbar from "./components/college-admin/CollegeAdminNavbar";

import AdminDashboard from "./pages/college-admin/Dashboard";
import Students from "./pages/college-admin/Students";
import ProjectStudents from "./pages/college-admin/ProjectStudents";
import Certificates from "./pages/college-admin/Certificates";
import Exams from "./pages/college-admin/Exams";
import Help from "./pages/college-admin/Help";

/* ================= STUDENT ================= */
import StudentLayout from "./components/layout/StudentLayout";
import StudentDashboard from "./pages/student/Dashboard";
import StudentProfile from "./pages/student/Profile";

/* ================= ADMIN LAYOUT ================= */
function AdminLayout() {
  return (
    <div className="flex">
      <CollegeAdminSidebar />

      <div className="ml-64 flex-1 min-h-screen bg-gray-100">
        <CollegeAdminNavbar />

        <main className="p-8 w-full">
          <Routes>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="projects/:projectId" element={<ProjectStudents />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="exams" element={<Exams />} />
            <Route path="help" element={<Help />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

/* ================= APP ================= */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/student/dashboard" />} />

        {/* ================= STUDENT ================= */}
        <Route path="/student" element={<StudentLayout />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
        </Route>

        {/* ================= ADMIN ================= */}
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </BrowserRouter>
  );
}