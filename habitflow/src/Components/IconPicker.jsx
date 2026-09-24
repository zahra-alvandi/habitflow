import { useState } from "react";
import { ICON_OPTIONS } from "../data/icons";

export default function IconPicker({ value, onChange, color = "#6366F1" }) {
  const [isOpen, setIsOpen] = useState(false);
  const SelectedIcon =
    ICON_OPTIONS.find((opt) => opt.name === value)?.icon ||
    ICON_OPTIONS[0].icon;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-600 transition-all"
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <SelectedIcon size={18} style={{ color }} />
        </div>
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Change icon
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-2 z-50 w-64 p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl">
            <div className="grid grid-cols-5 gap-1.5">
              {ICON_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = value === opt.name;
                return (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => {
                      onChange(opt.name);
                      setIsOpen(false);
                    }}
                    title={opt.label}
                    className={`aspect-square rounded-lg flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/30"
                        : "hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    <Icon size={18} />
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
