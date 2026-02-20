export default function StudentModal({ student, onClose }) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-3xl p-8 z-10 overflow-y-auto max-h-[90vh]">
        
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-2xl font-semibold mb-6">
          Student Details
        </h2>

        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Detail label="Roll No" value={student.id} />
          <Detail label="Name" value={student.name} />
          <Detail label="Gender" value={student.gender} />
          <Detail label="Date of Birth" value={student.dob} />
        </Section>

        {/* ACADEMIC INFO */}
        <Section title="Academic Information">
          <Detail label="Project Code" value={student.projectId} />
          <Detail label="Admission Year" value={student.admissionYear} />
          <Detail label="Current Semester" value={student.currentSemester} />
          <Detail
            label="10th Percentage"
            value={`${student.tenthPercentage}%`}
          />
          <Detail
            label="12th Percentage"
            value={`${student.twelfthPercentage}%`}
          />
        </Section>

        {/* CERTIFICATION INFO */}
        <div className="mb-8">
  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
    Certification Progress
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <Detail label="Certificate" value={student.certificate} />
    <Detail label="Progress" value={student.progress} />
    <Detail label="Exams" value={student.exams} />
  </div>
</div>

        {/* CONTACT INFO */}
        <Section title="Contact Information">
          <Detail label="Email" value={student.email} />
          <Detail label="Phone" value={student.phone} />
        </Section>
      </div>
    </div>
  );
}

/* ---------- REUSABLE UI ---------- */

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 font-medium text-gray-900">
        {value}
      </p>
    </div>
  );
}