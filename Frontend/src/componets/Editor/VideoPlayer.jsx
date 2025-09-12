import React, { useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

export const VideoPlayer = ({
  words,
  videoState,
  onVideoStateChange
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      onVideoStateChange({
        ...videoState,
        currentTime: video.currentTime
      });
    };

    const handleLoadedMetadata = () => {
      onVideoStateChange({
        ...videoState,
        duration: video.duration
      });
    };

    const handlePlay = () => {
      onVideoStateChange({
        ...videoState,
        isPlaying: true
      });
    };

    const handlePause = () => {
      onVideoStateChange({
        ...videoState,
        isPlaying: false
      });
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [videoState, onVideoStateChange]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (videoState.isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const getCurrentCaption = () => {
    return words.find(
      word => videoState.currentTime >= word.startTime && videoState.currentTime <= word.endTime
    );
  };

  const currentCaption = getCurrentCaption();

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 h-full">
      <h2 className="text-xl font-bold text-cyan-300 mb-6">Video Preview</h2>
      
      <div className="space-y-4">
        {/* Video Container */}
        <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src="https://videos.pexels.com/video-files/4830364/4830364-uhd_1440_2732_25fps.mp4"
            muted
          />
          
          {/* Play/Pause Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <button
              onClick={togglePlayPause}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 rounded-full p-4"
            >
              {videoState.isPlaying ? (
                <Pause size={32} className="text-white" />
              ) : (
                <Play size={32} className="text-white ml-1" />
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="bg-black/50 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-100"
                style={{
                  width: videoState.duration > 0 
                    ? `${(videoState.currentTime / videoState.duration) * 100}%`
                    : '0%'
                }}
              />
            </div>
          </div>
        </div>

        {/* Caption Display */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 min-h-16 flex items-center justify-center">
          {currentCaption ? (
            <div className="text-center">
              <span
                className="text-lg font-medium px-3 py-1 rounded-lg"
                style={{ 
                  color: currentCaption.color,
                  backgroundColor: `${currentCaption.color}20`
                }}
              >
                {currentCaption.text}
              </span>
            </div>
          ) : (
            <span className="text-gray-500 italic">No caption at current time</span>
          )}
        </div>

        {/* Video Controls */}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>
            {Math.floor(videoState.currentTime / 60)}:{(videoState.currentTime % 60).toFixed(0).padStart(2, '0')}
          </span>
          <span>
            {Math.floor(videoState.duration / 60)}:{(videoState.duration % 60).toFixed(0).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
};