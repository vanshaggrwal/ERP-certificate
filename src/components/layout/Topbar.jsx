import { useAuth } from "../../context/AuthContext";

export default function Topbar() {
  const { user, profile } = useAuth();
  const adminName =
    profile?.name || user?.displayName || user?.email?.split("@")[0] || "Admin";

  return (
    <div className="bg-white px-6 py-4 border-b">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-sm text-gray-500">
        Welcome {adminName}
      </p>
    </div>
  );
}
