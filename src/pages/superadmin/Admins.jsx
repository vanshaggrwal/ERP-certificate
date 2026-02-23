import Sidebar from "../../components/layout/Sidebar";
import AdminCard from "../../components/superadmin/AdminCard";
import { admins } from "../../data/admins";

export default function Admins() {
  const handleEdit = (admin) => {
    alert("Edit admin: " + admin.name);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Admins Management</h1>
            <p className="text-gray-500 text-sm">
              Manage your feedback system
            </p>
          </div>

          <div className="flex gap-3">
            <button className="bg-[#0B2A4A] text-white px-4 py-2 rounded-lg">
              + Add Admin
            </button>
            <button className="border px-4 py-2 rounded-lg">
              Refresh
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {admins.map((admin) => (
            <AdminCard
              key={admin.id}
              admin={admin}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}