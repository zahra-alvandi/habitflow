import UserMenu from "./UserMenu";

export default function Navbar({
  onToggleSidebar,
  onOpenForm,
  theme,
  onToggleTheme,
  user,
  onLogout,
  onOpenSettings, 
}) {
  return (
    <header className="sticky top-0 z-40 w-full h-16 flex items-center justify-between px-4 md:px-6 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/60 dark:border-slate-800 transition-colors">
      {/* Mobile menu */}
      <button
        onClick={onToggleSidebar}
        className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Open sidebar"
        type="button"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
          <path
            d="M4 6h16M4 12h16M4 18h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl blur-md opacity-60" />
          <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-extrabold text-slate-800 dark:text-slate-100 text-sm md:text-lg tracking-tight">
            HabitFlow
          </span>
          <span className="hidden md:block text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Study · Workout Planner
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          aria-label="Toggle theme"
          type="button"
        >
          {theme === "dark" ? (
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-yellow-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-slate-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {user && (
          <UserMenu
            user={user}
            onLogout={onLogout}
            onOpenSettings={onOpenSettings}
          />
        )}

        {/* Mobile Add */}
        <button
          onClick={onOpenForm}
          className="md:hidden inline-flex items-center justify-center gap-1 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 px-3.5 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.03] active:scale-[0.97] transition-all"
          type="button"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add
        </button>
      </div>
    </header>
  );
}
