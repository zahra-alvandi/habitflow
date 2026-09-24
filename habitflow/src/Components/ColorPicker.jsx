import { COLOR_OPTIONS } from "../data/icons";

export default function ColorPicker({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {COLOR_OPTIONS.map((color) => {
        const isSelected = value === color;
        return (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={`relative w-9 h-9 rounded-xl transition-all ${
              isSelected
                ? "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-800 scale-110"
                : "hover:scale-105"
            }`}
            style={{
              backgroundColor: color,
              boxShadow: isSelected ? `0 0 0 2px ${color}` : "none",
            }}
            aria-label={`Select color ${color}`}
          >
            {isSelected && (
              <svg
                viewBox="0 0 24 24"
                className="absolute inset-0 m-auto w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
}
