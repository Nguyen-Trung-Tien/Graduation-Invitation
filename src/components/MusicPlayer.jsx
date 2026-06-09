import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer({ isPlaying, togglePlay, audioUrl }) {
  const audioRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4; // set gentle volume
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.log("Autoplay was blocked by browser. User interaction required.", err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleCanPlay = () => {
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"}
        loop
        onCanPlay={handleCanPlay}
      />

      {/* Audio Visualizer Waves (Shown only when playing) */}
      {isPlaying && (
        <div className="flex items-end h-[20px] px-2 py-1 rounded-full bg-slate-900/60 border border-slate-700/50 backdrop-blur-md">
          <span className="audio-bar"></span>
          <span className="audio-bar"></span>
          <span className="audio-bar"></span>
          <span className="audio-bar"></span>
        </div>
      )}

      {/* Spinning Disc Button */}
      <button
        onClick={togglePlay}
        className={`relative flex items-center justify-center w-12 h-12 rounded-full glass border border-accent/40 shadow-lg cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 ${
          isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
        }`}
        title={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
      >
        {/* Inner Vinyl Label */}
        <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800">
          <div className="w-4 h-4 rounded-full bg-accent/30 flex items-center justify-center">
            {isPlaying ? (
              <Volume2 className="w-3.5 h-3.5 text-accent" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
            )}
          </div>
        </div>
        
        {/* Tiny center hole */}
        <div className="absolute w-1.5 h-1.5 rounded-full bg-[#0a192f] border border-accent/60"></div>
      </button>
    </div>
  );
}
