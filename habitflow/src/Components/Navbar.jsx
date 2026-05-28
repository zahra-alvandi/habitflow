import { useEffect, useState } from "react";

export default function Navbar() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="w-full mt-2 pb-2 flex items-center justify-evenly border-b border-gray-400">
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
      </svg>
      {/* calender and text */}
      <div className="flex items-center gap-2">
        <svg className="w-10 h-10 text-blue-700">
          <use href="#calender"></use>
        </svg>
        <span className="font-bold">Study/Workout Planner</span>
      </div>
      <div className="flex items-center">
        <span>Today is</span>
        <div className="bg-blue-300 text-blue-700 px-4 py-1 rounded-full mx-5 flex items-center gap-2">
            {now.toLocaleDateString()} | {now.toLocaleTimeString()}
            <svg className="w-5 h-5 text-black">
                <use href="#calender"></use>
            </svg>
        </div>
      </div>
    </div>
  );
}
