import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Settings, Printer } from "lucide-react";
import Envelope from "./components/Envelope";
import InvitationCard from "./components/InvitationCard";
import Customizer from "./components/Customizer";
import ExportModal from "./components/ExportModal";

import uthCampusImg from "./assets/Hinh_UTH.jpg";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [bgTheme, setBgTheme] = useState("uth-campus"); // 'uth-campus', 'classic'

  // Initial invitation configuration, loaded from URL params if present
  const [config, setConfig] = useState({
    gradName: "Nguyễn Trung Tiến",
    degree: "Cử nhân",
    major: "Công nghệ Thông tin",
    date: "2026-12-26 (dự kiến)",
    time: "16:30",
    hall: "Cơ sở chính (Cơ sở 1)",
    address: "Số 2 Võ Oanh, Thạnh Mỹ Tây, Hồ Chí Minh",
    invitationText:
      "Trân trọng kính mời gia đình đến chia vui cùng con trong buổi lễ tốt nghiệp.\nLưu ý: Khi tham gia lễ phải có vé tham gia (tối đa 5 vé)"
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
    const text = params.get("text");
    const theme = params.get("theme");

    if (guest) setGuestName(guest);
    if (theme) setBgTheme(theme);

    if (
      guest ||
      name ||
      major ||
      degree ||
      date ||
      time ||
      hall ||
      address ||
      text ||
      theme ||
      params.get("shared") === "true"
    ) {
      setIsShared(true);
    }

    setConfig((prev) => ({
      gradName: name || prev.gradName,
      degree: degree || prev.degree || "Cử nhân",
      major: major || prev.major,
      date: date || prev.date,
      time: time || prev.time,
      hall: hall || prev.hall,
      address: address || prev.address,
      invitationText:
        text ||
        prev.invitationText ||
        "Trân trọng kính mời gia đình đến chia vui cùng con trong buổi lễ tốt nghiệp.\nLưu ý: Khi tham gia lễ phải có vé tham gia (tối đa 5 vé)",
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
    <div
      className={`relative min-h-dvh w-full flex flex-col justify-between ${!isOpen ? "overflow-hidden" : "overflow-x-hidden"}`}
    >
      {!isOpen ? (
        /* Sealed Envelope Entrance */
        <Envelope guestName={guestName} bgTheme={bgTheme} onOpen={handleOpenEnvelope} />
      ) : (
        /* Main Invitation Content */
        <div className="flex-1 w-full flex flex-col justify-between py-1 sm:py-3 px-1.5 sm:px-4 relative z-10 animate-[fadeIn_1s_ease-out] gap-1 sm:gap-2">
          {/* Global Dynamic Background Layer (100% Sharp, Crisp & HD on Desktop & Mobile) */}
          <div className={`fixed inset-0 overflow-hidden pointer-events-none z-0 transition-all duration-700 ${bgTheme === "classic" ? "bg-[#F9F3E3]" : "bg-[#0b1329]"}`}>
            {/* Theme: uth-campus or default */}
            {bgTheme !== "classic" && (
              <div
                className="absolute inset-0 overflow-hidden transition-all duration-700 opacity-100 group/campus"
              >
                <img
                  src={uthCampusImg}
                  alt="UTH Campus Heritage"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-center scale-100 animate-kenburns"
                  style={{
                    imageRendering: "-webkit-optimize-contrast",
                    filter: "brightness(0.92) contrast(1.1) saturate(1.18)",
                  }}
                />
                {/* Royal Navy & Golden Hour Cinematic Blend Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#001d42]/65 via-[#002d62]/25 to-amber-500/15 mix-blend-multiply pointer-events-none" />
                
                {/* Clean edge gradient fade */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/40 pointer-events-none" />
              </div>
            )}

            {/* Theme: Bright Luxury Classic Royal Parchment & Gold Atmosphere */}
            {bgTheme === "classic" && (
              <div
                className="absolute inset-0 transition-all duration-700 overflow-hidden"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 35%, #FFFDF7 0%, #F8EED3 50%, #EBD8A3 100%)",
                }}
              >
                {/* Radiant Golden Light Centerpiece */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.32)_0%,rgba(179,135,40,0.12)_50%,transparent_75%)] rounded-full blur-3xl animate-pulse pointer-events-none" />
                {/* Subtle Decorative Royal Grid Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#b38728_1.2px,transparent_1.2px)] [background-size:28px_28px] opacity-20 pointer-events-none" />
              </div>
            )}

            {/* Soft subtle outer vignette */}
            <div className={`absolute inset-0 pointer-events-none z-1 ${bgTheme === "classic" ? "bg-gradient-to-b from-[#b38728]/10 via-transparent to-[#b38728]/15" : "bg-gradient-to-b from-black/20 via-transparent to-black/30"}`} />

            {bgTheme !== "classic" && <div className="stars" />}
          </div>

          {/* Invitation Card Container */}
          <div className="flex-1 flex items-center justify-center relative z-10 my-auto w-full">
            <InvitationCard
              config={config}
              guestName={guestName}
              isPrintable={true}
              bgTheme={bgTheme}
            />
          </div>

          {/* Floating Action Buttons */}
          {!isShared && (
            <div className="w-full max-w-2xl mx-auto flex justify-center gap-2 sm:gap-3 my-0.5 sm:my-1 relative z-20 no-print">
              <button
                onClick={() => setIsCustomizerOpen(true)}
                className="group flex items-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-full bg-white/90 backdrop-blur-md border border-accent/30 shadow-lg shadow-black/5 text-[#002d62] hover:bg-[#002d62] hover:text-white hover:border-[#002d62] transition-all duration-300 hover:shadow-xl hover:shadow-[#002d62]/15 active:scale-95 cursor-pointer font-bold"
              >
                <Settings className="w-3.5 h-3.5 text-accent group-hover:text-accent-light transition-colors" />
                <span className="text-[11px] font-semibold tracking-wide">
                  Tùy chỉnh & Theme
                </span>
              </button>

              <button
                onClick={() => setIsExportModalOpen(true)}
                className="group flex items-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#002d62] to-[#003a80] text-white border border-[#002d62]/50 shadow-lg shadow-[#002d62]/20 hover:shadow-xl hover:shadow-[#002d62]/30 transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-accent-light" />
                <span className="text-[11px] font-semibold tracking-wide">
                  Xuất PDF / In
                </span>
              </button>
            </div>
          )}

          {/* Configuration / Share drawer */}
          <Customizer
            config={config}
            onChange={setConfig}
            defaultGuest={guestName}
            bgTheme={bgTheme}
            onBgThemeChange={setBgTheme}
            isOpen={isCustomizerOpen}
            onClose={() => setIsCustomizerOpen(false)}
          />

          {/* Export PDF Modal */}
          <ExportModal
            isOpen={isExportModalOpen}
            onClose={() => setIsExportModalOpen(false)}
            config={config}
            onChange={setConfig}
            guestName={guestName}
            onGuestChange={setGuestName}
          />
        </div>
      )}
    </div>
  );
}
