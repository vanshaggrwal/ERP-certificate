export default function Filters() {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-wrap gap-4 items-end">
      {["Project", "College", "Course", "Year", "Batch"].map((label) => (
        <div key={label}>
          <p className="text-sm mb-1">{label}</p>
          <select className="border rounded px-3 py-2">
            <option>All {label}s</option>
          </select>
        </div>
      ))}

      <button className="ml-auto bg-blue-900 text-white px-6 py-2 rounded">
        Reset
      </button>
    </div>
  );
}