import React, { useState, useRef } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  GraduationCap,
  Sparkles,
  Award,
  CalendarPlus,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

/* ── Reusable SVG Art Deco / Royal Gold Flourish ── */
function GoldFlourish({ className = "" }) {
  return (
    <svg viewBox="0 0 300 24" className={className} fill="none">
      <path
        d="M150 12 C125 12, 110 3, 80 3 C50 3, 35 12, 15 12 C8 12, 3 9, 0 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M150 12 C175 12, 190 3, 220 3 C250 3, 265 12, 285 12 C292 12, 297 9, 300 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="150" cy="12" r="3.5" fill="currentColor" />
      <circle cx="80" cy="3" r="2" fill="currentColor" opacity="0.85" />
      <circle cx="220" cy="3" r="2" fill="currentColor" opacity="0.85" />
      <path d="M150 4 L153 12 L150 20 L147 12 Z" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

/* ── Intricate Royal Corner Ornament (Mobile Responsive) ── */
function CornerOrnament({ position }) {
  const rotations = {
    "top-left": "rotate(0)",
    "top-right": "rotate(90deg)",
    "bottom-right": "rotate(180deg)",
    "bottom-left": "rotate(270deg)",
  };
  const positions = {
    "top-left": "top-2 left-2 sm:top-3 sm:left-3",
    "top-right": "top-2 right-2 sm:top-3 sm:right-3",
    "bottom-right": "bottom-2 right-2 sm:bottom-3 sm:right-3",
    "bottom-left": "bottom-2 left-2 sm:bottom-3 sm:left-3",
  };
  return (
    <svg
      viewBox="0 0 50 50"
      className={`absolute ${positions[position]} w-7 h-7 sm:w-10 sm:h-10 text-[#b38728] pointer-events-none z-20 opacity-90`}
      style={{ transform: rotations[position] }}
      fill="none"
    >
      {/* Outer corner frame */}
      <path
        d="M3 28 V7 C3 4.8 4.8 3 7 3 H28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Inner ornamental filigree */}
      <path
        d="M9 20 V11 C9 9.9 9.9 9 11 9 H20"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M3 16 Q16 16, 16 3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.65"
      />
      <circle cx="3" cy="28" r="2.2" fill="currentColor" />
      <circle cx="28" cy="3" r="2.2" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

/* ── University Emblem Crest Badge ── */
function UniversityCrest() {
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 no-print">
      <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#b38728]/60" />
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#001d42]/5 border border-[#b38728]/40 shadow-xs backdrop-blur-xs">
        <GraduationCap className="w-4 h-4 text-[#002d62]" />
      </div>
      <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#b38728]/60" />
    </div>
  );
}

export default function InvitationCard({ config, guestName, isPrintable }) {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
    shineX: 50,
    shineY: 50,
    isHovered: false,
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 640) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -3; // Subtle -3 to 3 deg tilt
    const rotateY = ((x - centerX) / centerX) * 3;

    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.008, 1.008, 1)`,
      shineX,
      shineY,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      shineX: 50,
      shineY: 50,
      isHovered: false,
    });
  };

  const formatVietnameseDate = (dateStr) => {
    if (!dateStr || dateStr === "Đang cập nhật") return "Chủ Nhật, ngày 26 tháng 07 năm 2026";
    try {
      const dateObj = new Date(dateStr);
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
      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear();
      return `${days[dateObj.getDay()]}, ngày ${day} tháng ${month} năm ${year}`;
    } catch {
      return dateStr;
    }
  };

  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Truong+Dai+hoc+Giao+thong+van+tai+TPHCM+02+Vo+Oanh";

  // Google Calendar URL Generator
  const createGoogleCalendarUrl = () => {
    const title = encodeURIComponent(
      `Lễ Tốt Nghiệp Tân Cử Nhân ${config.gradName} - UTH`
    );
    const details = encodeURIComponent(
      `Trân trọng kính mời ${guestName || "quý khách"} đến tham dự và chia vui cùng Tân Cử Nhân ${config.gradName} trong Lễ Tốt Nghiệp Ngành ${config.major}.\n\n` +
      `📌 Địa điểm: ${config.hall} - ${config.address}\n` +
      `🕒 Giờ khai mạc: ${config.time || "07:30"}\n\n` +
      `Lời chúc: "${config.invitationText || ""}"`
    );
    const location = encodeURIComponent(`${config.hall}, ${config.address}`);

    let startDateStr = "20260726T073000";
    let endDateStr = "20260726T113000";

    if (config.date && config.date !== "Đang cập nhật") {
      const d = new Date(config.date);
      if (!isNaN(d.getTime())) {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        startDateStr = `${yyyy}${mm}${dd}T073000`;
        endDateStr = `${yyyy}${mm}${dd}T113000`;
      }
    }

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startDateStr}/${endDateStr}`;
  };

  return (
    <div
      ref={cardRef}
      id={isPrintable ? "printable-invitation" : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="invitation-card w-full max-w-2xl mx-auto my-1 sm:my-2 relative overflow-hidden text-slate-800 transition-all duration-300 ease-out card-paper-texture shadow-2xl"
      style={{
        borderRadius: "1.25rem",
        border: "3px solid rgba(179, 135, 40, 0.45)",
        boxShadow: tiltStyle.isHovered
          ? "0 25px 60px rgba(0, 29, 66, 0.35), 0 0 25px rgba(212, 175, 55, 0.35)"
          : "0 0 0 1px rgba(212,175,55,0.3), 0 20px 48px rgba(0,29,66,0.28), 0 6px 18px rgba(212,175,55,0.22)",
        padding: "clamp(1rem, 2.2vh, 1.75rem) clamp(1.25rem, 3vw, 2rem)",
        transform: tiltStyle.transform,
      }}
    >
      {/* Dynamic Gold Shimmer Spot Follower */}
      {tiltStyle.isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 320px at ${tiltStyle.shineX}% ${tiltStyle.shineY}%, rgba(255, 245, 205, 0.28) 0%, rgba(212, 175, 55, 0.08) 50%, transparent 80%)`,
          }}
        />
      )}

      {/* Royal Corner Ornaments */}
      <CornerOrnament position="top-left" />
      <CornerOrnament position="top-right" />
      <CornerOrnament position="bottom-left" />
      <CornerOrnament position="bottom-right" />

      {/* Multi-layered Double Gold Foil Inner Border Frame */}
      <div className="absolute inset-2.5 sm:inset-3 border-2 border-[#b38728]/35 rounded-xl pointer-events-none z-10" />
      <div className="absolute inset-[13px] sm:inset-[16px] border border-[#b38728]/20 rounded-lg pointer-events-none z-10" />

      {/* ════════════════ TIER 1: HEADER & TITLE ════════════════ */}
      <div className="flex flex-col items-center text-center gap-0.5 pb-0.5 relative z-10">
        <UniversityCrest />

        <p className="text-[9.5px] sm:text-[10.5px] tracking-[0.26em] font-sans font-extrabold text-[#002d62] uppercase leading-none mt-0.5">
          Đại Học Giao Thông Vận Tải TP.Hồ Chí Minh
        </p>

        <h1
          className="text-xl sm:text-2xl md:text-3xl font-serif font-black uppercase tracking-[0.07em] leading-snug py-1 text-glow drop-shadow-md inline-block"
          style={{
            background:
              "linear-gradient(135deg, #001d42 0%, #003a80 40%, #8b661b 75%, #001d42 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Thư Mời Dự Lễ Tốt Nghiệp
        </h1>

        {/* Flourish Divider */}
        <GoldFlourish className="w-40 sm:w-48 h-3.5 text-[#b38728] opacity-90 my-0.5" />
      </div>

      {/* ════════════════ TIER 2: GUEST PERSONALIZATION ════════════════ */}
      <div className="text-center py-1 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#b38728]/12 border border-[#b38728]/30 shadow-2xs mb-1">
          <Sparkles className="w-3 h-3 text-[#b38728]" />
          <span className="text-[9px] uppercase tracking-[0.26em] text-[#7a5c10] font-extrabold font-sans">
            Trân Trọng Kính Mời
          </span>
          <Sparkles className="w-3 h-3 text-[#b38728]" />
        </div>

        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-handwriting text-[#002d62] font-normal leading-tight text-glow px-2 py-0.5 drop-shadow-xs"
          style={{ letterSpacing: "0.03em", wordSpacing: "0.1em" }}
        >
          {guestName || "Toàn thể Đại gia đình"}
        </h2>
      </div>

      {/* ════════════════ TIER 3: HERO GRADUATE CENTERPIECE (FOCAL POINT) ════════════════ */}
      <div className="relative z-10 max-w-lg mx-auto my-1.5">
        <div
          className="py-3 sm:py-3.5 px-3 sm:px-6 rounded-xl flex flex-col items-center text-center gap-1.5 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(254,250,242,0.95) 100%)",
            border: "1.5px solid rgba(179,135,40,0.4)",
            boxShadow:
              "0 8px 26px rgba(0,29,66,0.08), 0 0 0 1px rgba(255,255,255,0.8), inset 0 1px 0 rgba(255,255,255,0.95)",
          }}
        >
          {/* Graduation Cap Badge with Spinning Dash */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center relative bg-[#002d62]/10 border border-[#b38728]/50 shadow-xs">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#b38728]/50 animate-[spin_25s_linear_infinite]" />
            <GraduationCap className="w-5 h-5 text-[#002d62] relative z-10" />
          </div>

          {/* Graduate Info Focal Point */}
          <div>
            <span className="text-[9px] uppercase tracking-[0.24em] text-[#7a5c10] font-sans font-extrabold block mb-0.5">
              ✦ Tân Cử Nhân ✦
            </span>

            <h3 className="text-2xl sm:text-3xl font-serif font-black tracking-wide uppercase leading-snug text-[#001d42] pt-1 pb-0.5 px-2 inline-block drop-shadow-xs">
              {config.gradName}
            </h3>

            {/* Academic Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-1.5 text-[10.5px] text-slate-800 font-medium">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#002d62]/8 border border-[#002d62]/20 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b38728]" />
                Ngành:{" "}
                <span className="font-extrabold text-[#002d62]">{config.major}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#002d62]/8 border border-[#002d62]/20 shadow-2xs">
                <Award className="w-3 h-3 text-[#b38728]" />
                Học vị:{" "}
                <span className="font-extrabold text-[#002d62]">
                  {config.degree || "Cử nhân"}
                </span>
              </span>
            </div>

            <p className="text-[9px] uppercase tracking-[0.24em] text-[#7a5c10] font-sans font-bold mt-1.5">
              Niên Khóa 2022 – 2026
            </p>
          </div>

          {/* Golden Gradient Divider */}
          <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#b38728] to-transparent my-0.5" />

          {/* Personal Invitation Text */}
          <p className="text-[11px] sm:text-[11.5px] text-slate-700 leading-[1.55] max-w-md italic px-1 font-serif">
            <span className="text-[#b38728] font-serif font-bold text-base mr-0.5">“</span>
            {config.invitationText ||
              "Trân trọng kính mời gia đình đến chia vui cùng con trong buổi lễ tốt nghiệp."}
            <span className="text-[#b38728] font-serif font-bold text-base ml-0.5">”</span>
          </p>
        </div>
      </div>

      {/* ════════════════ EVENT DETAILS MODULES ════════════════ */}
      <div className="my-1.5 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-1.5">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#b38728]/40" />
          <span className="text-[9px] sm:text-[10px] font-sans font-extrabold uppercase tracking-[0.22em] text-[#7a5c10] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#b38728]" /> Thông Tin Lễ Tốt Nghiệp
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#b38728]/40" />
        </div>

        {/* Modular Grid Layout: 2 Columns on Mobile, 3 Columns on Desktop */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_1fr_auto] gap-1.5 sm:gap-2 rounded-xl overflow-hidden p-1.5 sm:p-2"
          style={{
            background: "rgba(255,255,255,0.94)",
            border: "1.5px solid rgba(179,135,40,0.35)",
            boxShadow: "0 4px 18px rgba(0,29,66,0.06)",
          }}
        >
          {/* TIME CARD WITH GOOGLE CALENDAR ADD */}
          <div className="p-2.5 sm:p-3 rounded-lg bg-gradient-to-b from-[#fdfbf7] to-[#f7f2e6] border border-[#b38728]/25 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-1 border-b border-[#b38728]/20">
                <h5 className="text-[9px] sm:text-[9.5px] font-sans font-extrabold uppercase tracking-[0.16em] text-[#7a5c10] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#b38728]" /> Thời Gian
                </h5>

                {/* Google Calendar Link Button */}
                <a
                  href={createGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-print inline-flex items-center gap-1 text-[8px] font-bold text-[#002d62] bg-[#b38728]/15 hover:bg-[#b38728]/25 px-2 py-0.5 rounded border border-[#b38728]/30 transition-all cursor-pointer no-underline active:scale-95"
                  title="Thêm nhắc lịch Lễ Tốt Nghiệp vào Google Calendar"
                >
                  <CalendarPlus className="w-2.8 h-2.8 text-[#7a5c10]" />
                  <span>Lưu Lịch</span>
                </a>
              </div>

              <div className="space-y-2 mt-1.5">
                <div className="flex items-start gap-2">
                  <div className="w-6.5 h-6.5 rounded-md bg-[#b38728]/15 flex items-center justify-center shrink-0 border border-[#b38728]/25">
                    <Calendar className="w-3.5 h-3.5 text-[#7a5c10]" />
                  </div>
                  <div>
                    <p className="text-[7.5px] sm:text-[8px] text-slate-500 font-bold uppercase tracking-wider">
                      Ngày Diễn Ra
                    </p>
                    <p className="text-[11px] sm:text-xs font-extrabold text-[#002d62] mt-0.5 leading-tight">
                      {formatVietnameseDate(config.date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-6.5 h-6.5 rounded-md bg-[#b38728]/15 flex items-center justify-center shrink-0 border border-[#b38728]/25">
                    <Clock className="w-3.5 h-3.5 text-[#7a5c10]" />
                  </div>
                  <div>
                    <p className="text-[7.5px] sm:text-[8px] text-slate-500 font-bold uppercase tracking-wider">
                      Giờ Khai Mạc
                    </p>
                    <p className="text-[11px] sm:text-xs font-extrabold text-[#002d62] mt-0.5">
                      {config.time || "07:30 Sáng"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LOCATION CARD */}
          <div className="p-2.5 sm:p-3 rounded-lg bg-gradient-to-b from-[#fdfbf7] to-[#f7f2e6] border border-[#b38728]/25 flex flex-col justify-between">
            <div>
              <h5 className="text-[9px] sm:text-[9.5px] font-sans font-extrabold uppercase tracking-[0.16em] text-[#7a5c10] flex items-center gap-1 pb-1 border-b border-[#b38728]/20">
                <MapPin className="w-3 h-3 text-[#b38728]" /> Địa Điểm
              </h5>

              <div className="space-y-2 mt-1.5">
                <div className="flex items-start gap-2">
                  <div className="w-6.5 h-6.5 rounded-md bg-[#002d62]/12 flex items-center justify-center shrink-0 border border-[#002d62]/25">
                    <GraduationCap className="w-3.5 h-3.5 text-[#002d62]" />
                  </div>
                  <div>
                    <p className="text-[7.5px] sm:text-[8px] text-slate-500 font-bold uppercase tracking-wider">
                      Hội Trường
                    </p>
                    <p className="text-[11px] sm:text-xs font-extrabold text-[#002d62] mt-0.5">
                      {config.hall}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-6.5 h-6.5 rounded-md bg-[#b38728]/15 flex items-center justify-center shrink-0 border border-[#b38728]/25">
                    <MapPin className="w-3.5 h-3.5 text-[#7a5c10]" />
                  </div>
                  <div>
                    <p className="text-[7.5px] sm:text-[8px] text-slate-500 font-bold uppercase tracking-wider">
                      Địa Chỉ Chi Tiết
                    </p>
                    <p className="text-[10.5px] sm:text-[11px] font-bold text-slate-700 mt-0.5 leading-snug">
                      {config.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QR MAP PASS CARD (HORIZONTAL STRIP ON MOBILE) */}
          <div className="p-2.5 sm:p-3 rounded-lg bg-gradient-to-b from-[#001d42] via-[#002654] to-[#002d62] border border-[#b38728]/50 text-white flex flex-row md:flex-col items-center justify-between sm:justify-center gap-2 shadow-md sm:col-span-2 md:col-span-1 md:w-34">
            <div className="p-1.5 bg-white rounded-lg border-2 border-[#b38728] shadow-inner shrink-0">
              <QRCodeSVG
                value={googleMapsUrl}
                size={64}
                bgColor="#ffffff"
                fgColor="#001d42"
                level="M"
                includeMargin={false}
              />
            </div>

            <div className="flex flex-col items-end sm:items-center gap-1.5">
              <span className="text-[8px] uppercase tracking-[0.2em] font-extrabold text-[#f3e5ab] text-center">
                Bản Đồ GPS
              </span>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="no-print text-[9px] font-extrabold text-[#001d42] bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] hover:brightness-110 px-3 py-1 rounded-md transition-all cursor-pointer uppercase tracking-wider no-underline shadow-sm font-sans whitespace-nowrap active:scale-95 flex items-center gap-1"
              >
                <span>Chỉ Đường</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════ FOOTER & SIGNATURE ════════════════ */}
      <div className="relative z-10 pt-1 text-center">
        <GoldFlourish className="w-40 h-4 text-[#b38728] opacity-85 mx-auto mb-1" />
        <div className="text-[9.5px] text-slate-600 font-sans">
          <p>
            Trân trọng kính mời & đón tiếp •{" "}
            <span className="font-extrabold text-[#002d62] italic text-[10.5px]">
              Nguyễn Trung Tiến
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

