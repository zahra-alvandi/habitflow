import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("study");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      title: title.trim(),
      type,
      completed: false,
    };

    onAdd(newTask);

    setTitle("");
    setType("study");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-[1fr_180px_140px]">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            عنوان برنامه
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="مثلاً: مرور فصل ۲ شیمی"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            نوع
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="study">مطالعه</option>
            <option value="workout">تمرین</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800"
          >
            افزودن
          </button>
        </div>
      </div>
    </form>
  );
}
