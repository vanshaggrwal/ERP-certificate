import { useState } from "react";
import { students } from "../../data/students";
import StudentModal from "../../components/StudentModal";

export default function Students() {
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">All Students</h1>
        <p className="text-sm text-gray-500">
          Students across all colleges, courses, and years
        </p>
      </div>

      <div className="bg-white rounded-xl shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Student Master List</h2>
        </div>

        <div className="p-6 overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-3">
            <thead className="text-sm text-gray-500">
              <tr>
                <th className="text-left px-3">Student ID</th>
                <th className="text-left px-3">Name</th>
                <th className="text-left px-3">Project Code</th>
               <th className="text-left px-3">Email Id</th>
                  <th className="text-left px-3">Admission Year</th>
               <th className="text-left px-3">Current Sem</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => setSelectedStudent(s)}
                  className="bg-gray-50 hover:bg-gray-100 cursor-pointer transition"
                >
                  <td className="px-3 py-3 font-medium">{s.id}</td>
                  <td className="px-3">{s.name}</td>
                  <td className="px-3 text-blue-600">{s.projectId}</td>
                  <td className="px-3">{s.email}</td>
                   <td className="px-3">{s.admissionYear}</td>
                  <td className="px-3">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                      {s.currentSemester}
                    </span>
                  </td>

                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      <StudentModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
}