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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-800">Add New Task</h1>

      <input
        type="text"
        placeholder="Task Title"
        className="w-full p-3 border rounded-xl"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="date"
          className="w-full p-3 border rounded-xl"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          className="w-full p-3 border rounded-xl"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <select
        className="w-full p-3 border rounded-xl"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="study">Study</option>
        <option value="workout">Workout</option>
      </select>

      <button
        type="submit"
        className="w-full rounded-2xl bg-slate-900 py-3 font-medium text-white hover:bg-slate-800 active:scale-[0.98]"
      >
        Add Task
      </button>
    </form>
  );
}
