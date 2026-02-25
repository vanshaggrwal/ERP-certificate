import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Award, BookOpenCheck, Clock3, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getStudentForAuthUser } from "../../../services/studentService";
import { certifications } from "../../data/certifications";

export default function StudentDashboard() {
  const { user, profile } = useAuth();
  const [currentStudent, setCurrentStudent] = useState(null);
  const recentCertificates = certifications.slice(0, 3);

  useEffect(() => {
    let mounted = true;
    const loadStudent = async () => {
      try {
        const student = await getStudentForAuthUser({ profile, user });
        if (!mounted) return;
        setCurrentStudent(student || null);
      } catch (error) {
        console.error("Failed to load student record:", error);
      }
    };

    loadStudent();
    return () => {
      mounted = false;
    };
  }, [profile, user]);

  const progressTrend = [
    { month: "Jan", value: 42 },
    { month: "Feb", value: 50 },
    { month: "Mar", value: 58 },
    { month: "Apr", value: 63 },
    { month: "May", value: 71 },
    { month: "Jun", value: 80 },
  ];

  const examBreakdown = [
    { name: "Attempted", value: Number(String(currentStudent?.exams || "0 / 0").split("/")[0] || 0) },
    { name: "Remaining", value: Math.max(0, Number(String(currentStudent?.exams || "0 / 0").split("/")[1] || 0) - Number(String(currentStudent?.exams || "0 / 0").split("/")[0] || 0)) },
  ];
  const officialDetails = currentStudent?.OFFICIAL_DETAILS || {};
  const tenthDetails = currentStudent?.TENTH_DETAILS || {};
  const twelfthDetails = currentStudent?.TWELFTH_DETAILS || {};
  const graduationDetails = currentStudent?.GRADUATION_DETAILS || {};
  const fullName = officialDetails["FULL NAME OF STUDENT"] || currentStudent?.name || "-";
  const rollNo = officialDetails.SN || currentStudent?.id || "-";
  const gender = currentStudent?.gender || officialDetails.GENDER || "-";
  const dob = currentStudent?.dob || officialDetails["BIRTH DATE"] || "-";
  const email = currentStudent?.email || officialDetails["EMAIL ID"] || "-";
  const phone = currentStudent?.phone || officialDetails["MOBILE NO."] || "-";
  const passingYear =
    graduationDetails["GRADUATION PASSING YR"] ||
    currentStudent?.passingYear ||
    currentStudent?.admissionYear ||
    "-";
  const tenthPercentage =
    currentStudent?.tenthPercentage ?? tenthDetails["10th OVERALL MARKS %"] ?? "-";
  const twelfthPercentage =
    currentStudent?.twelfthPercentage ?? twelfthDetails["12th OVERALL MARKS %"] ?? "-";

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-r from-[#0B2A4A] via-[#1D5FA8] to-[#6BC7A7] p-6 text-white shadow-sm">
        <h2 className="text-2xl font-semibold">Welcome back, {fullName === "-" ? "Student" : fullName}</h2>
        <p className="mt-1 text-sm text-white/85">
          Track your certification performance and keep your exam progress on target.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Current Progress" value={currentStudent?.progress || "0%"} icon={<Target size={18} />} />
        <StatCard label="Exams Status" value={currentStudent?.exams || "0 / 0"} icon={<BookOpenCheck size={18} />} />
        <StatCard label="Current Semester" value={currentStudent?.currentSemester || "-"} icon={<Clock3 size={18} />} />
        <StatCard label="Certificates Available" value={certifications.length} icon={<Award size={18} />} />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel title="Progress Trend">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={progressTrend}>
              <defs>
                <linearGradient id="studentProgressGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1D5FA8" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#1D5FA8" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#1D5FA8"
                fill="url(#studentProgressGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Exam Completion">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={examBreakdown}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#0B2A4A" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel title="Recent Certificates">
          <div className="space-y-3">
            {recentCertificates.map((certificate) => (
              <div
                key={certificate.id}
                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
              >
                <p className="text-sm font-semibold text-gray-900">{certificate.name}</p>
                <p className="text-xs text-gray-600">
                  {certificate.platform} • {certificate.examCode} • {certificate.level}
                </p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Profile Snapshot">
          <div className="space-y-2 text-sm text-gray-700">
            <p><span className="font-medium text-gray-900">Student Name:</span> {fullName}</p>
            <p><span className="font-medium text-gray-900">Roll No:</span> {rollNo}</p>
            <p><span className="font-medium text-gray-900">Gender:</span> {gender}</p>
            <p><span className="font-medium text-gray-900">Date of Birth:</span> {dob}</p>
            <p><span className="font-medium text-gray-900">Email:</span> {email}</p>
            <p><span className="font-medium text-gray-900">Phone:</span> {phone}</p>
            <p><span className="font-medium text-gray-900">Passing Year:</span> {passingYear}</p>
            <p><span className="font-medium text-gray-900">Current Semester:</span> {currentStudent?.currentSemester || "-"}</p>
            <p><span className="font-medium text-gray-900">10th Percentage:</span> {tenthPercentage !== "-" ? `${tenthPercentage}%` : "-"}</p>
            <p><span className="font-medium text-gray-900">12th Percentage:</span> {twelfthPercentage !== "-" ? `${twelfthPercentage}%` : "-"}</p>
            <p><span className="font-medium text-gray-900">Current Certificate:</span> {currentStudent?.certificate || "-"}</p>
            <p><span className="font-medium text-gray-900">Progress:</span> {currentStudent?.progress || "0%"}</p>
            <p><span className="font-medium text-gray-900">Exams:</span> {currentStudent?.exams || "0 / 0"}</p>
          </div>
        </Panel>
      </section>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{label}</p>
        <span className="rounded-lg bg-[#0B2A4A]/10 p-2 text-[#0B2A4A]">{icon}</span>
      </div>
      <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
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
