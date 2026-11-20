import { useState, useEffect, useRef } from "react";
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
      className={`no-print print:hidden inline-flex items-center gap-1.5 sm:gap-2.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full sm:backdrop-blur-md border shadow-[0_8px_24px_rgba(0,18,46,0.22),inset_0_1px_0_rgba(255,255,255,0.22)] text-[10px] sm:text-xs font-sans transition-colors duration-500 max-w-full ${
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

const FRIEND_INVITATION_TEXT =
  "Trân trọng kính mời bạn đến chung vui và lưu lại những khoảnh khắc đáng nhớ cùng mình trong ngày tốt nghiệp.";

function sanitizeQueryParam(value, maxLength = 140) {
  if (!value || typeof value !== "string") return "";
  const cleaned = Array.from(value)
    .filter((ch) => {
      const code = ch.charCodeAt(0);
      return code >= 32 && code !== 127 && ch !== "<" && ch !== ">";
    })
    .join("");
  return cleaned.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function getInitialStateFromUrl() {
  const defaults = INVITATION_DEFAULTS;

  if (typeof window === "undefined") {
    return defaults;
  }

  const params = new URLSearchParams(window.location.search);
  const guest = sanitizeQueryParam(params.get("to") || params.get("guest"), 80);
  const mode = sanitizeQueryParam(params.get("mode"), 20).toLowerCase();
  const name = sanitizeQueryParam(params.get("name"), 80);
  const major = sanitizeQueryParam(params.get("major"), 80);
  const degree = sanitizeQueryParam(params.get("degree"), 40);
  const rawDate = sanitizeQueryParam(params.get("date"), 40);
  const time = sanitizeQueryParam(params.get("time"), 20);
  const hall = sanitizeQueryParam(params.get("hall"), 100);
  const address = sanitizeQueryParam(params.get("address"), 160);
  const text = sanitizeQueryParam(params.get("text"), 300);
  const theme = sanitizeQueryParam(params.get("theme"), 30);
  const sharedParam = params.get("shared");

  const isFriendMode = mode === "friend";
  const isShared = Boolean(
    guest ||
    isFriendMode ||
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

  const resolvedInvitationText =
    text || (isFriendMode ? FRIEND_INVITATION_TEXT : defaults.config.invitationText);

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
      invitationText: resolvedInvitationText,
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
  const hasPlayedIntroConfetti = useRef(false);

  // Play a gentle ~2s gold & navy confetti celebration once on initial page load
  useEffect(() => {
    if (hasPlayedIntroConfetti.current || prefersReducedMotion) return;
    hasPlayedIntroConfetti.current = true;

    const colors = ["#b38728", "#dfb755", "#f3e5ab", "#002d62", "#001d42"];
    const duration = 2000;
    const endTime = Date.now() + duration;
    let rafId = 0;
    let lastTick = 0;

    const frame = (now) => {
      if (now - lastTick >= 220) {
        lastTick = now;
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 50,
          origin: { x: 0.05, y: 0.65 },
          colors,
          scalar: 0.9,
          disableForReducedMotion: true,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 50,
          origin: { x: 0.95, y: 0.65 },
          colors,
          scalar: 0.9,
          disableForReducedMotion: true,
        });
      }
      if (Date.now() < endTime) {
        rafId = requestAnimationFrame(frame);
      }
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [prefersReducedMotion]);

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

    // Single gentle celebratory confetti burst (tuned for mobile 60fps)
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    confetti({
      particleCount: isMobile ? 45 : 80,
      spread: isMobile ? 60 : 75,
      origin: { y: 0.62 },
      colors: ["#dfb755", "#f3e5ab", "#ffffff", "#002d62"],
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
      className={`relative min-h-dvh w-full flex flex-col justify-between overflow-x-hidden ${
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
                  : "opacity-100 bg-gradient-to-tr from-[#001430]/90 via-[#00224d]/58 to-amber-900/35"
              }`}
            />
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                isCardHidden
                  ? "opacity-0"
                  : "opacity-100 bg-gradient-to-r from-black/35 via-black/15 to-black/45 backdrop-blur-[2px]"
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
            <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.28)_0%,rgba(179,135,40,0.1)_48%,transparent_72%)] rounded-full pointer-events-none" />
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
        <header className="fixed top-0 left-0 z-40 p-3 sm:p-4 pt-[max(0.75rem,env(safe-area-inset-top))] pl-[max(0.75rem,env(safe-area-inset-left))] pointer-events-none no-print">
          <button
            type="button"
            aria-label={isCardHidden ? "Hiện thiệp" : "Xem ảnh nền"}
            title={isCardHidden ? "Hiện thiệp" : "Xem ảnh nền"}
            onClick={(e) => {
              e.stopPropagation();
              setIsCardHidden((prev) => !prev);
            }}
            className="pointer-events-auto w-11 h-11 rounded-full flex items-center justify-center bg-black/35 hover:bg-black/50 backdrop-blur-md text-white border border-white/20 shadow-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {isCardHidden ? (
              <EyeOff className="w-4 h-4 text-[#f3e5ab]" aria-hidden="true" />
            ) : (
              <Eye className="w-4 h-4 text-[#f3e5ab]" aria-hidden="true" />
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
        /* Main Invitation Content - Zero-Scroll Single-Viewport Layout */
        <main
          className={`flex-1 w-full max-w-7xl mx-auto flex flex-col justify-between items-center pt-[max(0.45rem,env(safe-area-inset-top))] pb-[max(0.45rem,env(safe-area-inset-bottom))] sm:py-3.5 px-3 sm:px-6 relative z-10 gap-1.5 sm:gap-2.5 transition-all duration-500 min-w-0 ${
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
              className="w-auto max-w-full mx-auto flex flex-nowrap items-center justify-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full liquid-glass-dock relative z-20 no-print"
            >
              <button
                type="button"
                onClick={() => setIsCustomizerOpen(true)}
                className="group min-h-[38px] sm:min-h-[40px] flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-[#002d62] hover:bg-[#002d62] hover:text-white transition-all duration-200 active:scale-95 cursor-pointer font-semibold text-[11px] sm:text-xs whitespace-nowrap"
              >
                <Settings className="w-3.5 h-3.5 text-[#b38728] group-hover:text-[#f3e5ab] transition-colors" />
                <span>Tùy chỉnh</span>
              </button>

              <button
                type="button"
                onClick={() => setIsExportModalOpen(true)}
                className="group min-h-[38px] sm:min-h-[40px] flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-[#002d62] to-[#003a80] text-white shadow-sm hover:shadow-md hover:brightness-110 transition-all duration-200 active:scale-95 cursor-pointer font-semibold text-[11px] sm:text-xs whitespace-nowrap"
              >
                <Printer className="w-3.5 h-3.5 text-[#f3e5ab]" />
                <span>Xuất PDF / In</span>
              </button>

              <button
                type="button"
                onClick={handleToggleTheme}
                title="Đổi nền thiệp"
                aria-label="Đổi nền thiệp"
                className="group min-h-[38px] min-w-[38px] sm:min-h-[40px] sm:min-w-[40px] flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[#002d62] hover:bg-[#b38728]/15 transition-all duration-200 active:scale-95 cursor-pointer font-semibold text-[11px] sm:text-xs whitespace-nowrap"
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
                aria-label="Xem lại phong bì"
                className="group min-h-[38px] min-w-[38px] sm:min-h-[40px] sm:min-w-[40px] flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[#002d62] hover:bg-[#b38728]/15 transition-all duration-200 active:scale-95 cursor-pointer font-semibold text-[11px] sm:text-xs whitespace-nowrap"
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
