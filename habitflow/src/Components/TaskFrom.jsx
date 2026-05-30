import { useState } from "react";

function SelectWithIcon({ iconId, value, onChange, children }) {
  return (
    <div className="relative">
      {/* left icon */}
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
        <svg className="h-5 w-5">
          <use href={`#${iconId}`} />
        </svg>
      </span>

      <select
        value={value}
        onChange={onChange}
        className="w-full appearance-none rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-10 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      >
        {children}
      </select>

      {/* right arrow */}
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </div>
  );
}

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("study");
  const [day, setDay] = useState("Monday");
  const [time, setTime] = useState("");

  const weekDays = [
    { label: "Saturday", value: "Saturday" },
    { label: "Sunday", value: "Sunday" },
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      title: title.trim(),
      type,
      day,
      time,
      completed: false,
    };

    onAdd(newTask);

    setTitle("");
    setType("study");
    setDay("Monday");
    setTime("");
  };

  return (
    <div className="max-w-md mx-auto h-full p-8 bg-blue-50 rounded-xl shadow-xl border border-slate-100 ">
      {/* svg symbols */}
      <svg className="hidden">
        <symbol
          id="book"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
          />
        </symbol>

        <symbol
          id="calendar"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z"
          />
        </symbol>
      </svg>

      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">Add New Task</h1>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Task Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your Task"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Task Type
          </label>
          <SelectWithIcon
            iconId="book"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="study">Study</option>
            <option value="workout">Workout</option>
          </SelectWithIcon>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Day
          </label>
          <SelectWithIcon
            iconId="calendar"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            {weekDays.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </SelectWithIcon>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Time
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
