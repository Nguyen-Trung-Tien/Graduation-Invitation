import { useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Clock,
  GraduationCap,
  Sparkles,
  CalendarPlus,
  ExternalLink,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { getLetterPalette } from "../config/bgThemes";

/* ── 2026 Editorial Hairline Diamond Divider ── */
function GoldFlourish({ className = "" }) {
  return (
    <div
      className={`flex items-center justify-center gap-2 ${className}`}
      aria-hidden="true"
    >
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-current/60 to-current" />
      <span className="w-1.5 h-1.5 rotate-45 bg-current shrink-0 opacity-90" />
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-current/60 to-current" />
    </div>
  );
}

/* ── 2026 Minimalist Geometric Corner Tick ── */
function CornerOrnament({ position }) {
  const rotations = {
    "top-left": "rotate(0)",
    "top-right": "rotate(90deg)",
    "bottom-right": "rotate(180deg)",
    "bottom-left": "rotate(270deg)",
  };
  const positions = {
    "top-left": "top-2.5 left-2.5 sm:top-3 sm:left-3",
    "top-right": "top-2.5 right-2.5 sm:top-3 sm:right-3",
    "bottom-right": "bottom-2.5 right-2.5 sm:bottom-3 sm:right-3",
    "bottom-left": "bottom-2.5 left-2.5 sm:bottom-3 sm:left-3",
  };
  return (
    <svg
      viewBox="0 0 24 24"
      className={`absolute ${positions[position]} w-4 h-4 sm:w-5 sm:h-5 text-[#b38728]/70 pointer-events-none z-20`}
      style={{ transform: rotations[position] }}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 14 V4 C2 2.9 2.9 2 4 2 H14"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="5.5" cy="5.5" r="1" fill="currentColor" opacity="0.75" />
    </svg>
  );
}

/* ── University Emblem Crest Badge ── */
function UniversityCrest() {
  return (
    <div className="flex items-center justify-center gap-1.5 mb-0.5 no-print print:hidden">
      <div className="h-[1px] w-6 sm:w-12 bg-gradient-to-r from-transparent to-[#b38728]/60" />
      <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#001d42]/5 border border-[#b38728]/40 shadow-2xs">
        <GraduationCap className="w-3.5 h-3.5 text-[#002d62]" />
      </div>
      <div className="h-[1px] w-6 sm:w-12 bg-gradient-to-l from-transparent to-[#b38728]/60" />
    </div>
  );
}

export default function InvitationCard({
  config,
  guestName,
  isPrintable,
  hideCalendar = false,
  bgTheme = "uth-campus",
}) {
  const letterPalette = getLetterPalette(bgTheme);
  const prefersReducedMotion = useReducedMotion();
  const shouldStagger = !hideCalendar && !prefersReducedMotion;

  const revealProps = (delay = 0) =>
    shouldStagger
      ? {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay: delay * 0.5, ease: [0.16, 1, 0.3, 1] },
        }
      : {};
  const formatVietnameseDate = (dateStr) => {
    if (!dateStr || dateStr === "Đang cập nhật")
      return "Thứ Bảy, 26/12/2026";
    const cleanDateStr = dateStr.replace(/\s*\(dự kiến\)/gi, "").trim();
    try {
      const dateObj = new Date(cleanDateStr);
      if (isNaN(dateObj.getTime())) return dateStr;
      const days = [
        "Chủ Nhật",
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
      ];
      const day = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const year = dateObj.getFullYear();
      return `${days[dateObj.getDay()]}, ${day}/${month}/${year}`;
    } catch {
      return dateStr;
    }
  };

  const googleMapsUrl = "https://maps.app.goo.gl/SrCYzQdAPC5invdt8";

  // Google Calendar URL Generator
  const createGoogleCalendarUrl = () => {
    const title = encodeURIComponent(
      `Lễ Tốt Nghiệp ${config.degree || "Cử nhân"} ${config.gradName} - UTH`,
    );
    const details = encodeURIComponent(
      `Trân trọng kính mời ${guestName || "quý khách"} đến tham dự và chia vui cùng ${config.gradName} trong Lễ Tốt Nghiệp Ngành ${config.major}.\n\n` +
        `📌 Địa điểm: ${config.hall} - ${config.address}\n` +
        `🕒 Giờ khai mạc: ${config.time || "16:30"}\n\n` +
        `Lời chúc: "${config.invitationText || ""}"`,
    );
    const location = encodeURIComponent(`${config.hall}, ${config.address}`);

    let startDateStr = "20261226T163000";
    let endDateStr = "20261226T193000";

    const cleanDateStr = (config.date || "")
      .replace(/\s*\(dự kiến\)/gi, "")
      .trim();
    if (cleanDateStr && cleanDateStr !== "Đang cập nhật") {
      const d = new Date(cleanDateStr);
      if (!isNaN(d.getTime())) {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");

        let timeHour = "16";
        let timeMin = "30";
        if (config.time && config.time.includes(":")) {
          const parts = config.time.split(":");
          timeHour = parts[0].padStart(2, "0");
          timeMin = parts[1].slice(0, 2).padStart(2, "0");
        }

        startDateStr = `${yyyy}${mm}${dd}T${timeHour}${timeMin}00`;
        const endHour = String(
          Math.min(23, parseInt(timeHour, 10) + 3),
        ).padStart(2, "0");
        endDateStr = `${yyyy}${mm}${dd}T${endHour}${timeMin}00`;
      }
    }

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startDateStr}/${endDateStr}`;
  };

  const isExpectedDate = config.isExpectedDate !== false;
  const isExpectedTime = config.isExpectedTime !== false;

  const [tilt, setTilt] = useState({
    x: 0,
    y: 0,
    glareX: 50,
    glareY: 50,
    isHovered: false,
  });

  const handleMouseMove = useCallback(
    (e) => {
      if (hideCalendar) return;
      if (
        typeof window !== "undefined" &&
        (!window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      ) {
        return;
      }
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setTilt({
        x: (0.5 - y) * 6,
        y: (x - 0.5) * 6,
        glareX: x * 100,
        glareY: y * 100,
        isHovered: true,
      });
    },
    [hideCalendar],
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50, isHovered: false });
  }, []);

  return (
    <article
      id={isPrintable ? "printable-invitation" : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="@container invitation-card w-full max-w-[780px] mx-auto my-0.5 relative overflow-hidden text-slate-800 card-paper-texture shadow-2xl select-none"
      style={{
        "--card-paper-top": letterPalette.paperTop,
        "--card-paper-mid": letterPalette.paperMid,
        "--card-paper-bot": letterPalette.paperBot,
        "--card-accent-dark": letterPalette.accentDark,
        "--card-accent": letterPalette.accent,
        "--card-accent-mid": letterPalette.accentMid,
        borderRadius: "1.35rem",
        border: "1.5px solid rgba(179, 135, 40, 0.42)",
        boxShadow: tilt.isHovered
          ? "0 0 0 1px rgba(179, 135, 40, 0.3), 0 24px 50px rgba(0, 29, 66, 0.25), 0 8px 20px rgba(179, 135, 40, 0.18)"
          : "0 0 0 1px rgba(179, 135, 40, 0.18), 0 14px 36px rgba(0, 29, 66, 0.18), 0 4px 12px rgba(179, 135, 40, 0.12)",
        transform: tilt.isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.01, 1.01, 1.01)`
          : "translateZ(0)",
        transition: tilt.isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
        padding: "var(--card-pad-y) var(--card-pad-x)",
        isolation: "isolate",
        contain: "layout paint",
      }}
    >
      {/* 2026 Minimalist Corner Ticks */}
      <CornerOrnament position="top-left" />
      <CornerOrnament position="top-right" />
      <CornerOrnament position="bottom-left" />
      <CornerOrnament position="bottom-right" />

      {/* Crisp Editorial Inner Hairline Frame */}
      <div className="absolute inset-2 sm:inset-3 border border-[#b38728]/14 rounded-[1.05rem] pointer-events-none z-10" />

      {/* ════════════════ TIER 1: HEADER & TITLE ════════════════ */}
      <motion.header
        {...revealProps(0.06)}
        className="flex flex-col items-center text-center gap-0 pb-0.5 relative z-10"
      >
        <UniversityCrest />

        <p className="text-[clamp(0.5625rem,0.48rem+0.4cqi,0.65625rem)] tracking-[0.03em] @[480px]:tracking-wider font-sans font-extrabold text-[var(--card-accent)] uppercase leading-snug mt-0.5 text-balance">
          Đại Học Giao Thông Vận Tải TP. Hồ Chí Minh
        </p>

        <h1
          id={!hideCalendar ? "invitation-main-heading" : undefined}
          tabIndex={!hideCalendar ? -1 : undefined}
          className="text-[clamp(0.95rem,0.72rem+1.35cqi,1.375rem)] font-serif font-black uppercase tracking-[0.02em] @[480px]:tracking-wide leading-snug mt-1 @[480px]:mt-2 py-0.5 text-glow drop-shadow-xs inline-block bg-clip-text text-transparent foil-shimmer-text outline-none text-balance"
          style={{
            backgroundImage: `linear-gradient(135deg, ${letterPalette.accentDark} 0%, ${letterPalette.accentMid} 35%, ${letterPalette.gold} 50%, ${letterPalette.accentMid} 65%, ${letterPalette.accentDark} 100%)`,
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Thư Mời Dự Lễ Tốt Nghiệp
        </h1>

        {/* Flourish Divider */}
        <GoldFlourish className="w-36 sm:w-44 h-2.5 text-[#b38728] opacity-85 my-0.5" />
      </motion.header>

      {/* ════════════════ TIER 2: GUEST PERSONALIZATION ════════════════ */}
      <motion.section
        {...revealProps(0.14)}
        className="text-center py-0.5 relative z-10"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#b38728]/15 border border-[#b38728]/35 shadow-2xs mb-0.5">
          <Sparkles className="w-3 h-3 text-[#8b661b]" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#5c4308] font-extrabold font-sans">
            Trân Trọng Kính Mời
          </span>
          <Sparkles className="w-3 h-3 text-[#8b661b]" />
        </div>

        <h2
          className="text-[clamp(1.25rem,1.05rem+1.4cqi,1.5625rem)] font-handwriting text-[var(--card-accent)] font-normal leading-tight text-glow px-2 py-0"
          style={{ letterSpacing: "0.02em" }}
        >
          {guestName || "Toàn thể Đại gia đình"}
        </h2>
      </motion.section>

      {/* ════════════════ TIER 3: HERO GRADUATE CENTERPIECE (FOCAL POINT) ════════════════ */}
      <motion.section
        {...revealProps(0.22)}
        className="relative z-10 max-w-lg mx-auto my-0.5 @[480px]:my-1"
      >
        <div className="py-1.5 @[480px]:py-2.5 px-3 @[480px]:px-5 rounded-2xl flex flex-col items-center text-center gap-0.5 @[480px]:gap-1 relative overflow-hidden ceremony-watermark bento-card-surface">
          {/* Subtle Watermark Crest */}
          <GraduationCap
            aria-hidden="true"
            className="absolute -right-3 -bottom-3 w-20 h-20 sm:w-24 sm:h-24 text-[#b38728]/[0.05] pointer-events-none rotate-[-12deg]"
          />
          {/* Graduate Emblem Title */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[var(--card-accent)]/6 border border-[#b38728]/40">
            <GraduationCap className="w-3.5 h-3.5 text-[var(--card-accent)]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#5c4308] font-sans font-extrabold">
              Tân {config.degree || "Cử Nhân"}
            </span>
          </div>

          <h3 className="text-[clamp(1rem,0.85rem+1.4cqi,1.5rem)] font-serif font-black tracking-wide uppercase leading-tight text-[var(--card-accent-dark)] py-0 px-2 inline-block drop-shadow-xs text-balance">
            {config.gradName}
          </h3>

          {/* Academic Info */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-0.5 text-[11px] text-slate-800 font-medium max-w-full">
            <span className="inline-flex items-center justify-center gap-1.5 px-3 py-0.5 rounded-full bg-[var(--card-accent)]/8 border border-[var(--card-accent)]/20 shadow-2xs max-w-full text-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b38728] shrink-0" />
              <span>
                Ngành:{" "}
                <strong className="font-extrabold text-[var(--card-accent)]">
                  {config.major}
                </strong>
              </span>
            </span>
          </div>

          <p className="text-[9.5px] sm:text-[10.5px] uppercase tracking-wider text-[#5c4308] font-sans font-bold mt-0.5">
            Niên Khóa 2022 – 2026
          </p>

          {/* Golden Gradient Divider */}
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#b38728] to-transparent my-0.5" />

          {/* Personal Invitation Text */}
          <p className="text-[10.5px] sm:text-xs text-slate-700 leading-snug max-w-md italic px-1 font-serif whitespace-pre-line">
            <span className="text-[#b38728] font-serif font-bold text-xs sm:text-sm mr-0.5">
              “
            </span>
            {config.invitationText ||
              "Trân trọng kính mời gia đình đến chia vui cùng con trong buổi lễ tốt nghiệp."}
            <span className="text-[#b38728] font-serif font-bold text-xs sm:text-sm ml-0.5">
              ”
            </span>
          </p>
        </div>
      </motion.section>

      {/* ════════════════ TIER 4: LANDSCAPE BENTO GRID MODULES ════════════════ */}
      <motion.section
        {...revealProps(0.3)}
        className="my-0.5 @[480px]:my-1 relative z-10"
      >
        <div className="grid grid-cols-1 @[480px]:grid-cols-2 @[580px]:grid-cols-[1fr_1fr_auto] gap-1.5 @[480px]:gap-2 rounded-2xl overflow-hidden p-1 @[480px]:p-2 bento-card-surface">
          {/* TIME CARD */}
          <div className="min-w-0 p-2 @[480px]:p-3 rounded-xl bento-tile flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-1 @[480px]:pb-1.5 border-b border-[#b38728]/10">
                <h4 className="text-[10px] @[480px]:text-[10.5px] font-sans font-extrabold uppercase tracking-[0.14em] text-[#5c4308] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#b38728]" /> Thời Gian
                </h4>

                {!hideCalendar && (
                  <a
                    href={createGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-hit no-print calendar-btn print:hidden inline-flex items-center justify-center gap-1 h-7 px-2.5 text-[10.5px] @[580px]:text-[11px] font-bold text-[#002d62] bg-[#b38728]/15 hover:bg-[#b38728]/25 sm:hover:-translate-y-0.5 rounded-md border border-[#b38728]/35 transition-all duration-200 cursor-pointer no-underline active:scale-95 shadow-2xs shrink-0"
                    title="Thêm nhắc lịch Lễ Tốt Nghiệp vào Google Calendar"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-[#5c4308]" />
                    <span>Lưu Lịch</span>
                  </a>
                )}
              </div>

              <div className="space-y-0.5 @[480px]:space-y-1 mt-1 @[480px]:mt-1.5">
                <div className="flex items-start gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-[#b38728]/15 flex items-center justify-center shrink-0 border border-[#b38728]/25 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-[#5c4308]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider leading-none">
                      Ngày Diễn Ra
                    </p>
                    <p className="text-[11.5px] sm:text-xs font-extrabold text-[#002d62] mt-0.5 leading-snug">
                      {formatVietnameseDate(config.date)}
                      {isExpectedDate && (
                        <span className="text-[10.5px] text-amber-700 font-semibold italic whitespace-nowrap ml-1">
                          (dự kiến)
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-[#b38728]/15 flex items-center justify-center shrink-0 border border-[#b38728]/25 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-[#5c4308]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider leading-none">
                      Giờ Khai Mạc
                    </p>
                    <p className="text-[11.5px] sm:text-xs font-extrabold text-[#002d62] mt-0.5 leading-snug">
                      {config.time || "16:30"}
                      {isExpectedTime && (
                        <span className="text-[10.5px] text-amber-700 font-semibold italic whitespace-nowrap ml-1">
                          (dự kiến)
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LOCATION CARD */}
          <div className="min-w-0 p-2 @[480px]:p-3 rounded-xl bento-tile flex flex-col justify-between">
            <div>
              <h4 className="text-[10px] @[480px]:text-[10.5px] font-sans font-extrabold uppercase tracking-[0.14em] text-[#5c4308] flex items-center gap-1 pb-1 border-b border-[#b38728]/10 @[480px]:h-7">
                <MapPin className="w-3.5 h-3.5 text-[#b38728]" /> Địa Điểm
              </h4>

              <div className="space-y-0.5 @[480px]:space-y-1 mt-1 @[480px]:mt-1.5">
                <div className="flex items-start gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-[#002d62]/12 flex items-center justify-center shrink-0 border border-[#002d62]/25 mt-0.5">
                    <GraduationCap className="w-3.5 h-3.5 text-[#002d62]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider leading-none">
                      Hội Trường
                    </p>
                    <p className="text-[11.5px] sm:text-xs font-extrabold text-[#002d62] mt-0.5 leading-snug">
                      {config.hall}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-[#b38728]/15 flex items-center justify-center shrink-0 border border-[#b38728]/25 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#5c4308]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider leading-none">
                      Địa Chỉ
                    </p>
                    <p className="text-[11px] font-semibold text-slate-700 mt-0.5 leading-snug break-words">
                      {config.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QR MAP PASS CARD */}
          <div
            className={`min-w-0 @[480px]:col-span-2 @[580px]:col-span-1 py-1.5 px-2.5 @[480px]:py-2.5 @[480px]:px-3 @[580px]:p-3 rounded-xl bg-gradient-to-br ${letterPalette.qrGradient} border border-[#b38728]/55 text-white flex flex-row @[580px]:flex-col items-center justify-between @[580px]:justify-center gap-2 @[580px]:gap-2 shadow-[0_8px_20px_rgba(0,29,66,0.24),inset_0_1px_0_rgba(255,255,255,0.16)] @[580px]:w-32`}
          >
            {/* QR Code: Hidden when card container < 580px, Visible on Tablet/Desktop & 672px Export */}
            <div className="hidden @[580px]:flex items-center justify-center relative p-1.5 bg-white rounded-md border border-[#b38728]/45 shrink-0 shadow-xs">
              <span aria-hidden="true" className="no-print print:hidden absolute -top-0.5 -left-0.5 w-2 h-2 border-t-2 border-l-2 border-[#f3e5ab] rounded-tl-[2px]" />
              <span aria-hidden="true" className="no-print print:hidden absolute -top-0.5 -right-0.5 w-2 h-2 border-t-2 border-r-2 border-[#f3e5ab] rounded-tr-[2px]" />
              <span aria-hidden="true" className="no-print print:hidden absolute -bottom-0.5 -left-0.5 w-2 h-2 border-b-2 border-l-2 border-[#f3e5ab] rounded-bl-[2px]" />
              <span aria-hidden="true" className="no-print print:hidden absolute -bottom-0.5 -right-0.5 w-2 h-2 border-b-2 border-r-2 border-[#f3e5ab] rounded-br-[2px]" />
              <QRCodeSVG
                value={googleMapsUrl}
                size={52}
                bgColor="#ffffff"
                fgColor="#001d42"
                level="M"
                includeMargin={false}
              />
            </div>

            <div className="flex flex-row @[580px]:flex-col items-center justify-between @[580px]:justify-center gap-2 @[580px]:gap-1.5 w-full">
              <span className="text-[10px] @[580px]:text-[9.5px] uppercase tracking-wider font-extrabold text-[#f3e5ab] text-left @[580px]:text-center">
                Bản Đồ GPS
              </span>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-hit no-print print:hidden inline-flex items-center justify-center gap-1.5 h-8 px-3 text-[11px] font-extrabold text-[#001d42] bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] hover:brightness-110 sm:hover:-translate-y-0.5 rounded-lg transition-all duration-200 cursor-pointer uppercase tracking-wider no-underline shadow-xs font-sans whitespace-nowrap active:scale-95 shrink-0"
              >
                <span>Chỉ Đường</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ════════════════ FOOTER & SIGNATURE ════════════════ */}
      <motion.footer
        {...revealProps(0.36)}
        className="relative z-10 pt-0 @[480px]:pt-0.5 text-center"
      >
        <GoldFlourish className="w-32 @[480px]:w-36 h-2 @[480px]:h-2.5 text-[#b38728] opacity-80 mx-auto mb-0 @[480px]:mb-0.5" />
        <div className="text-[10.5px] sm:text-[11px] text-slate-600 font-sans leading-snug">
          <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5">
            <span>Trân trọng kính mời & đón tiếp •</span>
            <span className="font-extrabold text-[var(--card-accent)] italic text-[11px] sm:text-xs whitespace-nowrap">
              {config.gradName}
            </span>
          </p>
        </div>
      </motion.footer>
    </article>
  );
}
