export default function WordBlock ({
  word,
  displayWord,
  isBeingDragged,
  maxTime,
  onWordMouseDown,
  onResizeMouseDown,
})  {
  return (
    <div
      className={`absolute top-2 bottom-2 rounded-md flex items-center justify-center text-white text-xs font-medium cursor-move hover:brightness-110 transition-all ${
        isBeingDragged ? "opacity-80 shadow-lg" : ""
      }`}
      style={{
        left: `${(displayWord.startTime / maxTime) * 100}%`,
        width: `${
          ((displayWord.endTime - displayWord.startTime) / maxTime) * 100
        }%`,
        backgroundColor: word.color,
        minWidth: "30px",
        zIndex: isBeingDragged ? 10 : 1,
      }}
      onMouseDown={(e) => onWordMouseDown(e, word)}
    >
      {/* Left resize handle */}
      <div
        className="absolute left-0 top-0 bottom-0 w-2 bg-white/20 opacity-0 hover:opacity-100 cursor-ew-resize"
        onMouseDown={(e) => onResizeMouseDown(e, word.id, "left")}
      />

      {/* Word text */}
      <span className="truncate px-1">{word.text}</span>

      {/* Right resize handle */}
      <div
        className="absolute right-0 top-0 bottom-0 w-2 bg-white/20 opacity-0 hover:opacity-100 cursor-ew-resize"
        onMouseDown={(e) => onResizeMouseDown(e, word.id, "right")}
      />
    </div>
  );
};
