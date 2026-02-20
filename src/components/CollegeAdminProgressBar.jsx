export default function ProgressBar({ value }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div
        className="h-3 bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}