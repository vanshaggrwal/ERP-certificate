import CourseCard from "../../components/student/CourseCard";

const dummyCourses = [
  { id: 1, title: "AWS Certification", status: "Enrolled" },
  { id: 2, title: "Azure Fundamentals", status: "Exam Appeared" },
  { id: 3, title: "Google Cloud", status: "Passed" },
  { id: 4, title: "DevOps", status: "Failed" },
];

export default function StudentDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {dummyCourses.map((course) => (
        <CourseCard
          key={course.id}
          title={course.title}
          status={course.status}
        />
      ))}
    </div>
  );
}