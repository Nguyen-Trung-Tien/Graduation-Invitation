import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import confetti from "canvas-confetti";
import { useReducedMotion } from "framer-motion";
import {
  Settings,
  Printer,
  Eye,
  EyeOff,
  RotateCcw,
  Palette,
} from "lucide-react";
import Envelope from "./components/Envelope";
import InvitationCard from "./components/InvitationCard";
import Customizer from "./components/Customizer";
import ExportModal from "./components/ExportModal";
import uthCampusImg from "./assets/Hinh_UTH.jpg";
import { INVITATION_DEFAULTS } from "./config/invitationDefaults";

function parseTargetDateTime(dateStr, timeStr) {
  const cleanDate = (dateStr || "").replace(/\s*\(dự kiến\)/gi, "").trim();
  if (!cleanDate || cleanDate === "Đang cập nhật") return null;
  const d = new Date(cleanDate);
  if (isNaN(d.getTime())) return null;

  let hour = 16;
  let minute = 30;
  if (timeStr && timeStr.includes(":")) {
    const [h, m] = timeStr.split(":");
    const parsedH = parseInt(h, 10);
    const parsedM = parseInt(m, 10);
    if (!isNaN(parsedH)) hour = parsedH;
    if (!isNaN(parsedM)) minute = parsedM;
  }
  d.setHours(hour, minute, 0, 0);
  return d;
}

function CountdownPill({ date, time, bgTheme }) {
  const [now, setNow] = useState(() => Date.now());
  const target = parseTargetDateTime(date, time);

  useEffect(() => {
    if (!target) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!target) return null;

  const diff = target.getTime() - now;
  const expired = diff <= 0;
  const days = expired ? 0 : Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = expired ? 0 : Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = expired ? 0 : Math.floor((diff / (1000 * 60)) % 60);
  const seconds = expired ? 0 : Math.floor((diff / 1000) % 60);

  const isClassic = bgTheme === "classic";

  return (
    <div
      className={`no-print print:hidden inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full sm:backdrop-blur-md border shadow-[0_8px_24px_rgba(0,18,46,0.22),inset_0_1px_0_rgba(255,255,255,0.22)] text-[11px] sm:text-xs font-sans transition-colors duration-500 ${
        isClassic
          ? "bg-white/92 border-[#b38728]/40 text-[#002d62]"
          : "bg-[#001d42]/88 border-[#b38728]/45 text-[#f3e5ab]"
      }`}
    >
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        <span className="hidden sm:inline-flex animate-ping absolute h-full w-full rounded-full bg-[#dfb755] opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#dfb755]" />
      </span>
      {expired ? (
        <span className="font-semibold tracking-wide">
          Lễ Tốt Nghiệp đã / đang diễn ra
        </span>
      ) : (
        <div className="flex items-center gap-1 tabular-nums font-bold tracking-wide">
          <span className="opacity-75 font-medium text-[10px] uppercase tracking-wider hidden sm:inline mr-1">
            Sắp diễn ra
          </span>
          {[
            { v: days, u: "d" },
            { v: hours, u: "h" },
            { v: minutes, u: "m" },
            { v: seconds, u: "s", accent: true },
          ].map((item) => (
            <span
              key={item.u}
              className={`px-1.5 py-0.5 rounded-md text-[11px] leading-none ${
                isClassic ? "bg-[#002d62]/8" : "bg-white/10"
              } ${item.accent ? "text-[#dfb755]" : ""}`}
            >
              {String(item.v).padStart(2, "0")}
              <span className="opacity-70 font-medium ml-0.5">{item.u}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function getInitialStateFromUrl() {
  const defaults = INVITATION_DEFAULTS;

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
    sharedParam === "1",
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
      isExpectedDate: rawDate
        ? rawDate.includes("dự kiến")
        : defaults.config.isExpectedDate,
      time: time || defaults.config.time,
      isExpectedTime: time
        ? time.includes("dự kiến")
        : defaults.config.isExpectedTime,
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
  const prefersReducedMotion = useReducedMotion();

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

  const runViewTransition = (updateFn, focusSelector) => {
    if (
      typeof document === "undefined" ||
      !document.startViewTransition ||
      prefersReducedMotion
    ) {
      updateFn();
      if (focusSelector) {
        requestAnimationFrame(() =>
          document.querySelector(focusSelector)?.focus(),
        );
      }
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(updateFn);
    });

    if (focusSelector) {
      transition.finished.finally(() => {
        document.querySelector(focusSelector)?.focus();
      });
    }
  };

  const handleOpenEnvelope = () => {
    runViewTransition(() => {
      setIsCardHidden(false);
      setIsOpen(true);
    }, "#invitation-main-heading");

    // Single gentle celebratory confetti burst
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#b38728", "#ffffff", "#002d62"],
      disableForReducedMotion: true,
    });
  };

  const handleCloseEnvelope = () => {
    runViewTransition(() => {
      setIsOpen(false);
    });
  };

  const handleToggleTheme = () => {
    runViewTransition(() => {
      setBgTheme((prev) => (prev === "classic" ? "uth-campus" : "classic"));
    });
  };

  return (
    <div
      className={`relative min-h-dvh w-full flex flex-col justify-between ${
        !isOpen ? "overflow-hidden" : ""
      }`}
    >
      {/* Tap anywhere backdrop when card is hidden to restore */}
      {isCardHidden && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Hiện lại thiệp"
          onClick={() => setIsCardHidden(false)}
          className="fixed inset-0 z-35 cursor-pointer bg-transparent"
        />
      )}

      {/* Global Dynamic Background Layer (Isolated Composite Layer) */}
      <div
        className={`fixed inset-0 overflow-hidden pointer-events-none z-0 transition-all duration-700 ${
          bgTheme === "classic" ? "bg-[#F9F3E3]" : "bg-[#0b1329]"
        }`}
        style={{ contain: "strict", transform: "translateZ(0)" }}
      >
        {/* Campus Theme with Royal Navy & Golden Hour Blend */}
        {bgTheme !== "classic" && (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ transform: "translateZ(0)" }}
          >
            <img
              src={uthCampusImg}
              alt="UTH Campus Heritage"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-center scale-100 animate-kenburns transition-all duration-700"
              style={{
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            />
            {/* Royal Navy & Golden Hour Blend Overlay - Hardware-accelerated without mix-blend penalty */}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                isCardHidden
                  ? "opacity-0"
                  : "opacity-100 bg-gradient-to-tr from-[#001d42]/80 via-[#002d62]/40 to-amber-600/20"
              }`}
            />
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                isCardHidden
                  ? "opacity-0"
                  : "opacity-100 bg-gradient-to-r from-black/25 via-transparent to-black/40"
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

        {/* Ambient Golden Bokeh Orbs (Zero-blur radial gradients, desktop only) */}
        <div
          aria-hidden="true"
          className={`hidden sm:block absolute top-[14%] left-[10%] w-72 h-72 rounded-full bg-radial from-[#dfb755]/18 via-[#dfb755]/5 to-transparent pointer-events-none animate-float-slow transition-opacity duration-700 ${
            isCardHidden ? "opacity-0" : "opacity-100"
          }`}
        />
        <div
          aria-hidden="true"
          className={`hidden sm:block absolute bottom-[12%] right-[8%] w-80 h-80 rounded-full bg-radial from-[#003a80]/35 via-[#003a80]/10 to-transparent pointer-events-none animate-float-slow transition-opacity duration-700 ${
            isCardHidden ? "opacity-0" : "opacity-100"
          }`}
          style={{ animationDelay: "-4.5s" }}
        />

        {/* 2026 Volumetric Anamorphic Light Beam (Desktop only) */}
        <div
          aria-hidden="true"
          className={`hidden sm:block absolute -top-1/4 -left-1/4 w-[150%] h-64 bg-radial from-[#f3e5ab]/14 via-[#f3e5ab]/4 to-transparent pointer-events-none animate-anamorphic-beam transition-opacity duration-700 ${
            isCardHidden ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      {/* Floating Toggle Header (Top-Left - Only visible on the sealed envelope screen) */}
      {!isOpen && (
        <header className="fixed top-0 left-0 z-40 p-3 sm:p-4 pointer-events-none no-print">
          <button
            type="button"
            aria-label={isCardHidden ? "Hiện lại thư mời" : "Ẩn thư ngắm ảnh"}
            onClick={(e) => {
              e.stopPropagation();
              setIsCardHidden((prev) => !prev);
            }}
            className={`pointer-events-auto w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center backdrop-blur-md border shadow-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group ${
              isCardHidden
                ? "bg-[#002d62] text-white border-[#f3e5ab]/80 shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                : "bg-white/90 hover:bg-[#002d62] hover:text-white text-[#002d62] border-[#b38728]/40"
            }`}
            title={isCardHidden ? "Hiện lại thư mời" : "Ẩn thư ngắm ảnh"}
          >
            {isCardHidden ? (
              <EyeOff className="w-4 h-4 text-[#f3e5ab]" />
            ) : (
              <Eye className="w-4 h-4 text-[#b38728] group-hover:text-[#f3e5ab] transition-colors" />
            )}
          </button>
        </header>
      )}

      {!isOpen ? (
        /* Sealed Envelope Entrance */
        <Envelope
          guestName={guestName}
          bgTheme={bgTheme}
          onOpen={handleOpenEnvelope}
          isCardHidden={isCardHidden}
        />
      ) : (
        /* Main Invitation Content - Semantic Macro Layout with 8pt Grid */
        <main
          className={`flex-1 w-full max-w-7xl mx-auto flex flex-col justify-between items-center py-3 sm:py-5 px-4 sm:px-6 relative z-10 gap-3 sm:gap-4 transition-all duration-500 min-w-0 ${
            isCardHidden
              ? "opacity-0 scale-95 pointer-events-none select-none"
              : "opacity-100 scale-100"
          }`}
        >
          {/* Live Ceremony Countdown Pill */}
          <CountdownPill
            date={config.date}
            time={config.time}
            bgTheme={bgTheme}
          />

          {/* Card Presentation Section */}
          <section
            aria-label="Nội dung thiệp mời chính"
            className="w-full min-w-0 flex-1 flex items-center justify-center relative z-10 m-auto"
          >
            <InvitationCard
              config={config}
              guestName={guestName}
              isPrintable={true}
              bgTheme={bgTheme}
            />
          </section>

          {/* 2026 Liquid Glass Action Dock (Hidden in shared presentation mode) */}
          {!isShared && (
            <footer
              aria-label="Tùy chọn tương tác thiệp"
              className="w-auto max-w-full mx-auto flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-full liquid-glass-dock relative z-20 no-print"
            >
              <button
                type="button"
                onClick={() => setIsCustomizerOpen(true)}
                className="group flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full text-[#002d62] hover:bg-[#002d62] hover:text-white transition-all duration-200 active:scale-95 cursor-pointer font-semibold text-xs"
              >
                <Settings className="w-3.5 h-3.5 text-[#b38728] group-hover:text-[#f3e5ab] transition-colors" />
                <span>Tùy chỉnh</span>
              </button>

              <button
                type="button"
                onClick={() => setIsExportModalOpen(true)}
                className="group flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#002d62] to-[#003a80] text-white shadow-sm hover:shadow-md hover:brightness-110 transition-all duration-200 active:scale-95 cursor-pointer font-semibold text-xs"
              >
                <Printer className="w-3.5 h-3.5 text-[#f3e5ab]" />
                <span>Xuất PDF / In</span>
              </button>

              <button
                type="button"
                onClick={handleToggleTheme}
                title="Đổi nền thiệp"
                className="group flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-[#002d62] hover:bg-[#b38728]/15 transition-all duration-200 active:scale-95 cursor-pointer font-semibold text-xs"
              >
                <Palette className="w-3.5 h-3.5 text-[#b38728]" />
                <span className="hidden sm:inline">
                  {bgTheme === "classic" ? "Nền UTH" : "Nền Cổ Điển"}
                </span>
              </button>

              <button
                type="button"
                onClick={handleCloseEnvelope}
                title="Xem lại phong bì"
                className="group flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-[#002d62] hover:bg-[#b38728]/15 transition-all duration-200 active:scale-95 cursor-pointer font-semibold text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#b38728] group-hover:-rotate-45 transition-transform duration-300" />
                <span className="hidden sm:inline">Đóng bì</span>
              </button>
            </footer>
          )}
        </main>
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
