import { useParams } from "react-router-dom";
import { students } from "../../data/students";

export default function ProjectStudents() {
  const { projectId } = useParams();

<<<<<<< HEAD
  const filteredStudents = students.filter((s) => s.projectId === projectId);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Students – {projectId}</h1>

      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full border-separate border-spacing-y-3">
          <thead className="text-gray-500 text-sm">
            <tr>
              <th className="text-left px-3">Student Roll No</th>
              <th className="text-left px-3">Name</th>
              <th className="text-left px-3">Certificate</th>
              <th className="text-left px-3">Progress</th>
              <th className="text-left px-3">Exams</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s.id} className="bg-gray-50">
                <td className="px-3 py-3 font-medium">{s.id}</td>
                <td className="px-3">{s.name}</td>
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

        {filteredStudents.length === 0 && (
          <p className="text-gray-500 mt-4">
            No students found for this project.
          </p>
=======
  const filteredStudents = students.filter(
    (s) => s.projectId?.trim() === projectId?.trim()
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        Students – {projectId}
      </h1>

      <div className="bg-white rounded-xl shadow p-6">
        {filteredStudents.length === 0 ? (
          <p className="text-gray-500">
            No students found for this project.
          </p>
        ) : (
          <table className="w-full border-separate border-spacing-y-3">
            <thead className="text-gray-500 text-sm">
              <tr>
                <th className="text-left px-3">Roll No</th>
                <th className="text-left px-3">Name</th>
                <th className="text-left px-3">Certificate</th>
                <th className="text-left px-3">Progress</th>
                <th className="text-left px-3">Exams</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s.id} className="bg-gray-50">
                  <td className="px-3 py-3 font-medium">{s.id}</td>
                  <td className="px-3">{s.name}</td>
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
>>>>>>> 44cb36bd3a464ffb92c1697e6ef43811919e06f3
        )}
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 44cb36bd3a464ffb92c1697e6ef43811919e06f3
