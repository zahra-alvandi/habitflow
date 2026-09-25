import ProgressBar from "./ProgressBar";
import { ICON_MAP } from "../data/icons";

export default function Sidebar({
  tasks,
  categories,
  activeView,
  onOpenTasks,
  onOpenCalendar,
}) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  const navItems = [
    { id: "tasks", label: "Tasks", icon: "tasks", onClick: onOpenTasks },
    {
      id: "calendar",
      label: "Calendar",
      icon: "calendar",
      onClick: onOpenCalendar,
    },
  ];

  const categoryStats = categories.map((cat) => {
    const catTasks = tasks.filter((t) => t.type === cat.id);
    return {
      ...cat,
      count: catTasks.length,
      completed: catTasks.filter((t) => t.completed).length,
    };
  });

  return (
    <div className="h-full min-h-screen md:min-h-[calc(100vh-64px)] p-5 md:p-6 flex flex-col justify-between gap-6 bg-gradient-to-b from-slate-50 via-indigo-50/40 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 transition-colors overflow-y-auto">
      {/* SVG Symbols */}
      <svg className="hidden">
        <symbol
          id="trophy"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
          />
        </symbol>
        <symbol
          id="tasks"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
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
            d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5"
          />
        </symbol>
      </svg>

      {/* Nav + Category Stats */}
      <div className="space-y-6">
        {/* Nav */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 px-2">
            Menu
          </p>
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={item.onClick}
                    type="button"
                    className={`group relative flex w-full items-center gap-3 py-3 px-4 rounded-2xl transition-all duration-200 ${
                      isActive
                        ? "bg-white dark:bg-slate-800 shadow-md shadow-indigo-500/10 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-100 dark:ring-indigo-500/30"
                        : "text-slate-600 dark:text-slate-400 hover:bg-white/70 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-r-full" />
                    )}
                    <div
                      className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all ${
                        isActive
                          ? "bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/30"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700"
                      }`}
                    >
                      <svg className="w-5 h-5">
                        <use href={`#${item.icon}`} />
                      </svg>
                    </div>
                    <span className="font-semibold text-sm">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Category Stats */}
        {categoryStats.length > 0 && (
          <div>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 px-2">
              Categories
            </p>
            <ul className="flex flex-col gap-2">
              {categoryStats.map((cat) => {
                const Icon = ICON_MAP[cat.icon] || ICON_MAP.target;
                const catPercent =
                  cat.count === 0
                    ? 0
                    : Math.round((cat.completed / cat.count) * 100);

                return (
                  <li
                    key={cat.id}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 hover:bg-white dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${cat.color}20` }}
                    >
                      <Icon size={16} style={{ color: cat.color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">
                          {cat.name}
                        </p>
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 shrink-0">
                          {cat.completed}/{cat.count}
                        </span>
                      </div>
                      <div className="h-1 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${catPercent}%`,
                            backgroundColor: cat.color,
                          }}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Trophy Card */}
      <div className="relative overflow-hidden flex flex-col items-center justify-center rounded-3xl p-5 bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 shadow-xl shadow-indigo-500/30 text-white mb-12">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-6 w-28 h-28 bg-purple-400/20 rounded-full blur-2xl" />

        <div className="relative">
          <svg className="w-12 h-12 text-yellow-300 drop-shadow-lg">
            <use href="#trophy" />
          </svg>
        </div>

        <div className="relative text-center my-2">
          <h3 className="font-extrabold text-base">Keep going!</h3>
          <p className="text-[11px] text-indigo-100/90 mt-0.5">
            Consistency is progress.
          </p>
        </div>

        <div className="relative w-full">
          <ProgressBar percent={percent} />
        </div>
      </div>
    </div>
  );
}
