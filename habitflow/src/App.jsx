import { useLocalStorage } from "./Hooks/useLocalStorage";
import TaskForm from "./Components/TaskFrom";
import TaskItem from "./Components/TaskItem";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";

export default function App() {
  const [tasks, setTasks] = useLocalStorage("planner-v1", []);

  const addTask = (task) => {
    setTasks((prev) => [task, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div>
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <div>
          <Sidebar tasks={tasks} />
        </div>

        {/* Task list وسط */}
        <div className="flex-1 px-6">
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

        {/* Task form سمت راست */}
        <div>
          <TaskForm onAdd={addTask} />
        </div>
      </div>
    </div>
  );
}
