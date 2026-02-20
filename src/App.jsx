import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

/* ================= ADMIN (COLLEGE ADMIN UI) ================= */
import CollegeAdminSidebar from "./components/collegeadmin/CollegeAdminSidebar";
import CollegeAdminNavbar from "./components/collegeadmin/CollegeAdminNavbar";


import StudentDetails from "./pages/college-admin/StudentDetails";

import AdminDashboard from "./pages/college-admin/Dashboard";
import Students from "./pages/college-admin/Students";
import ProjectStudents from "./pages/college-admin/ProjectStudents";
import Certificates from "./pages/college-admin/Certificates";
import Exams from "./pages/college-admin/Exams";
import Help from "./pages/college-admin/Help";

/* ================= PUBLIC ================= */
import Landing from "./pages/Landing";
import Login from "./pages/Login";

/* ================= STUDENT ================= */
import StudentLayout from "./components/layout/StudentLayout";
import StudentDashboard from "./pages/student/Dashboard";
import StudentProfile from "./pages/student/Profile";

/* ================= COLLEGE ADMIN LAYOUT ================= */
function CollegeAdminLayout() {
  return (
    <div className="flex">
      <CollegeAdminSidebar />

      <div className="ml-64 flex-1 min-h-screen bg-gray-100 flex flex-col">
        <CollegeAdminNavbar />

        <main className="p-8 w-full flex-1">
          <Outlet />
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
        {/* DEFAULT → LOGIN */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* OPTIONAL LANDING */}
        <Route path="/home" element={<Landing />} />

        {/* ================= STUDENT ================= */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
        </Route>

        {/* ================= COLLEGE ADMIN ================= */}
        <Route path="/college-admin" element={<CollegeAdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="projects/:projectId" element={<ProjectStudents />} />
         
<Route path="students/:studentId" element={<StudentDetails />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="exams" element={<Exams />} />
          <Route path="help" element={<Help />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
