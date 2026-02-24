import { useMemo, useState } from "react";

const initialTickets = [
  {
    id: "TKT-001",
    title: "Certificate mapping issue for IT batch",
    category: "Certificate",
    priority: "Medium",
    status: "Open",
    createdAt: "less than a minute ago",
  },
];

const categoryOptions = [
  "General Inquiry",
  "Certificate",
  "Exam",
  "Student Data",
  "Project Code",
];

const priorityOptions = ["Low", "Medium", "High", "Critical"];

export default function Help() {
  const [activeTab, setActiveTab] = useState("create");
  const [tickets, setTickets] = useState(initialTickets);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "General Inquiry",
    priority: "Medium",
  });

  const titleChars = form.title.length;
  const descriptionChars = form.description.length;

  const myTicketsLabel = useMemo(
    () => `My Tickets (${tickets.length})`,
    [tickets.length],
  );

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      category: "General Inquiry",
      priority: "Medium",
    });
  };

  const createTicket = (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setMessage("Please fill title and detailed description.");
      return;
    }

    const nextTicket = {
      id: `TKT-${String(tickets.length + 1).padStart(3, "0")}`,
      title: form.title.trim(),
      category: form.category,
      priority: form.priority,
      status: "Open",
      createdAt: "just now",
    };

    setTickets((prev) => [nextTicket, ...prev]);
    setMessage("Ticket created successfully");
    resetForm();
    setActiveTab("tickets");
  };

  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-gray-900">
          Help &amp; Support
        </h1>
        <p className="mt-0.5 text-xs text-gray-600">
          Raise a support ticket or view your existing tickets
        </p>
      </div>

      <div className="grid grid-cols-1 gap-1 rounded-lg bg-gray-100 p-1 md:grid-cols-2">
        <button
          type="button"
          onClick={() => setActiveTab("create")}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
            activeTab === "create"
              ? "bg-white text-gray-900 shadow"
              : "text-gray-500 hover:bg-white/60"
          }`}
        >
          Raise New Ticket
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("tickets")}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
            activeTab === "tickets"
              ? "bg-white text-gray-900 shadow"
              : "text-gray-500 hover:bg-white/60"
          }`}
        >
          {myTicketsLabel}
        </button>
      </div>

      {activeTab === "create" && (
        <section className="overflow-hidden rounded-xl bg-white shadow">
          <div className="bg-[#f3eafb] px-4 py-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Create a Support Ticket
            </h2>
            <p className="mt-0.5 text-xs text-gray-600">
              Describe your issue in detail. Our support team will respond shortly.
            </p>
          </div>

          <form onSubmit={createTicket} className="space-y-3 px-4 py-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-900">
                  Ticket Title <span className="text-red-500">*</span>
                </label>
                <input
                  value={form.title}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, title: event.target.value }))
                  }
                  maxLength={100}
                  placeholder="Brief description of your issue"
                  className="h-9 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#0B2A4A]"
                />
                <p className="mt-1 text-[11px] text-gray-500">{titleChars}/100 characters</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-900">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.category}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, category: event.target.value }))
                    }
                    className="h-9 w-full rounded-md border border-gray-300 px-2 text-xs outline-none focus:border-[#0B2A4A]"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-900">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.priority}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, priority: event.target.value }))
                    }
                    className="h-9 w-full rounded-md border border-gray-300 px-2 text-xs outline-none focus:border-[#0B2A4A]"
                  >
                    {priorityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-900">
                Detailed Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={form.description}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, description: event.target.value }))
                }
                maxLength={1000}
                rows={3}
                placeholder="Provide detailed information about your issue, including steps to reproduce if applicable"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#0B2A4A]"
              />
              <p className="mt-1 text-[11px] text-gray-500">{descriptionChars}/1000 characters</p>
            </div>

            <button
              type="submit"
              className="h-9 w-full rounded-md bg-[#0B2A4A] text-sm font-medium text-white hover:bg-[#13385d]"
            >
              Create Support Ticket
            </button>
          </form>
        </section>
      )}

      {activeTab === "tickets" && (
        <section className="overflow-hidden rounded-xl bg-white shadow">
          <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1.6fr_0.7fr] gap-3 bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-600">
            <p>Title</p>
            <p>Category</p>
            <p>Priority</p>
            <p>Status</p>
            <p>Created</p>
            <p className="text-right">Action</p>
          </div>
          <div className="divide-y">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1.6fr_0.7fr] items-center gap-3 px-4 py-2.5 text-sm"
              >
                <p className="font-medium text-gray-900">{ticket.title}</p>
                <p>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700">
                    {ticket.category}
                  </span>
                </p>
                <p>
                  <span className="rounded-full bg-[#0B2A4A] px-2 py-0.5 text-[11px] font-medium text-white">
                    {ticket.priority}
                  </span>
                </p>
                <p>
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-medium text-white">
                    {ticket.status}
                  </span>
                </p>
                <p className="text-gray-600">{ticket.createdAt}</p>
                <button type="button" className="text-right font-medium text-[#0B2A4A]">
                  View
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {message && (
        <div className="fixed bottom-6 right-6 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-800 shadow-lg">
          {message}
        </div>
      )}
    </div>
  );
}
