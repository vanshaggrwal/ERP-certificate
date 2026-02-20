import { useParams } from "react-router-dom";
import { students } from "../data/students";
import ProgressBar from "../components/ProgressBar";

export default function StudentDetails() {
  const { id } = useParams();
  const student = students.find(s => s.id === id);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">{student.name}</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Certificate</th>
              <th className="p-4">Progress</th>
              <th className="p-4">Exams</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {student.certificates.map((c, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{c.title}</td>
                <td className="p-4"><ProgressBar value={c.progress} /></td>
                <td className="p-4 text-center">
                  {c.examsGiven}/{c.totalExams}
                </td>
                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        c.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}