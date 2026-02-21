import { useState } from "react";
import { colleges } from "../../data/colleges";
import CollegeCard from "../../components/superadmin/CollegeCard";
import Sidebar from "../../components/layout/Sidebar";
import AddEditCollegeModal from "../../components/superadmin/AddEditCollegeModal";

export default function Colleges() {
    const [open, setOpen] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);

  const openAdd = () => {
    setSelectedCollege(null);
    setOpen(true);
  };

  const openEdit = (college) => {
    setSelectedCollege(college);
    setOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Colleges</h1>

          
          <button
            onClick={openAdd}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg text-sm"
          >
            + Add New College
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {colleges.map((college) => (
           <CollegeCard
              key={college.id}
              college={college}
              onEdit={() => openEdit(college)}
            />
          ))}
        </div>
      </div>
       {open && (
        <AddEditCollegeModal
          college={selectedCollege}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}