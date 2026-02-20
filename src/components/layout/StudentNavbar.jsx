export default function StudentNavbar() {
  return (
    <header className="bg-white px-6 py-4 border-b flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Welcome back, Student Name
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gray-200" />
        <span className="text-sm text-gray-700">
          College Name
        </span>
      </div>
    </header>
  );
}