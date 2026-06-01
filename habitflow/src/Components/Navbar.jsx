export default function Navbar({ onToggleSidebar, onOpenForm }) {
  return (
    <header className="w-full h-16 flex items-center justify-between px-4 bg-white border-b border-gray-100">
      <button
        onClick={onToggleSidebar}
        className="md:hidden inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100"
        aria-label="Open sidebar"
        type="button"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
          <path
            d="M4 6h16M4 12h16M4 18h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div className="flex items-center gap-2">
        <span className="font-bold text-slate-800">Study/Workout Planner</span>
      </div>

      <button
        onClick={onOpenForm}
        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 active:scale-[0.98]"
        type="button"
      >
        + Add
      </button>
    </header>
  );
}
