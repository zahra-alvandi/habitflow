import { useState } from "react";
import { X } from "lucide-react";
import IconPicker from "./IconPicker";
import ColorPicker from "./ColorPicker";
import { ICON_MAP } from "../data/icons";

export default function CategoryModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("target");
  const [color, setColor] = useState("#6366F1");

  const PreviewIcon = ICON_MAP[icon] || ICON_MAP.target;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name, icon, color });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-slate-900/50 dark:bg-black/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />

      <div className="relative w-full sm:max-w-md bg-white dark:bg-slate-800 rounded-t-3xl sm:rounded-3xl p-6 sm:p-7 shadow-2xl animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)] max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all z-10"
          type="button"
        >
          <X size={18} />
        </button>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
              New Category
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              Create a custom category for your tasks
            </p>
          </div>

          {/* Preview */}
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors"
              style={{ backgroundColor: `${color}20` }}
            >
              <PreviewIcon size={24} style={{ color }} />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-slate-800 dark:text-slate-100 truncate">
                {name || "Category name"}
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                Preview
              </p>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Name
            </label>
            <input
              type="text"
              placeholder="e.g. Reading"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              className="w-full px-4 py-3 bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
            />
          </div>

          {/* Icon */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Icon
            </label>
            <IconPicker value={icon} onChange={setIcon} color={color} />
          </div>

          {/* Color */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Color
            </label>
            <ColorPicker value={color} onChange={setColor} />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="group w-full relative overflow-hidden rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 py-3.5 font-bold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 active:scale-[0.98] transition-all"
          >
            <span className="relative z-10">Create Category</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </form>
      </div>
    </div>
  );
}
