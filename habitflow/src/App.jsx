import { useState } from "react";
import { useLocalStorage } from "./Hooks/useLocalStorage";
import { useDarkMode } from "./Hooks/useDarkMode";
import { useCategories } from "./Hooks/useCategories";
import { useAuth } from "./Hooks/useAuth";

import TaskForm from "./Components/TaskForm";
import TaskItem from "./Components/TaskItem";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import CalendarView from "./Components/CalendarView";
import CategoryModal from "./Components/CategoryModal";
import LoginPage from "./Components/LoginPage";
import SettingsModal from "./Components/SettingsModal";

export default function App() {
  const { user, login, logout, isAuthenticated } = useAuth();
  const [tasks, setTasks] = useLocalStorage("planner-v1", []);
  const [activeView, setActiveView] = useState("tasks");
  const [selectedDate, setSelectedDate] = useState(null);
  const [theme, toggleTheme] = useDarkMode();
  const { categories, addCategory } = useCategories();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  if (!isAuthenticated) {
    return <LoginPage onLogin={login} />;
  }

  const addTask = (task) => {
    setTasks((prev) => [task, ...prev]);
    setIsFormOpen(false);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTasks =
    selectedDate && activeView === "calendar"
      ? tasks.filter((t) => t.date === selectedDate)
      : tasks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen(true)}
        onOpenForm={() => setIsFormOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        user={user}
        onLogout={logout}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-72 shrink-0 border-r border-slate-200/60 dark:border-slate-800">
          <Sidebar
            tasks={tasks}
            categories={categories}
            activeView={activeView}
            onOpenTasks={() => setActiveView("tasks")}
            onOpenCalendar={() => setActiveView("calendar")}
          />
        </aside>

        {/* Mobile Sidebar Drawer */}
        <div
          className={`fixed inset-0 z-50 md:hidden ${
            isSidebarOpen ? "visible" : "invisible"
          }`}
        >
          <div
            className={`absolute inset-0 bg-slate-900/50 dark:bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
              isSidebarOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsSidebarOpen(false)}
          />
          <div
            className={`absolute left-0 top-0 h-full w-72 shadow-2xl transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar
              tasks={tasks}
              categories={categories}
              activeView={activeView}
              onOpenTasks={() => {
                setActiveView("tasks");
                setIsSidebarOpen(false);
              }}
              onOpenCalendar={() => {
                setActiveView("calendar");
                setIsSidebarOpen(false);
              }}
            />
          </div>
        </div>

        {/* Main */}
        <main className="flex-1 px-4 md:px-10 py-6 md:py-8">
          <div className="mx-auto max-w-3xl space-y-5">
            <div className="flex items-end justify-between flex-wrap gap-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                  {activeView === "calendar"
                    ? "Calendar"
                    : `Hi ${user.username} 👋`}
                </h1>
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                  {activeView === "calendar"
                    ? "Click a day to filter tasks."
                    : `${tasks.length} task${
                        tasks.length === 1 ? "" : "s"
                      } · ${tasks.filter((t) => t.completed).length} done`}
                </p>
              </div>
            </div>

            {activeView === "calendar" ? (
              <>
                <CalendarView
                  tasks={tasks}
                  categories={categories}
                  onSelectDate={setSelectedDate}
                />
                <div className="space-y-3">
                  {filteredTasks.length === 0 ? (
                    <EmptyState
                      message={
                        selectedDate
                          ? "No tasks on this day."
                          : "Select a day to see tasks."
                      }
                    />
                  ) : (
                    filteredTasks.map((t) => (
                      <TaskItem
                        key={t.id}
                        task={t}
                        categories={categories}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                      />
                    ))
                  )}
                </div>
              </>
            ) : (
              <div className="space-y-3">
                {tasks.length === 0 ? (
                  <EmptyState
                    message={`No tasks yet, ${user.username}. Add your first one below ✨`}
                  />
                ) : (
                  tasks.map((t) => (
                    <TaskItem
                      key={t.id}
                      task={t}
                      categories={categories}
                      onToggle={toggleTask}
                      onDelete={deleteTask}
                    />
                  ))
                )}
              </div>
            )}
          </div>

          <div className="hidden md:block mt-12 w-full max-w-lg mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-7 rounded-3xl border border-slate-200/70 dark:border-slate-700/70 shadow-xl shadow-slate-200/40 dark:shadow-black/40 transition-colors">
            <TaskForm
              onAdd={addTask}
              categories={categories}
              onOpenCategoryModal={() => setIsCategoryModalOpen(true)}
            />
          </div>
        </main>
      </div>

      {/* TaskForm Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-slate-900/50 dark:bg-black/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
            onClick={() => setIsFormOpen(false)}
          />
          <div className="relative w-full sm:max-w-md bg-white dark:bg-slate-800 rounded-t-3xl sm:rounded-3xl p-6 sm:p-7 shadow-2xl animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)] transition-colors max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all z-10"
              onClick={() => setIsFormOpen(false)}
              aria-label="Close form"
              type="button"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <TaskForm
              onAdd={addTask}
              categories={categories}
              onOpenCategoryModal={() => setIsCategoryModalOpen(true)}
            />
          </div>
        </div>
      )}

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <CategoryModal
          onClose={() => setIsCategoryModalOpen(false)}
          onSave={addCategory}
        />
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          user={user}
          theme={theme}
          onToggleTheme={toggleTheme}
          onLogout={logout}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
}

// 👇 EmptyState یه کامپوننت جداست — بیرون از App
function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-100 to-purple-100 dark:from-indigo-500/20 dark:to-purple-500/20 flex items-center justify-center mb-4">
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 text-indigo-400 dark:text-indigo-300"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      </div>
      <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">
        {message}
      </p>
    </div>
  );
}
