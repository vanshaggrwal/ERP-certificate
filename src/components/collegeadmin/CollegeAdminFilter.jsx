export default function CollegeAdminFilters() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="font-semibold mb-4">Academic Structure Filters</h2>

      <div className="grid grid-cols-6 gap-4">
        {[
          "Course/Program",
          "Academic Year",
          "Department",
          "Subject",
          "Batch",
          "Date Range",
        ].map((label) => (
          <div key={label}>
            <label className="text-sm text-gray-500">{label}</label>
            <select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm">
              <option>All</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}