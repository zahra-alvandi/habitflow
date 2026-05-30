import { useState } from "react";
import { useLocalStorage } from "./Hooks/useLocalStorage";
import TaskForm from "./Components/TaskFrom";
import TaskItem from "./Components/TaskItem";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import CalendarView from "./Components/CalendarView";

export default function App() {
  const [tasks, setTasks] = useLocalStorage("planner-v1", []);
  const [activeView, setActiveView] = useState("tasks"); // "tasks" | "calendar"
  const [selectedDate, setSelectedDate] = useState(null); // "YYYY-MM-DD" یا null

  const addTask = (task) => setTasks((prev) => [task, ...prev]);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const filteredTasks =
    selectedDate && activeView === "calendar"
      ? tasks.filter((t) => t.date === selectedDate)
      : tasks;

  return (
    <div>
      <Navbar />

      <div className="flex">
        <div>
          <Sidebar
            tasks={tasks}
            activeView={activeView}
            onOpenCalendar={() => setActiveView("calendar")}
            onOpenTasks={() => {
              setActiveView("tasks");
              setSelectedDate(null);
            }}
          />
        </div>

        <div className="flex-1 px-6">
          <div className="mt-8 space-y-4">
            {activeView === "calendar" ? (
              <>
                <CalendarView
                  tasks={tasks}
                  onSelectDate={(dateStr) => setSelectedDate(dateStr)}
                  onSelectTask={(task) => {
                    // اختیاری: کلیک روی event => فقط همان روز را انتخاب کن
                    if (task?.date) setSelectedDate(task.date);
                  }}
                />

                {selectedDate && (
                  <div className="text-sm text-slate-600">
                    Showing tasks for: <b>{selectedDate}</b>{" "}
                    <button
                      className="ml-2 text-blue-600 hover:underline"
                      onClick={() => setSelectedDate(null)}
                    >
                      Clear
                    </button>
                  </div>
                )}

                <div className="space-y-3">
                  {filteredTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={toggleTask}
                      onDelete={deleteTask}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <TaskForm onAdd={addTask} />
        </div>
      </div>
    </div>
  );
}
