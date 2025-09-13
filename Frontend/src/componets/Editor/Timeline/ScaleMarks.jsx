export default function ScaleMarks ({ maxTime })  {
  const numMarks = Math.min(Math.max(Math.floor(maxTime), 5), 20);
  const scaleMarks = Array.from({ length: numMarks + 1 }, (_, i) => {
    const time = (i / numMarks) * maxTime;
    const left = (i / numMarks) * 100;
    return { time, left };
  });

  return (
    <div className="relative h-6 mb-2">
      {scaleMarks.map((mark, i) => (
        <div
          key={i}
          className="absolute top-0 flex flex-col items-center"
          style={{ left: `${mark.left}%` }}
        >
          <div className="w-px h-4 bg-gray-400"></div>
          <div className="text-xs text-gray-300 mt-1">
            {mark.time.toFixed(1)}s
          </div>
        </div>
      ))}
    </div>
  );
};
