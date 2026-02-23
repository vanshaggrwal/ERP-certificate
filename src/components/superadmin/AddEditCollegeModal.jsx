import { useState, useEffect } from "react";
import { addCollege } from "../../../services/collegeService";
import { createCollegeAdmin } from "../../../services/userService";

export default function AddEditCollegeModal({
  college,
  onClose,
  onCollageAdded,
}) {
  const isEdit = Boolean(college);

  const [form, setForm] = useState({
    name: "",
    code: "",
    logoUrl: "",
    adminName: "",
    adminEmail: "",
    adminPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (college) {
      setForm({
        name: college.college_name || "",
        code: college.college_code || "",
        logoUrl: college.college_logo || "",
        adminName: "",
        adminEmail: "",
        adminPassword: "",
      });
    }
  }, [college]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Validate form fields
  const validateForm = () => {
    if (isEdit) {
      // For edit mode, only college fields are required
      if (!form.name.trim()) {
        setError("College name is required");
        return false;
      }
      if (!form.code.trim()) {
        setError("College code is required");
        return false;
      }
      if (!form.logoUrl.trim()) {
        setError("Logo URL is required");
        return false;
      }
    } else {
      // For add mode, all fields including admin are required
      if (!form.name.trim()) {
        setError("College name is required");
        return false;
      }
      if (!form.code.trim()) {
        setError("College code is required");
        return false;
      }
      if (!form.logoUrl.trim()) {
        setError("Logo URL is required");
        return false;
      }
      if (!form.adminName.trim()) {
        setError("Admin name is required");
        return false;
      }
      if (!form.adminEmail.trim()) {
        setError("Admin email is required");
        return false;
      }
      if (!form.adminPassword.trim()) {
        setError("Admin password is required");
        return false;
      }
    }
    setError(null);
    return true;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setLoading(true);
    try {
      // 1. Create college in Firestore
      await addCollege({
        college_name: form.name,
        college_code: form.code,
        college_logo: form.logoUrl,
      });

      // 2. Create college admin if in add mode
      if (!isEdit) {
        await createCollegeAdmin(
          {
            name: form.adminName,
            email: form.adminEmail,
            password: form.adminPassword,
          },
          form.code,
        );
      }

      // Call the callback to refresh the colleges list
      if (onCollageAdded) {
        onCollageAdded();
      }

      setForm({
        name: "",
        code: "",
        logoUrl: "",
        adminName: "",
        adminEmail: "",
        adminPassword: "",
      });

      alert("College and admin created successfully!");
      onClose();
    } catch (err) {
      console.error("Error creating college or admin:", err);

      // Handle specific Firebase Auth errors
      if (err.code === "auth/email-already-in-use") {
        setError(
          "This email is already registered. Please use a different email.",
        );
      } else if (err.code === "auth/weak-password") {
        setError(
          "Password is too weak. Please use a stronger password (at least 6 characters).",
        );
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address. Please check and try again.");
      } else {
        setError(err.message || "Failed to create college or admin");
      }
    } finally {
      setLoading(false);
    }
  };

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
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
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
          <button
            onClick={onClose}
            disabled={loading}
            className="border px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={loading}
            className="bg-[#0B2A4A] text-white px-5 py-2 rounded-lg disabled:opacity-50"
          >
            {loading
              ? isEdit
                ? "Updating..."
                : "Creating..."
              : isEdit
                ? "Update"
                : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
