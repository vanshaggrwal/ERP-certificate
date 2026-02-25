import SuperAdminLayout from "../../components/layout/SuperAdminLayout";
import AdminProfilePanel from "../../components/common/AdminProfilePanel";

export default function SuperAdminProfile() {
  return (
    <SuperAdminLayout>
      <section className="mb-5 rounded-3xl bg-[#0B2A4A] p-5 text-white shadow-sm">
        <h1 className="text-2xl font-semibold">My Profile</h1>
        <p className="mt-1 text-sm text-white/90">Manage your admin profile and security settings.</p>
      </section>

      <AdminProfilePanel roleLabel="Super Admin" />
    </SuperAdminLayout>
  );
}
