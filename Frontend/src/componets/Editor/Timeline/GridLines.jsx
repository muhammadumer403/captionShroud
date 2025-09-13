export default function GridLines({ maxTime }) {
  const numMarks = Math.min(Math.max(Math.floor(maxTime), 5), 20);
  const gridLines = Array.from({ length: numMarks + 1 }, (_, i) => ({
    left: (i / numMarks) * 100,
  }));

  return (
    <>
      {gridLines.map((line, i) => (
        <div
          key={`grid-${i}`}
          className="absolute top-0 bottom-0 w-px bg-gray-700/50"
          style={{ left: `${line.left}%` }}
        />
      ))}
    </>
  );
}
