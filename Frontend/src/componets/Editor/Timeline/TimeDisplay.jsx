export default function TimeDisplay ({ currentTime, penTime })  {
    return (
    <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
      <span>Current: {currentTime.toFixed(1)}s</span>
      <span>Pen: {penTime.toFixed(1)}s</span>
    </div>
  );
};