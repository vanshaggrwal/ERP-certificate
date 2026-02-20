import { NavLink } from "react-router-dom";

export default function CollegeAdminSidebar() {
  const links = [
    { name: "Dashboard", path: "/college-admin", end: true },
    { name: "Students", path: "/college-admin/students" },
    { name: "Certificates", path: "/college-admin/certificates" },
    { name: "Exams", path: "/college-admin/exams" },
    { name: "Help", path: "/college-admin/help" },
  ];

  return (
    <aside className="w-64 fixed h-screen bg-[#062a4d] text-white">
      
      {/* LOGO */}
      <div className="h-20 flex items-center justify-center border-b border-white/10">
        <img
          src="/logo.png"
          alt="ERP Logo"
          className="h-10 object-contain"
        />
      </div>

      <nav className="px-4 py-6 space-y-2">
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
    </aside>
  );
}