export default function ProgressBar({ percent }) {
  return (
    <div className="w-full mt-4">
      <div className="flex justify-between items-center text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
        <span className="uppercase tracking-wider">Progress</span>
        <span className="text-indigo-600 dark:text-indigo-300">{percent}%</span>
      </div>
      <div className="relative w-full h-2.5 bg-slate-100 dark:bg-slate-700/60 rounded-full overflow-hidden ring-1 ring-slate-200/60 dark:ring-slate-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-indigo-500 to-purple-500 transition-all duration-700 ease-out relative"
          style={{ width: `${percent}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/30 to-white/0 animate-pulse" />
        </div>
      </div>
    </div>
  );
}