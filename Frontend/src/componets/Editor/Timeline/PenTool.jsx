export default function PenTool({ penPx, onPenMouseDown }) {
  return (
    <div
      className="absolute top-0 bottom-0 w-0.5 bg-orange-500 z-30"
      style={{ left: penPx }}
    >
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-orange-500 border-2 border-white rounded-full shadow-lg cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
        onMouseDown={onPenMouseDown}
      />
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-orange-500" />
    </div>
  );
}
