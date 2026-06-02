import { useState } from "react";
import { useLocalStorage } from "./Hooks/useLocalStorage";

import TaskForm from "./Components/TaskFrom";
import TaskItem from "./Components/TaskItem";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import CalendarView from "./Components/CalendarView";

export default function App() {
  const [tasks, setTasks] = useLocalStorage("planner-v1", []);
  const [activeView, setActiveView] = useState("tasks");
  const [selectedDate, setSelectedDate] = useState(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

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
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen(true)}
        onOpenForm={() => setIsFormOpen(true)}
      />

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-72 shrink-0 border-r border-slate-100 bg-blue-50">
          <Sidebar
            tasks={tasks}
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
            className={`absolute inset-0 bg-black/40 transition-opacity ${
              isSidebarOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsSidebarOpen(false)}
          />
          <div
            className={`absolute left-0 top-0 h-full w-72 bg-blue-50 shadow-xl transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar
              tasks={tasks}
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
        <main className="flex-1 px-4 md:px-8 py-6">
          <div className="mx-auto max-w-3xl space-y-4">
            {activeView === "calendar" ? (
              <>
                <CalendarView tasks={tasks} onSelectDate={setSelectedDate} />
                <div className="space-y-3">
                  {filteredTasks.map((t) => (
                    <TaskItem
                      key={t.id}
                      task={t}
                      onToggle={toggleTask}
                      onDelete={deleteTask}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-3">
                {tasks.map((t) => (
                  <TaskItem
                    key={t.id}
                    task={t}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="hidden md:block mt-10 w-full max-w-lg mx-auto bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <TaskForm onAdd={addTask} />
          </div>
        </main>
      </div>

      {/* TaskForm BottomSheet / Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsFormOpen(false)}
          />

          <div className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl">
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl"
              onClick={() => setIsFormOpen(false)}
              aria-label="Close form"
              type="button"
            >
              ✕
            </button>

            <TaskForm onAdd={addTask} />
          </div>
        </div>
      )}
    </div>
  );
}
