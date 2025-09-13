import React, { useEffect, useState } from 'react';
import { WordsPanel } from '../componets/Editor/WordsCRUD';
import { VideoPlayer } from '../componets/Editor/VideoPlayer';
import { Timeline } from '../componets/Editor/Timeline';


// Mock data for demonstration
const initialWords = [
  { id: 1, text: "Welcome", startTime: 0.5, endTime: 1.2, color: "#3b82f6" },
  { id: 2, text: "to", startTime: 1.3, endTime: 1.6, color: "#ec4899" },
  { id: 3, text: "our", startTime: 1.7, endTime: 2.1, color: "#10b981" },
  { id: 4, text: "amazing", startTime: 2.2, endTime: 2.9, color: "#f97316" },
  { id: 5, text: "caption", startTime: 3.0, endTime: 3.7, color: "#eab308" },
  { id: 6, text: "editing", startTime: 3.8, endTime: 4.5, color: "#8b5cf6" },
  { id: 7, text: "platform", startTime: 4.6, endTime: 5.3, color: "#06b6d4" },
  { id: 8, text: "where", startTime: 5.4, endTime: 5.9, color: "#ef4444" },
  { id: 9, text: "creativity", startTime: 6.0, endTime: 6.8, color: "#84cc16" },
  { id: 10, text: "meets", startTime: 6.9, endTime: 7.4, color: "#f59e0b" },
  { id: 11, text: "technology", startTime: 7.5, endTime: 8.3, color: "#14b8a6" },
  { id: 12, text: "seamlessly", startTime: 8.4, endTime: 9.2, color: "#f43f5e" }
];

function Editor() {
  const [words, setWords] = useState(initialWords);
  const [videoState, setVideoState] = useState({
    currentTime: 0,
    duration: 0,
    isPlaying: false
  });

  const handleAddWord = (newWord) => {
    const id = Math.max(...words.map(w => w.id), 0) + 1;
    setWords([...words, { ...newWord, id }].sort((a, b) => a.startTime - b.startTime));
  };

  const handleEditWord = (id, updatedWord) => {
    setWords(words.map(word => 
      word.id === id ? { ...updatedWord, id } : word
    ).sort((a, b) => a.startTime - b.startTime));
  };

  const handleDeleteWord = (id) => {
    setWords(words.filter(word => word.id !== id));
  };

  const handleSeek = (time) => {
    setVideoState(prev => ({ ...prev, currentTime: time }));
    
    // Also seek the actual video element
    const videoElement = document.querySelector('video');
    if (videoElement) {
      videoElement.currentTime = time;
    }
  };

  const handleWordsUpdate = (updatedWords) => {
    setWords(updatedWords);
  };
  useEffect(()=>{
   setWords(words.sort((a,b)=>a.startTime - b.startTime))
  },[words])
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Caption Editor
          </h1>
          <p className="text-gray-400 mt-2">Modern web-based caption editing platform</p>
        </div>

        {/* Top Section - Words Panel & Video Player */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-fit ">
          <WordsPanel
            words={words}
            currentTime={videoState.currentTime}
            onAddWord={handleAddWord}
            onEditWord={handleEditWord}
            onDeleteWord={handleDeleteWord}
          />
          <VideoPlayer
            words={words}
            videoState={videoState}
            onVideoStateChange={setVideoState}
          />
        </div>

        {/* Bottom Section - Timeline */}
        <Timeline
          words={words}
          videoState={videoState}
          onSeek={handleSeek}
          onWordsUpdate={handleWordsUpdate}
        />
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-500" />
      </div>
    </div>
  );
}

export default Editor;