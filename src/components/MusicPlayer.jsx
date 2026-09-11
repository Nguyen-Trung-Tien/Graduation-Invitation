import { useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicPlayer({ isPlaying, togglePlay, audioUrl }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.35;
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.log("Autoplay blocked by browser. User interaction required.", err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 no-print">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"}
        loop
      />

      {/* Button */}
      <button
        type="button"
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-[#002D62] border border-[#B38728]/50 text-[#DFC479] flex items-center justify-center shadow-lg hover:bg-[#001D42] transition-colors cursor-pointer"
        title={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
        aria-label={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-[#DFC479]" />
        ) : (
          <VolumeX className="w-4 h-4 text-slate-400" />
        )}
      </button>
    </div>
  );
}
