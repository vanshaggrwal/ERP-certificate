import CollegeActionsMenu from "./CollegeActionsMenu";

export default function CollegeCard({ college, onEdit }) {
  return (
    <div className="relative bg-gray-200 rounded-2xl shadow p-5">
      {/* Actions (3 dots) */}
      <div className="absolute top-3 right-3 z-20">
        <CollegeActionsMenu onEdit={onEdit} />
      </div>

      {/* Logo */}
      <div className="bg-gray-600 text-white rounded-lg py-4 text-center text-lg mb-4">
        College Logo
      </div>

      {/* Info */}
      <p className="text-lg font-medium">{college.name}</p>
      <p className="text-sm text-gray-700 mt-1">
        College Code: <span className="font-medium">{college.code}</span>
      </p>
    </div>
  );
}