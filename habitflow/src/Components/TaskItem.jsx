import { IconTrash } from "../Icons/Index";

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div
      className={`group flex items-center justify-between p-5 mb-3 rounded-2xl border transition-all duration-300 
      ${task.completed ? "bg-gray-50 border-gray-100 opacity-60" : "bg-white border-blue-50 shadow-sm hover:shadow-md hover:border-blue-200"}`}
    >
      <div className="flex items-center gap-4">
        {/* Custom Checkbox */}
        <div
          onClick={() => onToggle(task.id)}
          className={`w-6 h-6 rounded-lg border-2 cursor-pointer flex items-center justify-center transition-all
            ${task.completed ? "bg-blue-500 border-blue-500" : "border-gray-300 group-hover:border-blue-400"}`}
        >
          {task.completed && (
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>

        <div>
          <h3
            className={`font-semibold text-lg ${task.completed ? "line-through text-gray-400" : "text-gray-700"}`}
          >
            {task.title}
          </h3>
          <span
            className={`text-xs px-2 py-1 rounded-md font-bold uppercase tracking-wider 
            ${task.type === "study" ? "bg-purple-50 text-purple-500" : "bg-orange-50 text-orange-500"}`}
          >
            {task.type === "study" ? "📚 Study" : "💪 Workout"}
          </span>
        </div>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
      >
        <IconTrash />
      </button>
    </div>
  );
}
