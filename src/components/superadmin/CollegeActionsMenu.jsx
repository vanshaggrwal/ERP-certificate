import { useState, useRef, useEffect } from "react";

export default function CollegeActionsMenu({ onEdit }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="h-8 w-8 flex items-center justify-center
                   rounded-full bg-white shadow
                   text-gray-700 hover:bg-gray-100"
      >
        ⋮
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border z-20">
        
           <button
          onClick={onEdit}
          className="flex w-full px-4 py-2 text-sm hover:bg-gray-100"
        >
          ✏️ Edit College
        </button>
          <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
            🗑 Delete College
          </button>
        </div>
      )}
    </div>
  );
}