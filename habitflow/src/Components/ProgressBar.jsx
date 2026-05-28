export default function ProgressBar({ percent }) {
  return (
    <div className="w-full px-5 mt-4">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>{percent}% Completed</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
