import { students } from "../../data/students";

export default function StudentProfile() {
  // TEMP: simulate logged-in student
  const loggedInStudentId = "STU012";

  const student = students.find((s) => s.id === loggedInStudentId);

  if (!student) {
    return <p className="text-gray-500">Profile not found.</p>;
  }

  const progressValue = Math.max(
    0,
    Math.min(100, Number(String(student.progress || "0").replace("%", "")) || 0),
  );

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5">
      <section className="rounded-3xl bg-gradient-to-r from-[#0B2A4A] via-[#1D5FA8] to-[#6BC7A7] p-6 text-white shadow-sm">
        <h1 className="text-2xl font-semibold">Student Profile</h1>
        <p className="mt-1 text-sm text-white/90">Manage your academic and certification details.</p>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Basic Information</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ProfileItem label="Student Name" value={student.name} />
          <ProfileItem label="Roll No" value={student.id} />
          <ProfileItem label="Gender" value={student.gender} />
          <ProfileItem label="Date of Birth" value={student.dob} />
          <ProfileItem label="College" value="ICEM" />
          <ProfileItem label="Course / Year" value={student.projectId} />
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Contact & Academic Details</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ProfileItem label="Email" value={student.email} />
          <ProfileItem label="Phone" value={student.phone} />
          <ProfileItem label="Admission Year" value={student.admissionYear} />
          <ProfileItem label="Current Semester" value={student.currentSemester} />
          <ProfileItem label="10th Percentage" value={`${student.tenthPercentage}%`} />
          <ProfileItem label="12th Percentage" value={`${student.twelfthPercentage}%`} />
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Certification Progress</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Current Certificate</p>
            <p className="mt-1 text-base font-semibold text-gray-900">{student.certificate || "-"}</p>
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-xs text-gray-600">
                <span>Completion</span>
                <span>{student.progress || "0%"}</span>
              </div>
              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-[#1D5FA8]"
                  style={{ width: `${progressValue}%` }}
                />
              </div>
            </div>
          </div>
          <ProfileItem label="Progress" value={student.progress || "0%"} />
          <ProfileItem label="Exams" value={student.exams || "0 / 0"} />
        </div>
      </section>
    </div>
  );
}

/* ---------- REUSABLE ---------- */

function ProfileItem({ label, value }) {
  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-1 text-base font-semibold text-gray-900">{value || "-"}</p>
    </div>
  );
}
