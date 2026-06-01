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
  
  // وضعیت‌های جدید برای موبایل
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

  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

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
        {/* Sidebar به صورت Drawer در موبایل */}
        <div className={`fixed inset-0 z-50 transition-all ${isSidebarOpen ? "visible" : "invisible"}`}>
           <div 
             className={`absolute inset-0 bg-black/40 transition-opacity ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}
             onClick={() => setIsSidebarOpen(false)}
           />
           <div className={`absolute left-0 top-0 h-full w-64 bg-white transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
              <Sidebar
                tasks={tasks}
                activeView={activeView}
                onOpenTasks={() => { setActiveView("tasks"); setIsSidebarOpen(false); }}
                onOpenCalendar={() => { setActiveView("calendar"); setIsSidebarOpen(false); }}
              />
           </div>
        </div>

        {/* محتوای اصلی */}
        <main className="flex-1 px-4 md:px-8 mt-8">
            <div className="mx-auto max-w-2xl space-y-4">
                {activeView === "calendar" ? (
                <>
                    <CalendarView tasks={tasks} onSelectDate={setSelectedDate} />
                    <div className="space-y-3">
                    {filteredTasks.map((t) => <TaskItem key={t.id} task={t} onToggle={toggleTask} onDelete={deleteTask} />)}
                    </div>
                </>
                ) : (
                <div className="space-y-3">
                    {tasks.map((t) => <TaskItem key={t.id} task={t} onToggle={toggleTask} onDelete={deleteTask} />)}
                </div>
                )}
            </div>
        </main>

        {/* TaskForm به صورت Modal/Bottom Sheet */}
        {isFormOpen && (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/40" onClick={() => setIsFormOpen(false)} />
                <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl">
                    <button className="absolute top-4 right-4 text-gray-400" onClick={() => setIsFormOpen(false)}>✕</button>
                    <TaskForm onAdd={addTask} />
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
