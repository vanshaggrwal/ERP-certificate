import { useAuth } from "../../context/AuthContext";

export default function CollegeAdminNavbar() {
  const { user, profile } = useAuth();
  const adminName =
    profile?.name || user?.displayName || user?.email?.split("@")[0] || "Admin";

  return (
    <header className="h-16 bg-white border-b flex items-center px-8">
      <p className="text-gray-500">
        Welcome back, <span className="font-medium">{adminName}</span>.
      </p>
    </header>
  );
}
