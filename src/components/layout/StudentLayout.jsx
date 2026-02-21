import { useState } from "react";
import StudentSidebar from "../layout/StudentSidebar";
import StudentNavbar from "../layout/StudentNavbar";
import { Outlet } from "react-router-dom";

export default function StudentLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
   <div className="flex min-h-screen bg-gray-100 overflow-x-hidden">
      {/* SIDEBAR */}
      <StudentSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* MAIN CONTENT */}
      <div className="flex flex-col flex-1 min-w-0">
        <StudentNavbar />

        <main className="p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}