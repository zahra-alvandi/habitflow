import { useLocalStorage } from "./Hooks/useLocalStorage";
import TaskForm from "./Components/TaskFrom";
import TaskItem from "./Components/TaskItem";
export default function App() {
  const [tasks, setTasks] = useLocalStorage("planner-v1", []);

  const addTask = (task) => {
    setTasks((prev) => [task, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 flex justify-center font-sans">
      <div className="w-full max-w-2xl">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Focus Flow.
            </h1>
            <p className="mt-2 text-lg text-slate-500">امروز چه هدفی داری؟</p>
          </div>

          <div className="text-right">
            <span className="block text-3xl font-bold text-blue-600">
              {tasks.filter((t) => t.completed).length}/{tasks.length}
            </span>
            <span className="text-xs font-bold uppercase text-slate-400">
              تکمیل شده
            </span>
          </div>
        </header>

        <TaskForm onAdd={addTask} />

        <div className="mt-8 space-y-3">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
