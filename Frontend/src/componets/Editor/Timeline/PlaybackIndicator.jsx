export default function PlaybackIndicator ({ currentTime, maxTime })  {
  return (
    <div
      className="absolute top-0 bottom-0 w-0.5 bg-cyan-500 shadow-lg z-20"
      style={{ left: `${(currentTime / maxTime) * 100}%` }}
    >
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-cyan-500" />
    </div>
  );
}
