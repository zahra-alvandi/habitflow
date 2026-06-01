import ProgressBar from "./ProgressBar";

export default function Sidebar({
  tasks,
  activeView,
  onOpenTasks,
  onOpenCalendar,
}) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="h-full min-h-screen md:min-h-[calc(100vh-64px)] p-6 md:p-8 flex flex-col justify-between">
      <svg className="hidden">
        <symbol
          id="trophy"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
          />
        </symbol>
        <symbol
          id="tasks"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
          />
        </symbol>
        <symbol
          id="calendar"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
          />
        </symbol>
      </svg>
      <ul className="flex flex-col gap-y-6">
        <li
          className={`flex items-center w-full rounded-2xl transition ${
            activeView === "tasks"
              ? "text-blue-600 bg-blue-200"
              : "hover:bg-blue-100"
          }`}
        >
          <button
            onClick={onOpenTasks}
            className="flex w-full items-center gap-3 py-3 px-4"
            type="button"
          >
            <svg className="w-6 h-6">
              <use href="#tasks" />
            </svg>
            <span className="font-medium">Tasks</span>
          </button>
        </li>

        <li
          className={`flex items-center w-full rounded-2xl transition ${
            activeView === "calendar"
              ? "text-blue-600 bg-blue-200"
              : "hover:bg-blue-100"
          }`}
        >
          <button
            onClick={onOpenCalendar}
            className="flex w-full items-center gap-3 py-3 px-4"
            type="button"
          >
            {/* SVG خودت را نگه دار */}
            <svg className="w-6 h-6">
              <use href="#calendar" />
            </svg>
            <span className="font-medium">Calendar</span>
          </button>
        </li>
      </ul>

      <div className="flex flex-col items-center justify-center border border-gray-300 rounded-3xl p-5 bg-white/50">
        <svg className="w-12 h-12 text-blue-600">
          <use href="#trophy"></use>
        </svg>

        <div className="text-center my-2">
          <h3 className="font-bold">Keep going!</h3>
          <p className="text-xs text-gray-500">Consistency is progress.</p>
        </div>

        <ProgressBar percent={percent} />
      </div>
    </div>
  );
}
