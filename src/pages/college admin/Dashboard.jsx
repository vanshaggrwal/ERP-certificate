import { projects } from "../data/projects";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/projects/${p.id}`)}
            className="bg-white rounded-xl shadow p-6 cursor-pointer hover:shadow-lg transition"
          >
            <p className="text-sm text-gray-500">Project Code</p>
            <h2 className="text-xl font-semibold mt-1">{p.id}</h2>

            <div className="mt-4 text-sm text-gray-600">
              <p>College: {p.college}</p>
              <p>Course: {p.course}</p>
              <p>Year: {p.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}