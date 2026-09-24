import {
  X,
  User as UserIcon,
  Mail,
  Calendar,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

export default function SettingsModal({
  user,
  theme,
  onToggleTheme,
  onLogout,
  onClose,
}) {
  const joinedDate = new Date(user.joinedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 dark:bg-black/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full sm:max-w-md bg-white dark:bg-slate-800 rounded-t-3xl sm:rounded-3xl p-6 sm:p-7 shadow-2xl animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)] max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all z-10"
          type="button"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight mb-1">
          Settings
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-5">
          Manage your account
        </p>

        {/* Profile card */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-500/10 dark:to-purple-500/10 border border-indigo-100 dark:border-indigo-500/20 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30 shrink-0">
            {user.avatar}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-slate-800 dark:text-slate-100 truncate">
              {user.username}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {user.email}
            </p>
          </div>
        </div>

        {/* Info list */}
        <div className="space-y-1 mb-4">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60">
            <UserIcon className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
            <span className="font-medium truncate">{user.username}</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60">
            <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
            <span className="font-medium truncate">{user.email}</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60">
            <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
            <span className="font-medium">Joined {joinedDate}</span>
          </div>
        </div>

        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors mb-3"
          type="button"
        >
          <span className="flex items-center gap-3">
            {theme === "dark" ? (
              <Moon className="w-4 h-4 text-indigo-400" />
            ) : (
              <Sun className="w-4 h-4 text-yellow-500" />
            )}
            {theme === "dark" ? "Dark Mode" : "Light Mode"}
          </span>
          <div
            className={`relative w-10 h-6 rounded-full transition-colors ${
              theme === "dark" ? "bg-indigo-500" : "bg-slate-300"
            }`}
          >
            <div
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                theme === "dark" ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </div>
        </button>

        {/* Logout */}
        <button
          onClick={() => {
            onClose();
            onLogout();
          }}
          className="flex w-full items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-red-500 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
          type="button"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}
