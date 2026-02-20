import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function StudentSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`bg-[#0B2A4A] text-white h-full transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="p-4 flex items-center justify-between border-b border-blue-900">
        {!collapsed && (
          <h1 className="font-bold text-lg">Gryphon Academy</h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white"
        >
          ☰
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-6 flex flex-col gap-2 px-2">
        <NavLink
          to="/student/dashboard"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg hover:bg-blue-800 ${
              isActive ? "bg-blue-800" : ""
            }`
          }
        >
          🎓 {!collapsed && "Dashboard"}
        </NavLink>

        <NavLink
          to="/student/profile"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg hover:bg-blue-800 ${
              isActive ? "bg-blue-800" : ""
            }`
          }
        >
          👤 {!collapsed && "Profile"}
        </NavLink>

        <button className="px-4 py-2 rounded-lg hover:bg-red-600 text-left mt-auto">
          🚪 {!collapsed && "Sign Out"}
        </button>
      </nav>
    </div>
  );
}