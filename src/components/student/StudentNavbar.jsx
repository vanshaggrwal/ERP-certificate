import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getCollegeByCode } from "../../../services/collegeService";
import { getStudentForAuthUser } from "../../../services/studentService";

const titleByPath = {
  "/student": "Dashboard",
  "/student/dashboard": "Dashboard",
  "/student/profile": "Profile",
};

export default function StudentNavbar({ onMenuClick }) {
  const location = useLocation();
  const { user, profile } = useAuth();
  const [collegeInfo, setCollegeInfo] = useState({
    code: "",
    name: "",
    logo: "",
  });
  const heading = titleByPath[location.pathname] || "Student Portal";
  const studentName = profile?.name || user?.displayName || user?.email?.split("@")[0] || "Student";

  const [enrolledCollegeCode, setEnrolledCollegeCode] = useState(() => {
    const fromProfile = String(profile?.collegeCode || "").trim().toUpperCase();
    if (fromProfile) return fromProfile;

    const fromProject = String(profile?.projectId || "").split("/")[0]?.trim().toUpperCase();
    if (fromProject) return fromProject;

    return "";
  });

  useEffect(() => {
    let mounted = true;

    const loadCollege = async () => {
      try {
        // If we don't have a college code yet, infer from the logged-in student's full record.
        if (!enrolledCollegeCode) {
          const student = await getStudentForAuthUser({ profile, user });
          if (student && mounted) {
            const fromStudentProject = String(student.projectId || "").split(/[-/]/)[0]?.trim().toUpperCase();
            if (fromStudentProject) {
              setEnrolledCollegeCode(fromStudentProject);
              return; // next effect run will load college info
            }
          }
        }

        if (!enrolledCollegeCode) {
          if (mounted) setCollegeInfo({ code: "", name: "", logo: "" });
          return;
        }

        const college = await getCollegeByCode(enrolledCollegeCode);
        if (!mounted) return;

        setCollegeInfo({
          code: enrolledCollegeCode,
          name: college?.college_name || enrolledCollegeCode,
          logo: college?.college_logo || "",
        });
      } catch (error) {
        console.error(error);
        if (mounted) {
          setCollegeInfo({ code: enrolledCollegeCode || "", name: enrolledCollegeCode || "College", logo: "" });
        }
      }
    };

    loadCollege();
    return () => {
      mounted = false;
    };
  }, [enrolledCollegeCode, profile, user]);

  const collegeInitials = (collegeInfo.code || "CLG").slice(0, 2);

  return (
    <header className="sticky top-0 z-20 bg-white px-4 sm:px-6 py-3 sm:py-4 border-b flex items-center justify-between">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="md:hidden inline-flex items-center justify-center rounded-lg border border-gray-300 p-2 text-gray-700"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>

        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
            {heading}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">Welcome back, {studentName}</p>
        </div>
      </div>

      <div className="hidden sm:flex items-center">
        <div className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5">
          {collegeInfo.logo ? (
            <img
              src={collegeInfo.logo}
              alt={collegeInfo.name || "College"}
              className="h-8 w-8 rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B2A4A] text-xs font-bold text-white">
              {collegeInitials}
            </div>
          )}
          <span className="text-xs font-medium text-gray-700">
            {collegeInfo.name || "College"}
          </span>
        </div>
      </div>
    </header>
  );
}
