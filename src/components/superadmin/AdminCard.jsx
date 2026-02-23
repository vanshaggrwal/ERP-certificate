import AdminActionsMenu from "./AdminActionsMenu";
import { Shield } from "lucide-react";

export default function AdminCard({ admin, onEdit }) {
  return (
    <div className="relative bg-white rounded-2xl p-5 shadow-sm border">
      {/* Actions */}
      <div className="absolute top-4 right-4">
        <AdminActionsMenu
          onEdit={() => onEdit(admin)}
          onDelete={() => alert("Delete " + admin.name)}
        />
      </div>

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
          <Shield className="text-blue-600" />
        </div>

        {/* Info */}
        <div>
          <p className="font-semibold">{admin.name}</p>
          <p className="text-sm text-gray-500">{admin.email}</p>

          <div className="mt-2 text-sm text-gray-600 flex items-center gap-1">
            <span>🏫</span>
            <span>{admin.college}</span>
          </div>
        </div>
      </div>
    </div>
  );
}