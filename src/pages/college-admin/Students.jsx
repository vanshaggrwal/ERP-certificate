import { students } from "../../data/students";

export default function Students() {
  return (
    <div>
      {/* PAGE HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">All Students</h1>
        <p className="text-sm text-gray-500">
          Students across all colleges, courses, and years
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-xl shadow border">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Student Master List</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
            Export
          </button>
        </div>

        {/* TABLE */}
        <div className="p-6 overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-3">
            <thead className="text-sm text-gray-500">
              <tr>
                <th className="text-left px-3">Student ID</th>
                <th className="text-left px-3">Name</th>
                <th className="text-left px-3">Project Code</th>
                <th className="text-left px-3">Certificate</th>
                <th className="text-left px-3">Progress</th>
                <th className="text-left px-3">Exams</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr
                  key={s.id}
                  className="bg-gray-50 hover:bg-gray-100 rounded-lg"
                >
                  <td className="px-3 py-3 font-medium">{s.id}</td>
                  <td className="px-3">{s.name}</td>
                  <td className="px-3 text-blue-600 font-medium">
                    {s.projectId}
                  </td>
                  <td className="px-3">{s.certificate}</td>
                  <td className="px-3">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                      {s.progress}
                    </span>
                  </td>
                  <td className="px-3">{s.exams}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
