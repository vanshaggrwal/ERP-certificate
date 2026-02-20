export default function StudentProfile() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <p><strong>Roll No:</strong> 12345</p>
        <p><strong>Student Name:</strong> abc</p>
        <p><strong>College Name:</strong> ICEM</p>
        <p><strong>Email:</strong> abc@email.com</p>
        <p><strong>Phone:</strong> 1234567890</p>
        <p><strong>Course:</strong> MBA </p>
        <p><strong>Academic Year:</strong> 2026-27</p>
        <p><strong>10th %:</strong> 100%</p>
        <p><strong>12th %:</strong> 100%</p>
        <p><strong>UG %:</strong> 100%</p>
      </div>
    </div>
  );
}