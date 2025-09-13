export default function TimelineHeader ({ maxTime })  {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-cyan-300">Timeline</h2>
      <div className="flex items-center gap-4 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-cyan-500 rounded"></div>
          <span>Playhead</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span>Pen Tool</span>
        </div>
        <span>Duration: {maxTime.toFixed(1)}s</span>
      </div>
    </div>
  );
};
