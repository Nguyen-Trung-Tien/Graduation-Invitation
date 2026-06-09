import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import Envelope from "./components/Envelope";
import InvitationCard from "./components/InvitationCard";
import MusicPlayer from "./components/MusicPlayer";
import Customizer from "./components/Customizer";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initial invitation configuration, loaded from URL params if present
  const [config, setConfig] = useState({
    gradName: "Nguyễn Trung Tiến",
    degree: "Cử nhân",
    major: "Công nghệ Thông tin",
    date: "2026-10-15",
    time: "08:00",
    hall: "Hội trường A (Cơ sở chính)",
    address: "02 Võ Oanh, Phường 25, Quận Bình Thạnh, TP. Hồ Chí Minh",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  });

  const [guestName, setGuestName] = useState("Toàn thể Đại gia đình");

  // Parse URL query parameters on mount to support sharing custom invitations
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const guest = params.get("guest");
    const name = params.get("name");
    const major = params.get("major");
    const degree = params.get("degree");
    const date = params.get("date");
    const time = params.get("time");
    const hall = params.get("hall");
    const address = params.get("address");
    const music = params.get("music");

    if (guest) setGuestName(guest);

    setConfig((prev) => ({
      gradName: name || prev.gradName,
      degree: degree || prev.degree || "Cử nhân",
      major: major || prev.major,
      date: date || prev.date,
      time: time || prev.time,
      hall: hall || prev.hall,
      address: address || prev.address,
      audioUrl: music || prev.audioUrl,
    }));
  }, []);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    setIsPlaying(true);

    // Initial confetti burst
    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#d4af37", "#ffffff", "#002d62"], // gold, white, navy blue
    });

    // Secondary delayed confetti burst for premium feel
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.7 },
        colors: ["#d4af37", "#ffffff", "#002d62"],
      });
    }, 400);
  };

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden">
      {!isOpen ? (
        /* Sealed Envelope Entrance */
        <Envelope guestName={guestName} onOpen={handleOpenEnvelope} />
      ) : (
        /* Main Invitation Content */
        <div className="flex-1 w-full flex flex-col justify-between py-6 px-4 sm:px-6 relative z-10 animate-[fadeIn_1s_ease-out]">
          {/* Background Ambient Stars */}
          <div className="stars"></div>

          {/* Floating elements */}
          <div className="absolute top-10 left-10 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] bg-rose-500/8 rounded-full blur-[90px] pointer-events-none animate-blob-delayed"></div>
          <div className="absolute top-[40%] right-[30%] w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] bg-teal-500/6 rounded-full blur-[110px] pointer-events-none animate-blob-slow"></div>

          {/* Invitation Card */}
          <div className="flex-1 flex items-center justify-center">
            <InvitationCard config={config} guestName={guestName} />
          </div>

          {/* Floating Music Controller */}
          <MusicPlayer
            isPlaying={isPlaying}
            togglePlay={toggleMusic}
            audioUrl={config.audioUrl}
          />

          {/* Configuration / Share drawer */}
          <Customizer
            config={config}
            onChange={setConfig}
            defaultGuest={guestName}
          />
        </div>
      )}
    </div>
  );
}
