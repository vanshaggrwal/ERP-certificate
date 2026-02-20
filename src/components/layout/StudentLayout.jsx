import { useState } from "react";
import StudentSidebar from "../layout/StudentSidebar";
import StudentNavbar from "../layout/StudentNavbar";
import { Outlet } from "react-router-dom";

export default function StudentLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <StudentSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className="flex-1 bg-gray-100">
        <StudentNavbar />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}