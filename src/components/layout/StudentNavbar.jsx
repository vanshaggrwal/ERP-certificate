export default function StudentNavbar() {
  return (
    <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
      {/* Left: Welcome */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Welcome back, Student Name
        </p>
      </div>

      {/* Right: College Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full" />
        <span className="hidden md:block font-medium text-gray-700">
          College Name
        </span>
      </div>
    </div>
  );
}