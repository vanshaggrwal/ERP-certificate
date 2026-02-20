import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/CollegeAdminSidebar";
import Navbar from "./components/";
import ProjectStudents from "./pages/college admin/ProjectStudents";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/college admin/Students";
import Certificates from "./pages/college admin/Certificates";
import Exams from "./pages/college admin/Exams";
import Help from "./pages/college admin/Help";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Layout */}
        <div className="ml-64 flex-1 min-h-screen bg-gray-100">
          <Navbar />

          {/* CONTENT MUST BE FULL WIDTH */}
          <main className="p-8 w-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route
                path="/projects/:projectId"
                element={<ProjectStudents />}
              />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/exams" element={<Exams />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
