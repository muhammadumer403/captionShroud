import React, { useState, useRef, useEffect } from "react";

export const Timeline = ({ words, videoState, onSeek, onPenPlace }) => {
  const timelineRef = useRef(null);
  const [penPx, setPenPx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const maxTime = Math.max(
    ...words.map((w) => w.endTime),
    videoState.duration || 10
  );

  const getTimeFromPx = (px) =>
    (px / timelineRef.current.offsetWidth) * maxTime;

  const handleMouseDown = (e) => {
    setDragging(true);
    movePen(e);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    movePen(e);
  };

  const handleMouseUp = () => {
    if (dragging) {
      setDragging(false);
      if (onPenPlace) onPenPlace(getTimeFromPx(penPx));
    }
  };

  const movePen = (e) => {
    const rect = timelineRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    setPenPx(x);
    if (onSeek) onSeek(getTimeFromPx(x));
  };

  // Sync pen with video
  useEffect(() => {
    if (!dragging && timelineRef.current) {
      setPenPx(
        (videoState.currentTime / maxTime) * timelineRef.current.offsetWidth
      );
    }
  }, [videoState.currentTime, dragging, timelineRef.current?.offsetWidth]);

  // Generate scale marks
  const numMarks = 10; // 10 divisions
  const scaleMarks = Array.from({ length: numMarks + 1 }, (_, i) => {
    const time = (i / numMarks) * maxTime;
    const left = (i / numMarks) * 100;
    return { time, left };
  });

  return (
    <div
      className="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-6 fixed bottom-0 left-1/2 transform -translate-x-1/2 w-11/12 mb-6 z-50"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <h2 className="text-xl font-bold text-cyan-300 mb-4">Timeline</h2>
      <div
        ref={timelineRef}
        className="relative bg-gray-800 rounded-lg h-20 overflow-hidden cursor-crosshair"
        onMouseDown={handleMouseDown}
      >
        {/* Scale Marks */}
        {scaleMarks.map((mark, i) => (
          <div
            key={i}
            className="absolute -top-4 w-px h-2 bg-gray-400"
            style={{ left: `${mark.left}%` }}
          >
            <div className="absolute -top-4 -translate-x-1/2 text-xs text-gray-300">
              {mark.time.toFixed(1)}s
            </div>
          </div>
        ))}

        {/* Word Blocks */}
        {words.map((word) => (
          <div
            key={word.id}
            className="absolute top-2 bottom-2 rounded-md flex items-center justify-center text-white text-xs font-medium"
            style={{
              left: `${(word.startTime / maxTime) * 100}%`,
              width: `${((word.endTime - word.startTime) / maxTime) * 100}%`,
              backgroundColor: word.color,
              minWidth: "40px",
            }}
          >
            {word.text}
          </div>
        ))}

        {/* Playback Indicator */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-cyan-500"
          style={{ left: `${(videoState.currentTime / maxTime) * 100}%` }}
        />
       
        {/* Pen Tool */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-orange-400"
          style={{ left: penPx }}
        >
            
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-orange-500 border-2 border-white rounded-full shadow-lg cursor-grab" />
        </div>
        
      </div>
      
    </div>
  );
};
