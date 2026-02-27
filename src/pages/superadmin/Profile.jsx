import SuperAdminLayout from "../../components/layout/SuperAdminLayout";
import AdminProfilePanel from "../../components/common/AdminProfilePanel";

export default function SuperAdminProfile() {
  return (
    <SuperAdminLayout>
      <section className="superadmin-navbar-card mb-5 rounded-3xl border border-[#D7E2F1] bg-white p-5">
        <h1 className="text-2xl font-semibold text-[#0B2A4A]">My Profile</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your admin profile and security settings.
        </p>
      </section>

      <AdminProfilePanel roleLabel="Super Admin" />
    </SuperAdminLayout>
  );
}
