import { useState } from "react";
import StudentSidebar from "./StudentSidebar";
import StudentNavbar from "./StudentNavbar";
import { Outlet, useLocation } from "react-router-dom";

export default function StudentLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const hideNavbar = location.pathname === "/student/profile";

  return (
    <div className="relative flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <StudentSidebar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* MAIN CONTENT */}
      <div className="flex h-full min-w-0 w-full flex-1 flex-col">
        {!hideNavbar && <StudentNavbar onMenuClick={() => setMobileMenuOpen(true)} />}

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
