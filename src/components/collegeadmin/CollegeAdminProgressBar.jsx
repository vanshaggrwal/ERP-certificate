export default function CollegeAdminProgressBar({ value }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div
        className="h-3 bg-green-500 transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
