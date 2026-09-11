import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Settings, Printer, Eye, EyeOff } from "lucide-react";
import Envelope from "./components/Envelope";
import InvitationCard from "./components/InvitationCard";
import Customizer from "./components/Customizer";
import ExportModal from "./components/ExportModal";
import uthCampusImg from "./assets/Hinh_UTH.jpg";

function getInitialStateFromUrl() {
  const defaults = {
    guestName: "Toàn thể Đại gia đình",
    bgTheme: "uth-campus",
    isShared: false,
    config: {
      gradName: "Nguyễn Trung Tiến",
      degree: "Cử nhân",
      major: "Công nghệ Thông tin",
      date: "2026-12-26",
      isExpectedDate: true,
      time: "16:30",
      isExpectedTime: true,
      hall: "Cơ sở chính (Cơ sở 1)",
      address: "Số 2 Võ Oanh, Thạnh Mỹ Tây, Hồ Chí Minh",
      invitationText:
        "Trân trọng kính mời gia đình đến chia vui cùng con trong buổi lễ tốt nghiệp.\nLưu ý: Khi tham gia lễ phải có vé tham gia (tối đa 5 vé)",
    },
  };

  if (typeof window === "undefined") {
    return defaults;
  }

  const params = new URLSearchParams(window.location.search);
  const guest = params.get("guest") || params.get("to");
  const name = params.get("name");
  const major = params.get("major");
  const degree = params.get("degree");
  const rawDate = params.get("date");
  const time = params.get("time");
  const hall = params.get("hall");
  const address = params.get("address");
  const text = params.get("text");
  const theme = params.get("theme");
  const sharedParam = params.get("shared");

  const isShared = Boolean(
    guest ||
      name ||
      major ||
      degree ||
      rawDate ||
      time ||
      hall ||
      address ||
      text ||
      theme ||
      sharedParam === "true" ||
      sharedParam === "1"
  );

  const cleanDate = rawDate
    ? rawDate.replace(/\s*\(dự kiến\)/gi, "").trim()
    : null;

  return {
    guestName: guest || defaults.guestName,
    bgTheme: theme || defaults.bgTheme,
    isShared,
    config: {
      gradName: name || defaults.config.gradName,
      degree: degree || defaults.config.degree,
      major: major || defaults.config.major,
      date: cleanDate || defaults.config.date,
      isExpectedDate: rawDate ? rawDate.includes("dự kiến") : defaults.config.isExpectedDate,
      time: time || defaults.config.time,
      isExpectedTime: time ? time.includes("dự kiến") : defaults.config.isExpectedTime,
      hall: hall || defaults.config.hall,
      address: address || defaults.config.address,
      invitationText: text || defaults.config.invitationText,
    },
  };
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isCardHidden, setIsCardHidden] = useState(false);

  // Lazy initialize state from URL query parameters
  const [initialData] = useState(getInitialStateFromUrl);
  const [config, setConfig] = useState(initialData.config);
  const [guestName, setGuestName] = useState(initialData.guestName);
  const [bgTheme, setBgTheme] = useState(initialData.bgTheme);
  const isShared = initialData.isShared;

  // Restore card on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isCardHidden) {
        setIsCardHidden(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCardHidden]);

  const handleOpenEnvelope = () => {
    setIsOpen(true);

    // Single gentle celebratory confetti burst
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#b38728", "#ffffff", "#002d62"],
      disableForReducedMotion: true,
    });
  };

  return (
    <div
      onClick={() => {
        if (isCardHidden) setIsCardHidden(false);
      }}
      className={`relative min-h-dvh w-full flex flex-col justify-between ${
        !isOpen ? "overflow-hidden" : "overflow-x-hidden"
      } ${isCardHidden ? "cursor-pointer" : ""}`}
    >
      {/* Global Dynamic Background Layer */}
      <div
        className={`fixed inset-0 overflow-hidden pointer-events-none z-0 transition-all duration-700 ${
          bgTheme === "classic" ? "bg-[#F9F3E3]" : "bg-[#0b1329]"
        }`}
      >
        {/* Campus Theme with Royal Navy & Golden Hour Blend */}
        {bgTheme !== "classic" && (
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={uthCampusImg}
              alt="UTH Campus Heritage"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-center scale-100 animate-kenburns transition-all duration-700"
              style={{
                filter: isCardHidden
                  ? "brightness(1) contrast(1.02) saturate(1.06)"
                  : "brightness(0.92) contrast(1.1) saturate(1.18)",
              }}
            />
            {/* Royal Navy & Golden Hour Blend Overlay - Fades out completely when hidden so full photo shows */}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                isCardHidden
                  ? "opacity-0"
                  : "opacity-100 bg-gradient-to-tr from-[#001d42]/65 via-[#002d62]/25 to-amber-500/15 mix-blend-multiply"
              }`}
            />
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                isCardHidden
                  ? "opacity-0"
                  : "opacity-100 bg-gradient-to-r from-black/20 via-transparent to-black/40"
              }`}
            />
          </div>
        )}

        {/* Classic Royal Parchment & Gold Atmosphere */}
        {bgTheme === "classic" && (
          <div
            className="absolute inset-0 transition-all duration-700 overflow-hidden"
            style={{
              background:
                "radial-gradient(ellipse at 50% 35%, #FFFDF7 0%, #F8EED3 50%, #EBD8A3 100%)",
            }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.32)_0%,rgba(179,135,40,0.12)_50%,transparent_75%)] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#b38728_1.2px,transparent_1.2px)] [background-size:28px_28px] opacity-20 pointer-events-none" />
          </div>
        )}

        <div
          className={`stars transition-opacity duration-700 ${
            isCardHidden ? "opacity-20" : "opacity-100"
          }`}
        />
      </div>

      {/* Floating Toggle Button (Top-Left, Icon only) */}
      <button
        type="button"
        aria-label={isCardHidden ? "Hiện lại thư mời" : "Ẩn thư ngắm ảnh"}
        onClick={(e) => {
          e.stopPropagation();
          setIsCardHidden((prev) => !prev);
        }}
        className={`fixed top-[max(0.75rem,env(safe-area-inset-top))] left-[max(0.75rem,env(safe-area-inset-left))] sm:top-4 sm:left-4 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-md border shadow-lg shadow-black/15 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer no-print group ${
          isCardHidden
            ? "bg-[#002d62] text-white border-[#f3e5ab]/80 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            : "bg-white/90 hover:bg-[#002d62] hover:text-white text-[#002d62] border-[#b38728]/45"
        }`}
        title={isCardHidden ? "Hiện lại thư mời" : "Ẩn thư ngắm ảnh"}
      >
        {isCardHidden ? (
          <EyeOff className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#f3e5ab]" />
        ) : (
          <Eye className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#b38728] group-hover:text-[#f3e5ab] transition-colors" />
        )}
      </button>

      {!isOpen ? (
        /* Sealed Envelope Entrance */
        <Envelope
          guestName={guestName}
          bgTheme={bgTheme}
          onOpen={handleOpenEnvelope}
          isCardHidden={isCardHidden}
        />
      ) : (
        /* Main Invitation Content */
        <div
          className={`flex-1 w-full flex flex-col justify-center items-center py-1 sm:py-2 px-1.5 sm:px-3 relative z-10 animate-[fadeIn_0.7s_ease-out] gap-1 transition-all duration-500 ${
            isCardHidden
              ? "opacity-0 scale-95 pointer-events-none select-none"
              : "opacity-100 scale-100"
          }`}
        >
          <main className="w-full flex items-center justify-center relative z-10 my-auto">
            <InvitationCard
              config={config}
              guestName={guestName}
              isPrintable={true}
              bgTheme={bgTheme}
            />
          </main>

          {/* Ceremonial Action Buttons */}
          {!isShared && (
            <div className="w-full max-w-xl mx-auto flex flex-wrap justify-center gap-2 sm:gap-3 my-0.5 relative z-20 no-print">
              <button
                type="button"
                onClick={() => setIsCustomizerOpen(true)}
                className="group flex items-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#b38728]/40 shadow-lg shadow-black/5 text-[#002d62] hover:bg-[#002d62] hover:text-white hover:border-[#002d62] transition-all duration-300 hover:shadow-xl hover:shadow-[#002d62]/15 active:scale-95 cursor-pointer font-bold"
              >
                <Settings className="w-3.5 h-3.5 text-[#b38728] group-hover:text-[#f3e5ab] transition-colors" />
                <span className="text-xs font-semibold tracking-wide">
                  Tùy chỉnh thiệp
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIsExportModalOpen(true)}
                className="group flex items-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#002d62] to-[#003a80] text-white border border-[#002d62]/50 shadow-lg shadow-[#002d62]/20 hover:shadow-xl hover:shadow-[#002d62]/30 transition-all duration-300 active:scale-95 cursor-pointer font-bold"
              >
                <Printer className="w-3.5 h-3.5 text-[#f3e5ab]" />
                <span className="text-xs font-semibold tracking-wide">
                  Xuất PDF / In
                </span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Configuration Drawer */}
      <Customizer
        config={config}
        onChange={setConfig}
        defaultGuest={guestName}
        bgTheme={bgTheme}
        onBgThemeChange={setBgTheme}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
      />

      {/* Export PDF & Image Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        config={config}
        onChange={setConfig}
        guestName={guestName}
        onGuestChange={setGuestName}
      />
    </div>
  );
}
