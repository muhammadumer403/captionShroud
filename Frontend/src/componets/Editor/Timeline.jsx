import React, { useState, useRef, useEffect } from "react";

import {
  TimelineHeader,
  ScaleMarks,
  TimelineTrack,
  TimeDisplay,
} from "./Timeline/index";
export const Timeline = ({ words, videoState, onSeek, onWordsUpdate }) => {
  const timelineRef = useRef(null);
  const [penPx, setPenPx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [draggedWord, setDraggedWord] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [resizing, setResizing] = useState({ wordId: null, edge: null });

  const maxTime = Math.max(
    ...words.map((w) => w.endTime),
    videoState.duration || 10,
    20
  );

  // Helper functions
  const getTimeFromPx = (px) => {
    if (!timelineRef.current) return 0;
    return Math.max(0, (px / timelineRef.current.offsetWidth) * maxTime);
  };

  const getPxFromTime = (time) => {
    if (!timelineRef.current) return 0;

    return (time / maxTime) * timelineRef.current.offsetWidth;
  };

  // Event Handlers
  const handlePenMouseDown = (e) => {
    e.stopPropagation();
    setDragging(true);
    movePen(e);
  };

  const movePen = (e) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    setPenPx(x);
    const time = getTimeFromPx(x);
    if (onSeek) onSeek(time);
  };

  const handleWordMouseDown = (e, word) => {
    e.stopPropagation();
    const rect = timelineRef.current.getBoundingClientRect();
    const wordStartPx = getPxFromTime(word.startTime);
    setDragOffset(e.clientX - rect.left - wordStartPx);
    setDraggedWord({
      ...word,
      originalStartTime: word.startTime,
      originalEndTime: word.endTime,
    });
  };

  const handleWordDrag = (e) => {
    if (!draggedWord || !timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const newStartPx = Math.max(0, e.clientX - rect.left - dragOffset);
    const newStartTime = getTimeFromPx(newStartPx);
    const duration =
      draggedWord.originalEndTime - draggedWord.originalStartTime;
    const newEndTime = newStartTime + duration;

    setDraggedWord({
      ...draggedWord,
      startTime: Math.max(0, newStartTime),
      endTime: Math.max(duration, newEndTime),
    });
  };

  const finalizeDraggedWord = () => {
    if (!draggedWord || !onWordsUpdate) return;

    const updatedWords = words.map((word) =>
      word.id === draggedWord.id
        ? {
            ...word,
            startTime: Math.round(draggedWord.startTime * 10) / 10,
            endTime: Math.round(draggedWord.endTime * 10) / 10,
          }
        : word
    );

    onWordsUpdate(updatedWords);
    setDraggedWord(null);
    setDragOffset(0);
  };

  const handleResizeMouseDown = (e, wordId, edge) => {
    e.stopPropagation();
    setResizing({ wordId, edge });
  };

  const handleWordResize = (e) => {
    if (!resizing.wordId || !onWordsUpdate) return;

    const time = getTimeFromPx(
      e.clientX - timelineRef.current.getBoundingClientRect().left
    );
    const updatedWords = words.map((word) => {
      if (word.id === resizing.wordId) {
        if (resizing.edge === "left") {
          return {
            ...word,
            startTime: Math.max(0, Math.min(time, word.endTime - 0.1)),
          };
        } else if (resizing.edge === "right") {
          return {
            ...word,
            endTime: Math.max(word.startTime + 0.1, time),
          };
        }
      }
      return word;
    });

    onWordsUpdate(updatedWords);
  };

  const handleTimelineClick = (e) => {
    if (e.target === timelineRef.current) {
      const time = getTimeFromPx(
        e.clientX - timelineRef.current.getBoundingClientRect().left
      );
      if (onSeek) onSeek(time);
      setPenPx(getPxFromTime(time));
    }
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      movePen(e);
    } else if (draggedWord) {
      handleWordDrag(e);
    } else if (resizing.wordId) {
      handleWordResize(e);
    }
  };

  const handleMouseUp = (e) => {
    if (dragging) {
      setDragging(false);
      const time = getTimeFromPx(penPx);
      if (onSeek) onSeek(time);
    }

    if (draggedWord) {
      finalizeDraggedWord();
    }

    if (resizing.wordId) {
      setResizing({ wordId: null, edge: null });
    }
  };

  // Sync pen with video
  useEffect(() => {
    if (!dragging && timelineRef.current) {
      setPenPx(getPxFromTime(videoState.currentTime));
    }
  }, [videoState.currentTime, dragging, maxTime]);

  return (
    <div

     
      className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 w-full max-w-[90vw]  overflow-x-auto"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div style={{ width: ((videoState.duration || 15) / 15) * 100 + "%" }}>
        {/* Header with Legend */}
        <TimelineHeader maxTime={maxTime} />

        <div className="relative">
          {/* Scale Marks */}
          <ScaleMarks maxTime={maxTime} />

          {/* Main Timeline Track */}
          <TimelineTrack
            timelineRef={timelineRef}
            maxTime={maxTime}
            words={words}
            currentTime={videoState.currentTime}
            penPx={penPx}
            draggedWord={draggedWord}
            onTimelineClick={handleTimelineClick}
            onWordMouseDown={handleWordMouseDown}
            onResizeMouseDown={handleResizeMouseDown}
            onPenMouseDown={handlePenMouseDown}
          />

          {/* Time Display */}
          <TimeDisplay
            currentTime={videoState.currentTime}
            penTime={getTimeFromPx(penPx)}
          />
        </div>
      </div>
    </div>
  );
};
