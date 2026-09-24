import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("study");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      id: crypto.randomUUID(),
      title: title.trim(),
      type,
      date,
      time,
      completed: false,
    });

    setTitle("");
    setType("study");
    setDate(new Date().toISOString().slice(0, 10));
    setTime("");
  };

  const inputClass =
    "w-full px-4 py-3 bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 transition-all [color-scheme:light] dark:[color-scheme:dark]";

  const labelClass =
    "text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h1 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
          Add New Task
        </h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          Plan it, then own it ✨
        </p>
      </div>

      <div className="space-y-1.5">
        <label className={labelClass}>Title</label>
        <input
          type="text"
          placeholder="e.g. Read chapter 5"
          className={inputClass}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className={labelClass}>Date</label>
          <input
            type="date"
            className={inputClass}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label className={labelClass}>
            Time{" "}
            <span className="text-slate-300 dark:text-slate-600 normal-case">
              (optional)
            </span>
          </label>
          <input
            type="time"
            className={inputClass}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className={labelClass}>Type</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setType("study")}
            className={`flex items-center justify-center gap-2 py-3 rounded-2xl border-2 font-semibold text-sm transition-all ${
              type === "study"
                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 shadow-sm shadow-indigo-500/20"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 "
            }`}
          >
            <span className="text-lg">📚</span> Study
          </button>
          <button
            type="button"
            onClick={() => setType("workout")}
            className={`flex items-center justify-center gap-2 py-3 rounded-2xl border-2 font-semibold text-sm transition-all ${
              type === "workout"
                ? "border-orange-500 bg-orange-50 dark:bg-orange-500/15 text-orange-700 dark:text-orange-300 shadow-sm shadow-orange-500/20"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
            }`}
          >
            <span className="text-lg">💪</span> Workout
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="group w-full relative overflow-hidden rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 py-3.5 font-bold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:cursor-pointer active:scale-[0.98] transition-all"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Task
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </button>
    </form>
  );
}
