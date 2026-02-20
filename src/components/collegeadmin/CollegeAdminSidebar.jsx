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
      <div className="p-6 font-bold text-lg">🎓 College Admin</div>

      <nav className="px-4 space-y-2">
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
                  : "bg-transparent text-gray-300 hover:bg-white/10",
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