import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/" },
  { name: "Students", path: "/students" },
  { name: "Certificates", path: "/certificates" },
  { name: "Exams", path: "/exams" },
  { name: "Help", path: "/help" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-[#0b2a4a] to-[#071c33] text-white">
      <div className="p-6 text-xl font-bold">🎓 College Admin</div>

      <nav className="px-4 space-y-2">
        {links.map((l) => (
          <NavLink
            key={l.path}
            to={l.path}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-white/10 text-gray-300"
              }`
            }
          >
            {l.name}
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-6 px-6 text-gray-300">
        Sign Out
      </div>
    </aside>
  );
}