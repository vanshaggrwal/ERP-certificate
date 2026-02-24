import { useMemo } from "react";
import { projects } from "../../data/projects";
import { students } from "../../data/students";
import { certifications } from "../../data/certifications";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Award, BookOpenCheck, Layers3, Users } from "lucide-react";

export default function AdminDashboard() {
  const COLORS = ["#0B2A4A", "#1D5FA8", "#6BC7A7", "#D29A2D"];

  const parseProgress = (progressValue) => {
    const parsed = Number(String(progressValue || "").replace("%", "").trim());
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const data = useMemo(() => {
    const byCourse = {};
    projects.forEach((p) => {
      byCourse[p.courseCode] = (byCourse[p.courseCode] || 0) + p.totalStudents;
    });

    const barData = Object.keys(byCourse).map((k) => ({
      course: k,
      count: byCourse[k],
    }));

    const pieData = Object.keys(byCourse).map((k) => ({
      name: k,
      value: byCourse[k],
    }));

    const progressBands = [
      { name: "0-40%", value: 0 },
      { name: "41-70%", value: 0 },
      { name: "71-100%", value: 0 },
    ];

    students.forEach((student) => {
      const progress = parseProgress(student.progress);
      if (progress <= 40) progressBands[0].value += 1;
      else if (progress <= 70) progressBands[1].value += 1;
      else progressBands[2].value += 1;
    });

    const avgProgress =
      students.length > 0
        ? Math.round(
            students.reduce((sum, student) => sum + parseProgress(student.progress), 0) /
              students.length,
          )
        : 0;

    const topProjects = [...projects]
      .sort((a, b) => b.totalStudents - a.totalStudents)
      .slice(0, 5);

    return {
      totalEnrollments: students.length,
      completionRate: `${avgProgress}%`,
      certificatesIssued: certifications.length,
      activeProjectCodes: projects.length,
      barData,
      pieData,
      progressBands,
      topProjects,
    };
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-r from-[#0B2A4A] via-[#1D5FA8] to-[#6BC7A7] px-6 py-7 text-white shadow-sm">
        <h1 className="text-2xl font-semibold">College Admin Control Center</h1>
        <p className="mt-1 text-sm text-white/90">
          Monitor enrollments, performance trends, and certification health.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Enrollments" value={data.totalEnrollments} icon={<Users size={18} />} />
        <StatCard title="Avg Completion" value={data.completionRate} icon={<BookOpenCheck size={18} />} />
        <StatCard title="Certificates" value={data.certificatesIssued} icon={<Award size={18} />} />
        <StatCard title="Project Codes" value={data.activeProjectCodes} icon={<Layers3 size={18} />} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel title="Enrollment by Course">
          <ResponsiveContainer width="100%" height={270}>
            <BarChart data={data.barData} barSize={42}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="course" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#1D5FA8" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Student Progress Distribution">
          <ResponsiveContainer width="100%" height={270}>
            <PieChart>
              <Pie data={data.progressBands} dataKey="value" nameKey="name" innerRadius={60} outerRadius={92}>
                {data.progressBands.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel title="Course Share">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={data.pieData} dataKey="value" nameKey="name" outerRadius={92} label>
                {data.pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Recent Project Batches">
          <div className="space-y-3">
            {data.topProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
              >
                <p className="text-sm font-semibold text-gray-900">{project.id}</p>
                <p className="text-xs text-gray-600">{project.course}</p>
                <p className="mt-1 text-xs text-[#0B2A4A]">{project.totalStudents} students</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Live Student Tracking Table">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="py-2">Project Code</th>
              <th>College</th>
              <th>Course</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="py-2">{p.id}</td>
                <td>{p.college}</td>
                <td>{p.course}</td>
                <td>{p.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

/* Helper Components */

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{title}</p>
        <span className="rounded-lg bg-[#0B2A4A]/10 p-2 text-[#0B2A4A]">{icon}</span>
      </div>
      <h2 className="mt-2 text-2xl font-semibold text-gray-900">{value}</h2>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-base font-semibold text-gray-900">{title}</h3>
      {children}
    </div>
  );
}
