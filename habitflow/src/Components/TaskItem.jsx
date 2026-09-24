import { IconTrash } from "../Icons/Index";
import { ICON_MAP } from "../data/icons";

export default function TaskItem({ task, categories, onToggle, onDelete }) {
  const category = categories?.find((c) => c.id === task.type);
  const Icon = category ? ICON_MAP[category.icon] : null;
  const color = category?.color || "#6366F1";

  return (
    <div
      onClick={() => onToggle(task.id)}
      className={`group relative flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 w-full max-w-lg mx-auto overflow-hidden cursor-pointer
      ${
        task.completed
          ? "bg-slate-50/70 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 opacity-70"
          : "bg-white dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-black/30 hover:-translate-y-0.5"
      }`}
    >
      {/* Left accent bar — رنگ بر اساس دسته */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 transition-all"
        style={{
          background: task.completed
            ? "rgb(203 213 225)" // slate-300
            : `linear-gradient(to bottom, ${color}, ${color}dd)`,
        }}
      />

      <div className="flex items-center gap-3.5 min-w-0 pl-1">
        {/* Toggle */}
        <button
          onClick={(event) => {
            event.stopPropagation();
            onToggle(task.id);
          }}
          className={`relative w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
            task.completed
              ? "border-transparent shadow-md"
              : "border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500"
          }`}
          style={
            task.completed
              ? { backgroundColor: color, boxShadow: `0 4px 10px ${color}40` }
              : {}
          }
          aria-label="Toggle task"
          type="button"
        >
          {task.completed && (
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="min-w-0">
          <h3
            className={`font-semibold truncate transition-all ${
              task.completed
                ? "line-through text-slate-400 dark:text-slate-500"
                : "text-slate-800 dark:text-slate-100"
            }`}
          >
            {task.title}
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
              style={{ color }}
            >
              {Icon && <Icon size={10} />}
              {category?.name || task.type}
            </span>
            {task.date && (
              <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                · {task.date}
                {task.time && ` @ ${task.time}`}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Delete */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}
        className="p-2 text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl shrink-0 transition-all opacity-40 group-hover:opacity-100"
        aria-label="Delete task"
        type="button"
      >
        <IconTrash />
      </button>
    </div>
  );
}