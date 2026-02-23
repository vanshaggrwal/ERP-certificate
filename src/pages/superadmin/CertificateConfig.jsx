import { useState, useMemo } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { Pencil } from "lucide-react";
import { certifications } from "../../data/certifications";

export default function CertificateConfig() {
  const [filters, setFilters] = useState({
    platform: "All",
    level: "All",
    domain: "All",
  });

  // 🔹 Unique dropdown options
  const platforms = ["All", ...new Set(certifications.map(c => c.platform))];
  const levels = ["All", ...new Set(certifications.map(c => c.level))];
  const domains = ["All", ...new Set(certifications.map(c => c.domain))];

  // 🔹 Filter logic
  const filteredCertifications = useMemo(() => {
    return certifications.filter((c) => {
      return (
        (filters.platform === "All" || c.platform === filters.platform) &&
        (filters.level === "All" || c.level === filters.level) &&
        (filters.domain === "All" || c.domain === filters.domain)
      );
    });
  }, [filters]);

  const resetFilters = () =>
    setFilters({ platform: "All", level: "All", domain: "All" });

  return (
    <div className="flex min-h-screen bg-gray-200">
      <Sidebar />

      <div className="flex-1 p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">
            Certifications Configuration
          </h1>

          <button className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg text-sm">
            + Add New Certification
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gray-300 rounded-2xl p-6 flex items-end gap-6">
          {/* Platform */}
          <div className="flex-1">
            <label className="text-sm font-medium">
              Platform / Organisation
            </label>
            <select
              value={filters.platform}
              onChange={(e) =>
                setFilters({ ...filters, platform: e.target.value })
              }
              className="w-full mt-1 h-9 rounded bg-white px-3"
            >
              {platforms.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Level */}
          <div className="flex-1">
            <label className="text-sm font-medium">Level</label>
            <select
              value={filters.level}
              onChange={(e) =>
                setFilters({ ...filters, level: e.target.value })
              }
              className="w-full mt-1 h-9 rounded bg-white px-3"
            >
              {levels.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>

          {/* Domain */}
          <div className="flex-1">
            <label className="text-sm font-medium">Domain</label>
            <select
              value={filters.domain}
              onChange={(e) =>
                setFilters({ ...filters, domain: e.target.value })
              }
              className="w-full mt-1 h-9 rounded bg-white px-3"
            >
              {domains.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>

          <button
            onClick={resetFilters}
            className="bg-[#0B2A4A] text-white px-5 py-2 rounded-lg"
          >
            Reset
          </button>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-5 text-sm font-semibold px-6">
          <span>Domain</span>
          <span>Certificate Name</span>
          <span>Platform / Organisation</span>
          <span>Exam Code</span>
          <span className="text-right">Level</span>
        </div>

        {/* Table Body */}
        <div className="bg-gray-300 rounded-2xl p-6 space-y-4">
          {filteredCertifications.length === 0 && (
            <p className="text-center text-gray-600">
              No certifications found
            </p>
          )}

          {filteredCertifications.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-xl px-6 py-4 flex items-center justify-between"
            >
              <div className="grid grid-cols-5 w-full text-sm">
                <span>{c.domain}</span>
                <span>{c.name}</span>
                <span>{c.platform}</span>
                <span>{c.examCode}</span>
                <span className="text-right">{c.level}</span>
              </div>

              <button className="ml-4 text-gray-600 hover:text-black">
                <Pencil size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}