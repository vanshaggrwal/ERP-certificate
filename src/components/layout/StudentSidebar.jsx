import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, User } from "lucide-react";
import logo from "../../assets/logo.png";

const links = [
  {
    name: "Dashboard",
    path: "/student/dashboard",
    end: true,
    icon: LayoutDashboard,
  },
  {
    name: "Profile",
    path: "/student/profile",
    icon: User,
  },
];

export default function StudentSidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();

  return (
    <aside
      className={`h-screen bg-[#062a4d] text-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* LOGO + TOGGLE */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-white/10">
        {!collapsed && (
          <img src={logo} alt="ERP Logo" className="h-10 object-contain" />
        )}

        <button
          onClick={() => setCollapsed((v) => !v)}
          className="text-xl p-2 rounded hover:bg-white/10"
        >
          ☰
        </button>
      </div>

      {/* NAV LINKS */}
      <nav className="flex-1 px-2 py-6 space-y-2">
        {links.map(({ path, end, name, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
               ${
                 isActive
                   ? "bg-blue-600 text-white"
                   : "text-gray-300 hover:bg-white/10"
               }`
            }
          >
            <Icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span>{name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* SIGN OUT */}
      <div className="px-2 pb-6">
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg
                     text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
        >
          <span className="text-lg">⎋</span>
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}