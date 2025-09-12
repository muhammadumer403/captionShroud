import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

const colors = [
  "#3b82f6",
  "#ec4899",
  "#10b981",
  "#f97316",
  "#eab308",
  "#8b5cf6",
  "#06b6d4",
  "#ef4444",
];

export const WordsPanel = ({
  words,
  currentTime,
  onAddWord,
  onEditWord,
  onDeleteWord,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newWord, setNewWord] = useState({
    text: "",
    startTime: currentTime,
    endTime: currentTime + 1,
  });

  // Update new word timing when current time changes
  useEffect(() => {
    if (isAdding) {
      setNewWord((prev) =>
        ({
          ...prev,
          startTime: currentTime,
          endTime: currentTime + 1,
        }
      ));
    }
  }, [currentTime, isAdding]);

  const adjustWordTiming = (newWord, existingWords) => {
    const sortedWords = [...existingWords].sort(
      (a, b) => a.startTime - b.startTime
    );

    // Find words before and after the new word position
    const wordBefore = sortedWords
      .filter((w) => w.endTime <= newWord.startTime)
      .pop();
    const wordAfter = sortedWords.find((w) => w.startTime >= newWord.endTime);

    let adjustedStartTime = newWord.startTime;
    let adjustedEndTime = newWord.endTime;

    // Adjust start time if there's a word before
    if (wordBefore) {
      adjustedStartTime = Math.max(adjustedStartTime, wordBefore.endTime + 0.1);
    }

    // Adjust end time if there's a word after
    if (wordAfter) {
      adjustedEndTime = Math.min(adjustedEndTime, wordAfter.startTime - 0.1);
    }

    // Ensure minimum duration of 0.5 seconds
    if (adjustedEndTime - adjustedStartTime < 0.5) {
      adjustedEndTime = adjustedStartTime + 0.5;
    }

    return {
      ...newWord,
      startTime: Math.round(adjustedStartTime * 10) / 10,
      endTime: Math.round(adjustedEndTime * 10) / 10,
    };
  };

  const handleAdd = () => {
    if (newWord.text.trim()) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      // Auto-adjust timing based on pen position and neighboring words
      const adjustedWord = adjustWordTiming(
        { ...newWord, color: randomColor },
        words
      );
      onAddWord(adjustedWord);

      setNewWord({
        text: "",
        startTime: currentTime,
        endTime: currentTime + 1,
      });
      setIsAdding(false);
    }
  };

  const handleEdit = (word) => {
    onEditWord(word.id, {
      text: word.text,
      startTime: word.startTime,
      endTime: word.endTime,
      color: word.color,
    });
    setEditingId(null);
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-cyan-300">Words/CRUD</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {isAdding && (
          <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4 space-y-3">
            <input
              type="text"
              placeholder={`Word at ${currentTime.toFixed(1)}s`}
              value={newWord.text}
              onChange={(e) => setNewWord({ ...newWord, text: e.target.value })}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-cyan-400 focus:outline-none"
              autoFocus
            />
            <div className="text-sm text-gray-400 bg-gray-700/30 rounded p-2">
              <div className="flex justify-between">
                <span>Auto-timing:</span>
                <span className="text-cyan-300">
                  {newWord.startTime.toFixed(1)}s - {newWord.endTime.toFixed(1)}
                  s
                </span>
              </div>
              <div className="text-xs mt-1 text-gray-500">
                Position based on pen tool location
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="bg-emerald-500 text-white px-3 py-1 rounded-lg hover:bg-emerald-400 transition-colors"
              >
                Add at Current Position
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="bg-gray-600 text-white px-3 py-1 rounded-lg hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {words.map((word) => (
          <div
            key={word.id}
            className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-all duration-300"
          >
            {editingId === word.id ? (
              <EditWordForm
                word={word}
                onSave={handleEdit}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: word.color }}
                  />
                  <div>
                    <div className="text-white font-medium">{word.text}</div>
                    <div className="text-gray-400 text-sm">
                      {word.startTime}s - {word.endTime}s
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(word.id)}
                    className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-blue-500/10 transition-all"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDeleteWord(word.id)}
                    className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const EditWordForm = ({ word, onSave, onCancel }) => {
  const [editedWord, setEditedWord] = useState(word);

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={editedWord.text}
        onChange={(e) => setEditedWord({ ...editedWord, text: e.target.value })}
        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-cyan-400 focus:outline-none"
      />
      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          step="0.1"
          value={editedWord.startTime}
          onChange={(e) =>
            setEditedWord({
              ...editedWord,
              startTime: parseFloat(e.target.value),
            })
          }
          className="bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-cyan-400 focus:outline-none"
        />
        <input
          type="number"
          step="0.1"
          value={editedWord.endTime}
          onChange={(e) =>
            setEditedWord({
              ...editedWord,
              endTime: parseFloat(e.target.value),
            })
          }
          className="bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-cyan-400 focus:outline-none"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onSave(editedWord)}
          className="bg-emerald-500 text-white px-3 py-1 rounded-lg hover:bg-emerald-400 transition-colors"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-600 text-white px-3 py-1 rounded-lg hover:bg-gray-500 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
