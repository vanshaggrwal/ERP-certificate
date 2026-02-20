import { useState } from "react";
import { useParams } from "react-router-dom";
import { students } from "../../data/students";
import StudentModal from "../../components/StudentModal";

export default function ProjectStudents() {
  const { projectId } = useParams();
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = students.filter(
    (s) => s.projectId === projectId
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Students – {projectId}
      </h1>

      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full border-separate border-spacing-y-3">
          <thead className="text-gray-500 text-sm">
            <tr>
              <th className="text-left px-3">Roll No</th>
              <th className="text-left px-3">Name</th>
              <th className="text-left px-3">Email Id</th>
              <th className="text-left px-3">Current Sem</th>
              <th className="text-left px-3">Admission Year</th>
            
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((s) => (
              <tr
                key={s.id}
                onClick={() => setSelectedStudent(s)}
                className="bg-gray-50 hover:bg-gray-100 cursor-pointer"
              >
                <td className="px-3 py-3 font-medium">{s.id}</td>
                <td className="px-3">{s.name}</td>
                <td className="px-3">{s.email}</td>
                <td className="px-3">{s.currentSemester}</td>
                 <td className="px-3">{s.admissionYear}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <StudentModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
}