import { IconTrash } from "../Icons/Index";

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div
      className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 w-full max-w-lg mx-auto
      ${
        task.completed
          ? "bg-gray-50 border-gray-100 opacity-60"
          : "bg-white border-blue-100 shadow-sm hover:shadow-md"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => onToggle(task.id)}
          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0
            ${
              task.completed
                ? "bg-blue-500 border-blue-500"
                : "border-gray-300 hover:border-blue-400"
            }`}
          aria-label="Toggle task"
          type="button"
        >
          {task.completed && <div className="w-3 h-3 bg-white rounded-sm" />}
        </button>

        <div className="min-w-0">
          <h3
            className={`font-semibold truncate ${
              task.completed ? "line-through text-gray-400" : "text-gray-700"
            }`}
          >
            {task.title}
          </h3>
          <span
            className={`text-[10px] font-bold uppercase ${
              task.type === "study" ? "text-purple-500" : "text-orange-500"
            }`}
          >
            {task.type}
          </span>
        </div>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="p-2 text-gray-300 hover:text-red-500 shrink-0"
        aria-label="Delete task"
        type="button"
      >
        <IconTrash />
      </button>
    </div>
  );
}
