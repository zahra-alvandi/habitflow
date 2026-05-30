import ProgressBar from "./ProgressBar";

export default function Sidebar({tasks }) {
  console.log("Sidebar tasks:", tasks);
  
  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length; 

  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  console.log({ total, done, percent });

  return (
    <div className="max-w-md mx-auto h-screen p-8 bg-blue-50 rounded-xl shadow-xl border border-slate-100 flex flex-col justify-evenly">
      {/* icons */}
      <svg className="hidden">
        <symbol
          id="calender"
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
            d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
          />
        </symbol>
        <symbol
          id="stats"
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
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
          />
        </symbol>
        <symbol
          id="setting"
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
            d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </symbol>
        <symbol
          id="star"
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
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </symbol>
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
      </svg>
      {/* lists */}
      <ul className="flex flex-col gap-y-10 pl-4">
        <li className="text-black flex items-center gap-5 hover:text-blue-600 hover:bg-blue-200 w-full rounded-br-2xl rounded-tr-2xl py-2.5 pl-2.5 hover:border-l-4 hover:border-l-blue-600 transition">
          {/* <div className="w-1 bg-blue-600 h-12 pl-2 rounded-full"></div> */}
          <a href="#" className="flex items-center gap-1">
            <svg className="w-5 h-5">
              <use href="#tasks"></use>
            </svg>
            Tasks
          </a>
        </li>
        <li className="text-black flex items-center gap-5 hover:text-blue-600 hover:bg-blue-200 w-full rounded-br-2xl rounded-tr-2xl py-2.5 pl-2.5 hover:border-l-4 hover:border-l-blue-600 transition">
          {/* <div className="w-1 bg-blue-600 h-12 pl-2 rounded-full"></div> */}
          <a href="#" className="flex items-center gap-1">
            <svg className="w-5 h-5">
              <use href="#calender"></use>
            </svg>
            Calender
          </a>
        </li>
        <li className="text-black flex items-center gap-5 hover:text-blue-600 hover:bg-blue-200 w-full rounded-br-2xl rounded-tr-2xl py-2.5 pl-2.5 hover:border-l-4 hover:border-l-blue-600 transition">
          {/* <div className="w-1 bg-blue-600 h-12 pl-2 rounded-full"></div> */}
          <a href="#" className="flex items-center gap-1">
            <svg className="w-5 h-5">
              <use href="#stats"></use>
            </svg>
            Stats
          </a>
        </li>
        <li className="text-black flex items-center gap-5 hover:text-blue-600 hover:bg-blue-200 w-full rounded-br-2xl rounded-tr-2xl py-2.5 pl-2.5 hover:border-l-4 hover:border-l-blue-600 transition">
          {/* <div className="w-1 bg-blue-600 h-12 pl-2 rounded-full"></div> */}
          <a href="#" className="flex items-center gap-1">
            <svg className="w-5 h-5">
              <use href="#star"></use>
            </svg>
            Goals
          </a>
        </li>
        <li className="text-black flex items-center gap-5 hover:text-blue-600 hover:bg-blue-200 w-full rounded-br-2xl rounded-tr-2xl py-2.5 pl-2.5 hover:border-l-4 hover:border-l-blue-600 transition">
          {/* <div className="w-1 bg-blue-600 h-12 pl-2 rounded-full"></div> */}
          <a href="#" className="flex items-center gap-1">
            <svg className="w-5 h-5">
              <use href="#setting"></use>
            </svg>
            Settings
          </a>
        </li>
      </ul>

      <div className="mt-10 flex flex-col items-center justify-center border border-gray-300 rounded-3xl mx-5 p-5">
        <div>
          <svg className="w-14 h-14 font-light">
            <use href="#trophy"></use>
          </svg>
        </div>
        <div className="text-center">
          <h3>Keep going!</h3>
          <p className="font-light">Consistensy is progress.</p>
        </div>
        <ProgressBar percent={percent} />
      </div>
    </div>
  );
}
