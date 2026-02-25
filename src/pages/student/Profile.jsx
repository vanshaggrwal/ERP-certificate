import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getStudentForAuthUser } from "../../../services/studentService";

export default function StudentProfile() {
  const { user, profile } = useAuth();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const s = await getStudentForAuthUser({ profile, user });
        if (!mounted) return;
        setStudent(s || null);
      } catch (error) {
        console.error("Failed to load student profile:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [profile, user]);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (!student) return <p className="text-gray-500">Profile not found.</p>;

  const officialDetails = student?.OFFICIAL_DETAILS || {};
  const tenthDetails = student?.TENTH_DETAILS || {};
  const twelfthDetails = student?.TWELFTH_DETAILS || {};
  const graduationDetails = student?.GRADUATION_DETAILS || {};

  const fullName = officialDetails["FULL NAME OF STUDENT"] || student?.name || "-";
  const rollNo = officialDetails.SN || student?.id || "-";
  const gender = officialDetails.GENDER || student?.gender || "-";
  const dob = officialDetails["BIRTH DATE"] || student?.dob || "-";
  const collegeCode =
    String(student?.collegeCode || "").trim() ||
    String(student?.projectId || "").split(/[-/]/)[0]?.trim() ||
    "-";
  const courseYear = student?.projectId || student?.courseYear || "-";

  const email = officialDetails["EMAIL ID"] || student?.email || "-";
  const phone = officialDetails["MOBILE NO."] || student?.phone || "-";
  const passingYear =
    graduationDetails["GRADUATION PASSING YR"] ||
    student?.passingYear ||
    student?.admissionYear ||
    "-";
  const currentSemester = student?.currentSemester || "-";
  const tenthPercentage = student?.tenthPercentage ?? tenthDetails["10th OVERALL MARKS %"] ?? "-";
  const twelfthPercentage = student?.twelfthPercentage ?? twelfthDetails["12th OVERALL MARKS %"] ?? "-";

  const currentCertificate = student?.certificate || "-";
  const progress = student?.progress || "0%";
  const exams = student?.exams || "0 / 0";

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <section className="rounded-3xl bg-gradient-to-r from-[#0B2A4A] via-[#1D5FA8] to-[#6BC7A7] p-6 text-white shadow-sm">
        <h1 className="text-2xl font-semibold">Student Profile</h1>
        <p className="mt-1 text-sm text-white/90">Manage your academic and certification details.</p>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Basic Information</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <ProfileItem label="Student Name" value={fullName} />
          <ProfileItem label="Roll No" value={rollNo} />
          <ProfileItem label="Gender" value={gender} />
          <ProfileItem label="Date of Birth" value={dob} />
          <ProfileItem label="College" value={collegeCode} />
          <ProfileItem label="Course / Year" value={courseYear} />
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Contact & Academic Details</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <ProfileItem label="Email" value={email} />
          <ProfileItem label="Phone" value={phone} />
          <ProfileItem label="Passing Year" value={passingYear} />
          <ProfileItem label="Current Semester" value={currentSemester} />
          <ProfileItem label="10th Percentage" value={tenthPercentage === "-" ? "-" : `${tenthPercentage}%`} />
          <ProfileItem label="12th Percentage" value={twelfthPercentage === "-" ? "-" : `${twelfthPercentage}%`} />
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Certification Progress</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <ProfileItem label="Current Certificate" value={currentCertificate} />
          <ProfileItem label="Progress" value={progress} />
          <ProfileItem label="Exams" value={exams} />
        </div>
      </section>
    </div>
  );
}

/* ---------- REUSABLE ---------- */

function ProfileItem({ label, value }) {
  return (
    <div className="rounded-xl bg-gray-100 p-5">
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-1 text-base font-semibold text-gray-900">{value || "-"}</p>
    </div>
  );
}
 
