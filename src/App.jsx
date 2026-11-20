import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import confetti from "canvas-confetti";
import { useReducedMotion, motion, AnimatePresence } from "framer-motion";
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
import uthSunsetImg from "./assets/Hinh_UTH1.jpg";
import uthAerialImg from "./assets/University of Transport Ho Chi Minh City – UTH.jpg";
import uthMemoryImg from "./assets/1000011633-9970-7187.jpg";
import { INVITATION_DEFAULTS } from "./config/invitationDefaults";
import {
  getBgTheme,
  getNextBgThemeId,
  isValidBgTheme,
} from "./config/bgThemes";

const PHOTO_THEMES = {
  "uth-campus": {
    src: uthCampusImg,
    alt: "UTH Campus Heritage",
    primaryOverlay: "bg-gradient-to-tr from-[#001430]/90 via-[#00224d]/58 to-amber-900/35",
    secondaryOverlay: "bg-gradient-to-r from-black/35 via-black/15 to-black/45 backdrop-blur-[2px]",
  },
  "uth-sunset": {
    src: uthSunsetImg,
    alt: "UTH Campus Sunset",
    primaryOverlay: "bg-gradient-to-tr from-[#2b0f16]/85 via-[#4a1c1a]/50 to-amber-700/35",
    secondaryOverlay: "bg-gradient-to-r from-black/30 via-transparent to-black/40 backdrop-blur-[1.5px]",
  },
  "uth-aerial": {
    src: uthAerialImg,
    alt: "UTH Campus Aerial View",
    primaryOverlay: "bg-gradient-to-tr from-[#04142b]/88 via-[#0a2a54]/52 to-amber-800/30",
    secondaryOverlay: "bg-gradient-to-b from-black/30 via-transparent to-black/45 backdrop-blur-[1.5px]",
  },
  "uth-memory": {
    src: uthMemoryImg,
    alt: "UTH Youth Memory",
    primaryOverlay: "bg-gradient-to-tr from-[#1c120d]/88 via-[#3d291c]/52 to-amber-900/30",
    secondaryOverlay: "bg-gradient-to-r from-black/35 via-black/10 to-black/40 backdrop-blur-[1.5px]",
  },
};

const GRAPHIC_THEMES = {
  classic: {
    baseBg: "radial-gradient(ellipse at 50% 35%, #FFFDF7 0%, #F8EED3 50%, #EBD8A3 100%)",
    glows: [
      {
        className:
          "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[750px] sm:h-[750px]",
        bg: "radial-gradient(circle at center, rgba(212,175,55,0.28) 0%, rgba(179,135,40,0.1) 48%, transparent 72%)",
      },
    ],
    patternStyle: {
      backgroundImage: "radial-gradient(#b38728 1.2px, transparent 1.2px)",
      backgroundSize: "28px 28px",
    },
    patternOpacity: "opacity-20",
  },
  "midnight-gold": {
    baseBg: "radial-gradient(ellipse at 50% 18%, #162856 0%, #0a1430 48%, #030612 100%)",
    glows: [
      {
        className: "-inset-x-1/4 top-[10%] h-[55%] -rotate-12",
        bg: "radial-gradient(ellipse at 50% 50%, rgba(223,183,85,0.16) 0%, rgba(179,135,40,0.06) 42%, transparent 72%)",
      },
      {
        className: "-top-24 -right-20 w-[420px] h-[420px] sm:w-[680px] sm:h-[680px]",
        bg: "radial-gradient(circle at center, rgba(243,229,171,0.22) 0%, rgba(212,175,55,0.06) 45%, transparent 72%)",
      },
      {
        className: "-bottom-32 -left-24 w-[440px] h-[440px] sm:w-[700px] sm:h-[700px]",
        bg: "radial-gradient(circle at center, rgba(47,96,204,0.24) 0%, rgba(20,45,110,0.08) 48%, transparent 72%)",
      },
    ],
    patternStyle: {
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24 0L48 24L24 48L0 24Z' fill='none' stroke='%23f3e5ab' stroke-width='0.8'/%3E%3Ccircle cx='24' cy='24' r='1.5' fill='%23f3e5ab'/%3E%3C/svg%3E\")",
      backgroundSize: "48px 48px",
    },
    patternOpacity: "opacity-[0.07]",
    vignette: "radial-gradient(circle at center, transparent 45%, rgba(2,4,12,0.68) 100%)",
  },
  "emerald-academic": {
    baseBg: "radial-gradient(ellipse at 50% 30%, #0d523f 0%, #063327 48%, #021712 100%)",
    glows: [
      {
        className:
          "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] sm:w-[860px] sm:h-[860px]",
        bg: "radial-gradient(circle at center, rgba(223,183,85,0.2) 0%, rgba(179,135,40,0.07) 44%, transparent 70%)",
      },
      {
        className: "-top-28 -left-24 w-[420px] h-[420px] sm:w-[640px] sm:h-[640px]",
        bg: "radial-gradient(circle at center, rgba(32,168,128,0.18) 0%, transparent 68%)",
      },
    ],
    patternStyle: {
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0M-10 10L10 -10M30 50L50 30' stroke='%23dfb755' stroke-width='0.75'/%3E%3Ccircle cx='20' cy='20' r='1.2' fill='%23dfb755'/%3E%3C/svg%3E\")",
      backgroundSize: "40px 40px",
    },
    patternOpacity: "opacity-[0.06]",
    vignette: "radial-gradient(circle at center, transparent 45%, rgba(1,14,10,0.72) 100%)",
  },
  "royal-burgundy": {
    baseBg: "radial-gradient(ellipse at 50% 25%, #66132d 0%, #3b0818 50%, #160208 100%)",
    glows: [
      {
        className:
          "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] sm:w-[840px] sm:h-[840px]",
        bg: "radial-gradient(circle at center, rgba(243,229,171,0.18) 0%, rgba(196,145,55,0.07) 44%, transparent 70%)",
      },
      {
        className: "-top-24 -right-24 w-[420px] h-[420px] sm:w-[640px] sm:h-[640px]",
        bg: "radial-gradient(circle at center, rgba(185,45,88,0.22) 0%, transparent 68%)",
      },
    ],
    patternStyle: {
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg width='52' height='52' viewBox='0 0 52 52' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='26' cy='26' r='18' fill='none' stroke='%23f3e5ab' stroke-width='0.6'/%3E%3Cpath d='M26 8v36M8 26h36' stroke='%23f3e5ab' stroke-width='0.45' stroke-dasharray='2 4'/%3E%3C/svg%3E\")",
      backgroundSize: "52px 52px",
    },
    patternOpacity: "opacity-[0.06]",
    vignette: "radial-gradient(circle at center, transparent 42%, rgba(12,1,5,0.75) 100%)",
  },
  "obsidian-cyber": {
    baseBg: "radial-gradient(ellipse at 50% 20%, #12294a 0%, #081426 52%, #030710 100%)",
    glows: [
      {
        className: "-top-24 -right-20 w-[440px] h-[440px] sm:w-[700px] sm:h-[700px]",
        bg: "radial-gradient(circle at center, rgba(56,189,248,0.18) 0%, rgba(14,116,144,0.06) 46%, transparent 72%)",
      },
      {
        className: "-bottom-28 -left-20 w-[440px] h-[440px] sm:w-[700px] sm:h-[700px]",
        bg: "radial-gradient(circle at center, rgba(223,183,85,0.16) 0%, transparent 68%)",
      },
    ],
    patternStyle: {
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M44 0H0v44' fill='none' stroke='%2338bdf8' stroke-width='0.6'/%3E%3Ccircle cx='0' cy='0' r='1.6' fill='%23dfb755'/%3E%3C/svg%3E\")",
      backgroundSize: "44px 44px",
    },
    patternOpacity: "opacity-[0.09]",
    vignette: "radial-gradient(circle at center, transparent 45%, rgba(2,5,12,0.72) 100%)",
  },
  "sakura-ivory": {
    baseBg:
      "radial-gradient(ellipse at 35% 25%, #FFFDFB 0%, #FCEEF3 45%, #F4D2E0 85%, #EAC0D2 100%)",
    glows: [
      {
        className: "-top-24 -left-20 w-[440px] h-[440px] sm:w-[700px] sm:h-[700px]",
        bg: "radial-gradient(circle at center, rgba(255,248,235,0.9) 0%, rgba(248,214,180,0.28) 48%, transparent 72%)",
      },
      {
        className: "-bottom-24 -right-20 w-[460px] h-[460px] sm:w-[740px] sm:h-[740px]",
        bg: "radial-gradient(circle at center, rgba(232,135,172,0.28) 0%, rgba(218,120,158,0.1) 48%, transparent 72%)",
      },
    ],
    patternStyle: {
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg width='72' height='72' viewBox='0 0 72 72' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 14c3-4 8-3 9 1 1 4-3 8-7 7-3-1-4-5-2-8z' fill='%23d87a9e' fill-opacity='0.55'/%3E%3Cpath d='M54 46c4-2 8 1 7 5-1 4-6 6-9 3-2-2-1-6 2-8z' fill='%23e598b5' fill-opacity='0.5'/%3E%3Ccircle cx='46' cy='18' r='1.3' fill='%23b38728' fill-opacity='0.45'/%3E%3Ccircle cx='16' cy='54' r='1.1' fill='%23b38728' fill-opacity='0.35'/%3E%3C/svg%3E\")",
      backgroundSize: "72px 72px",
    },
    patternOpacity: "opacity-[0.14]",
    vignette: "radial-gradient(circle at center, transparent 55%, rgba(210,145,172,0.22) 100%)",
  },
  "sky-horizon": {
    baseBg:
      "radial-gradient(ellipse at 40% 20%, #FFFFFF 0%, #E7F3FD 45%, #CBE3F9 85%, #B4D5F4 100%)",
    glows: [
      {
        className: "-top-24 left-1/4 w-[480px] h-[480px] sm:w-[760px] sm:h-[760px]",
        bg: "radial-gradient(circle at center, rgba(255,252,240,0.92) 0%, rgba(253,230,178,0.22) 45%, transparent 70%)",
      },
      {
        className: "-bottom-28 -right-20 w-[440px] h-[440px] sm:w-[700px] sm:h-[700px]",
        bg: "radial-gradient(circle at center, rgba(96,165,250,0.22) 0%, transparent 68%)",
      },
    ],
    patternStyle: {
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 10l2 6 6 2-6 2-2 6-2-6-6-2 6-2z' fill='%23002d62' fill-opacity='0.14'/%3E%3Ccircle cx='12' cy='48' r='1.2' fill='%23b38728' fill-opacity='0.35'/%3E%3C/svg%3E\")",
      backgroundSize: "64px 64px",
    },
    patternOpacity: "opacity-[0.25]",
    vignette: "radial-gradient(circle at center, transparent 55%, rgba(147,197,253,0.25) 100%)",
  },
  "lavender-mist": {
    baseBg:
      "radial-gradient(ellipse at 40% 25%, #FCFAFF 0%, #F2E9FB 48%, #E1CEF5 88%, #D4BCEF 100%)",
    glows: [
      {
        className: "-top-24 -left-20 w-[440px] h-[440px] sm:w-[700px] sm:h-[700px]",
        bg: "radial-gradient(circle at center, rgba(255,252,248,0.92) 0%, rgba(233,213,255,0.3) 48%, transparent 72%)",
      },
      {
        className: "-bottom-24 -right-20 w-[460px] h-[460px] sm:w-[740px] sm:h-[740px]",
        bg: "radial-gradient(circle at center, rgba(167,139,250,0.24) 0%, transparent 70%)",
      },
    ],
    patternStyle: {
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg width='56' height='56' viewBox='0 0 56 56' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 18l3 7 7 3-7 3-3 7-3-7-7-3 7-3z' fill='none' stroke='%238b5cf6' stroke-opacity='0.28' stroke-width='0.8'/%3E%3Ccircle cx='10' cy='10' r='1.1' fill='%23b38728' fill-opacity='0.35'/%3E%3C/svg%3E\")",
      backgroundSize: "56px 56px",
    },
    patternOpacity: "opacity-[0.3]",
    vignette: "radial-gradient(circle at center, transparent 55%, rgba(167,139,250,0.22) 100%)",
  },
};

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

  const isLightBg = getBgTheme(bgTheme).isLight;

  return (
    <div
      className={`no-print print:hidden inline-flex items-center gap-1.5 sm:gap-2.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full sm:backdrop-blur-md border shadow-[0_8px_24px_rgba(0,18,46,0.22),inset_0_1px_0_rgba(255,255,255,0.22)] text-[10px] sm:text-xs font-sans transition-colors duration-500 max-w-full ${
        isLightBg
          ? "bg-white/92 border-[#b38728]/40 text-[#002d62]"
          : "bg-[#001d42]/88 border-[#b38728]/45 text-[#f3e5ab]"
      }`}
    >
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        <span className="inline-flex animate-ping absolute h-full w-full rounded-full bg-[#dfb755] opacity-75" />
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
                isLightBg ? "bg-[#002d62]/8" : "bg-white/10"
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
    bgTheme: isValidBgTheme(theme) ? theme : defaults.bgTheme,
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
    setIsCardHidden(false);
    setIsOpen(true);

    requestAnimationFrame(() => {
      document.querySelector("#invitation-main-heading")?.focus({ preventScroll: true });
    });

    // Delay confetti slightly so the first entrance frame composites cleanly without flicker
    setTimeout(() => {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
      confetti({
        particleCount: isMobile ? 45 : 80,
        spread: isMobile ? 60 : 75,
        origin: { y: 0.62 },
        colors: ["#dfb755", "#f3e5ab", "#ffffff", "#002d62"],
        disableForReducedMotion: true,
      });
    }, 180);
  };

  const handleCloseEnvelope = () => {
    setIsOpen(false);
  };

  const activeTheme = getBgTheme(bgTheme);
  const photoTheme = PHOTO_THEMES[bgTheme];
  const graphicTheme = GRAPHIC_THEMES[bgTheme];

  const handleToggleTheme = () => {
    runViewTransition(() => {
      setBgTheme((prev) => getNextBgThemeId(prev));
    });
  };

  return (
    <div
      className={`relative min-h-dvh w-full flex flex-col justify-between overflow-x-hidden ${
        !isOpen ? "overflow-y-auto" : ""
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
        className={`fixed inset-0 overflow-hidden pointer-events-none z-0 transition-all duration-700 ${activeTheme.baseBgClass}`}
        style={{ contain: "strict", transform: "translateZ(0)" }}
      >
        {/* Photo-based UTH Campus Themes */}
        {photoTheme && (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ transform: "translateZ(0)" }}
          >
            <img
              src={photoTheme.src}
              alt={photoTheme.alt}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-center scale-100 animate-kenburns transition-all duration-700"
              style={{
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            />
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                isCardHidden ? "opacity-0" : `opacity-100 ${photoTheme.primaryOverlay}`
              }`}
            />
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                isCardHidden ? "opacity-0" : `opacity-100 ${photoTheme.secondaryOverlay}`
              }`}
            />
          </div>
        )}

        {/* Data-Driven Atmospheric Graphic Themes */}
        {graphicTheme && (
          <div
            className="absolute inset-0 transition-all duration-700 overflow-hidden"
            style={{ background: graphicTheme.baseBg }}
          >
            {graphicTheme.glows.map((glow, idx) => (
              <div
                key={idx}
                className={`absolute rounded-full pointer-events-none ${glow.className}`}
                style={{ background: glow.bg }}
              />
            ))}
            <div
              className={`absolute inset-0 pointer-events-none ${graphicTheme.patternOpacity}`}
              style={graphicTheme.patternStyle}
            />
            {graphicTheme.vignette && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: graphicTheme.vignette }}
              />
            )}
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
            className="touch-hit pointer-events-auto w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-black/35 hover:bg-black/50 backdrop-blur-md text-white border border-white/20 shadow-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {isCardHidden ? (
              <EyeOff className="w-4 h-4 text-[#f3e5ab]" aria-hidden="true" />
            ) : (
              <Eye className="w-4 h-4 text-[#f3e5ab]" aria-hidden="true" />
            )}
          </button>
        </header>
      )}

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Sealed Envelope Entrance */
          <Envelope
            key="envelope"
            guestName={guestName}
            bgTheme={bgTheme}
            onOpen={handleOpenEnvelope}
            isCardHidden={isCardHidden}
          />
        ) : (
          /* Main Invitation Content - Zero-Scroll Single-Viewport Layout */
          <motion.main
            key="invitation"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`flex-1 w-full max-w-7xl mx-auto flex flex-col justify-between items-center pt-[max(0.35rem,env(safe-area-inset-top))] pb-[max(0.35rem,env(safe-area-inset-bottom))] sm:pt-[max(0.875rem,env(safe-area-inset-top))] sm:pb-[max(0.875rem,env(safe-area-inset-bottom))] px-3 sm:px-6 relative z-10 gap-1 sm:gap-2.5 min-w-0 ${
              isCardHidden
                ? "opacity-0 scale-95 pointer-events-none select-none"
                : ""
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
              className="w-auto max-w-full mx-auto flex flex-wrap sm:flex-nowrap items-center justify-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full liquid-glass-dock relative z-20 no-print"
            >
              <button
                type="button"
                onClick={() => setIsCustomizerOpen(true)}
                className="touch-hit group h-8 sm:h-9 flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 rounded-full text-[#002d62] hover:bg-[#002d62] hover:text-white transition-all duration-200 active:scale-95 cursor-pointer font-semibold text-[11px] sm:text-xs whitespace-nowrap"
              >
                <Settings className="w-3.5 h-3.5 text-[#b38728] group-hover:text-[#f3e5ab] transition-colors shrink-0" />
                <span>Tùy chỉnh</span>
              </button>

              <button
                type="button"
                onClick={() => setIsExportModalOpen(true)}
                className="touch-hit group h-8 sm:h-9 flex items-center justify-center gap-1 sm:gap-1.5 px-3 sm:px-4 rounded-full bg-gradient-to-r from-[#002d62] to-[#003a80] text-white shadow-sm hover:shadow-md hover:brightness-110 transition-all duration-200 active:scale-95 cursor-pointer font-semibold text-[11px] sm:text-xs whitespace-nowrap"
              >
                <Printer className="w-3.5 h-3.5 text-[#f3e5ab] shrink-0" />
                <span>Xuất PDF / In</span>
              </button>

              <button
                type="button"
                onClick={handleToggleTheme}
                title={`Đổi nền thiệp (hiện tại: ${activeTheme.shortName})`}
                aria-label="Đổi nền thiệp"
                className="touch-hit group w-8 h-8 sm:w-auto sm:h-9 flex items-center justify-center gap-1.5 sm:px-3 rounded-full text-[#002d62] hover:bg-[#b38728]/15 transition-all duration-200 active:scale-95 cursor-pointer font-semibold text-[11px] sm:text-xs whitespace-nowrap"
              >
                <Palette className="w-3.5 h-3.5 text-[#b38728] shrink-0" />
                <span className="hidden sm:inline">{activeTheme.shortName}</span>
              </button>

              <button
                type="button"
                onClick={handleCloseEnvelope}
                title="Xem lại phong bì"
                aria-label="Xem lại phong bì"
                className="touch-hit group w-8 h-8 sm:w-auto sm:h-9 flex items-center justify-center gap-1.5 sm:px-3 rounded-full text-[#002d62] hover:bg-[#b38728]/15 transition-all duration-200 active:scale-95 cursor-pointer font-semibold text-[11px] sm:text-xs whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#b38728] group-hover:-rotate-45 transition-transform duration-300 shrink-0" />
                <span className="hidden sm:inline">Đóng bì</span>
              </button>
            </footer>
          )}
          </motion.main>
        )}
      </AnimatePresence>

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
