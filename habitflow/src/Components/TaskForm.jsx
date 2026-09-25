import { useState } from "react";
import { Plus } from "lucide-react";
import { ICON_MAP } from "../data/icons";

export default function TaskForm({ onAdd, categories, onOpenCategoryModal }) {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      id: crypto.randomUUID(),
      title: title.trim(),
      type: categoryId,
      date,
      time,
      completed: false,
    });

    setTitle("");
    setCategoryId(categories[0]?.id || "");
    setDate(new Date().toISOString().slice(0, 10));
    setTime("");
  };

  const inputClass =
    "w-full px-4 py-3 bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-800 transition-all [color-scheme:light] dark:[color-scheme:dark]";

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

      {/* Title */}
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

      {/* Date / Time */}
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

      {/* Category */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className={labelClass}>Category</label>
          <button
            type="button"
            onClick={onOpenCategoryModal}
            className="flex items-center gap-1 text-[11px] font-bold text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
          >
            <Plus size={12} />
            New
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || ICON_MAP.target;
            const isSelected = categoryId === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryId(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border-2 font-semibold text-sm transition-all ${
                  isSelected
                    ? "border-transparent text-white shadow-md"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
                }`}
                style={
                  isSelected
                    ? {
                        backgroundColor: cat.color,
                        boxShadow: `0 4px 12px ${cat.color}40`,
                      }
                    : {}
                }
              >
                <Icon size={16} />
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="group w-full relative overflow-hidden rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 py-3.5 font-bold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:cursor-pointer active:scale-[0.98] transition-all"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <Plus size={18} />
          Add Task
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </button>
    </form>
  );
}
