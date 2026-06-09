import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Settings } from "lucide-react";
import Envelope from "./components/Envelope";
import InvitationCard from "./components/InvitationCard";
import Customizer from "./components/Customizer";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Initial invitation configuration, loaded from URL params if present
  const [config, setConfig] = useState({
    gradName: "Nguyễn Trung Tiến",
    degree: "Cử nhân",
    major: "Công nghệ Thông tin",
    date: "2026-10-15",
    time: "08:00",
    hall: "Hội trường A (Cơ sở chính)",
    address: "02 Võ Oanh, Phường 25, Quận Bình Thạnh, TP. Hồ Chí Minh",
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

    if (guest) setGuestName(guest);

    setConfig((prev) => ({
      gradName: name || prev.gradName,
      degree: degree || prev.degree || "Cử nhân",
      major: major || prev.major,
      date: date || prev.date,
      time: time || prev.time,
      hall: hall || prev.hall,
      address: address || prev.address,
    }));
  }, []);

  const handleOpenEnvelope = () => {
    setIsOpen(true);

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

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden">
      {!isOpen ? (
        /* Sealed Envelope Entrance */
        <Envelope guestName={guestName} onOpen={handleOpenEnvelope} />
      ) : (
        /* Main Invitation Content */
        <div className="flex-1 w-full flex flex-col justify-start py-6 px-4 sm:px-6 relative z-10 animate-[fadeIn_1s_ease-out] gap-4">
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

          {/* Settings Button below Card */}
          <div className="w-full max-w-3xl mx-auto flex justify-center mt-2 mb-4 relative z-20">
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-md glass border border-accent/40 shadow-md text-[#002d62] hover:bg-[#002d62] hover:text-white transition-all hover:scale-105 active:scale-95 text-sm font-bold uppercase tracking-wider cursor-pointer font-sans"
            >
              <Settings className="w-4 h-4 text-accent animate-[spin_12s_linear_infinite]" />
              <span>Tùy chỉnh thông tin</span>
            </button>
          </div>

          {/* Configuration / Share drawer */}
          <Customizer
            config={config}
            onChange={setConfig}
            defaultGuest={guestName}
            isOpen={isCustomizerOpen}
            onClose={() => setIsCustomizerOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
