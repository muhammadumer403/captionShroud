import {GridLines, WordBlock, PlaybackIndicator,PenTool} from './index'

export default function TimelineTrack ({
  timelineRef,
  maxTime,
  words,
  currentTime,
  penPx,
  draggedWord,
  onTimelineClick,
  onWordMouseDown,
  onResizeMouseDown,
  onPenMouseDown,
})  {
  const getDisplayWord = (word) => {
    return draggedWord && draggedWord.id === word.id ? draggedWord : word;
  };

  return (
    <div
      ref={timelineRef}
      className="relative bg-gray-800 rounded-lg h-20 overflow-hidden cursor-crosshair select-none "
      onClick={onTimelineClick}
    >
      {/* Grid Lines */}
      <GridLines maxTime={maxTime} />

      {/* Word Blocks */}
      {words.map((word) => {
        const displayWord = getDisplayWord(word);
        const isBeingDragged = draggedWord && draggedWord.id === word.id;

        return (
          <WordBlock
            key={word.id}
            word={word}
            displayWord={displayWord}
            isBeingDragged={isBeingDragged}
            maxTime={maxTime}
            onWordMouseDown={onWordMouseDown}
            onResizeMouseDown={onResizeMouseDown}
          />
        );
      })}

      {/* Playback Indicator */}
      <PlaybackIndicator currentTime={currentTime} maxTime={maxTime} />

      {/* Pen Tool */}
      <PenTool penPx={penPx} onPenMouseDown={onPenMouseDown} />
    </div>
  );
};
