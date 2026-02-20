import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function CollegeAdminSidebar() {
  const navigate = useNavigate();

  const links = [
    { name: "Dashboard", path: "/college-admin", end: true },
    { name: "Students", path: "/college-admin/students" },
    { name: "Certificates", path: "/college-admin/certificates" },
    { name: "Exams", path: "/college-admin/exams" },
    { name: "Help", path: "/college-admin/help" },
  ];

  const handleSignOut = () => {
    // later: clear auth / firebase logout
    navigate("/login");
  };

  return (
    <aside className="w-64 fixed h-screen bg-[#062a4d] text-white flex flex-col">
      
      {/* LOGO */}
      <div className="h-20 flex items-center justify-center border-b border-white/10">
        <img
          src={logo}
          alt="ERP Logo"
          className="h-10 object-contain"
        />
      </div>

      {/* NAV LINKS */}
      <nav className="px-4 py-6 space-y-2 flex-1">
        {links.map((l) => (
          <NavLink
            key={l.path}
            to={l.path}
            end={l.end}
            className={({ isActive }) =>
              [
                "block px-4 py-3 rounded-lg transition",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-white/10",
              ].join(" ")
            }
          >
            {l.name}
          </NavLink>
        ))}
      </nav>

      {/* SIGN OUT */}
      <div className="px-4 pb-6">
        <button
          onClick={handleSignOut}
          className="w-full px-4 py-3 rounded-lg text-left text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}