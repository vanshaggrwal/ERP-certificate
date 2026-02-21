import { useState, useEffect } from "react";

export default function AddEditCollegeModal({ college, onClose }) {
  const isEdit = Boolean(college);

  const [form, setForm] = useState({
    name: "",
    code: "",
    logoUrl: "",
    adminName: "",
    adminEmail: "",
    adminPassword: "",
  });

  useEffect(() => {
    if (college) {
      setForm({
        name: college.name || "",
        code: college.code || "",
        logoUrl: college.logo || "",
        adminName: "",
        adminEmail: "",
        adminPassword: "",
      });
    }
  }, [college]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[700px] max-h-[90vh] rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">
            {isEdit ? "Edit College" : "Add New College"}
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-6 overflow-y-auto max-h-[70vh]">
          <div>
            <label className="text-sm font-medium">College Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">College Code</label>
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Logo URL</label>
            <input
              name="logoUrl"
              value={form.logoUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {!isEdit && (
            <>
              <div className="border-t pt-6">
                <p className="text-sm font-medium mb-4">
                  Create a new college admin
                </p>

                <input
                  name="adminName"
                  placeholder="Admin Name"
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 mb-3"
                />
                <input
                  name="adminEmail"
                  placeholder="Email"
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 mb-3"
                />
                <input
                  name="adminPassword"
                  placeholder="Password"
                  type="password"
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button onClick={onClose} className="border px-4 py-2 rounded-lg">
            Cancel
          </button>
          <button className="bg-[#0B2A4A] text-white px-5 py-2 rounded-lg">
            {isEdit ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}