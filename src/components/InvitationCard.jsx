import React from "react";
import { MapPin, Calendar, Clock, GraduationCap, Sparkles, Award } from "lucide-react";
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
      <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#b38728]/50" />
      <div className="flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#001d42]/5 border border-[#b38728]/30 shadow-xs">
        <GraduationCap className="w-3.5 h-3.5 text-[#002d62]" />
      </div>
      <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#b38728]/50" />
    </div>
  );
}

export default function InvitationCard({ config, guestName, isPrintable }) {
  const formatVietnameseDate = (dateStr) => {
    if (!dateStr) return "Ngày ... tháng ... năm 2026";
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

  return (
    <div
      id={isPrintable ? "printable-invitation" : undefined}
      className="invitation-card w-full max-w-2xl mx-auto my-1 sm:my-2 relative overflow-hidden text-slate-800 transition-all duration-500 card-paper-texture shadow-2xl"
      style={{
        borderRadius: "1.25rem",
        border: "3px solid rgba(179, 135, 40, 0.45)",
        boxShadow:
          "0 0 0 1px rgba(212,175,55,0.3), 0 20px 48px rgba(0,29,66,0.28), 0 6px 18px rgba(212,175,55,0.22)",
        padding: "clamp(1rem, 2.2vh, 1.75rem) clamp(1.25rem, 3vw, 2rem)",
      }}
    >
      {/* Royal Corner Ornaments */}
      <CornerOrnament position="top-left" />
      <CornerOrnament position="top-right" />
      <CornerOrnament position="bottom-left" />
      <CornerOrnament position="bottom-right" />

      {/* Multi-layered Double Gold Foil Inner Border Frame */}
      <div className="absolute inset-2.5 sm:inset-3 border-2 border-[#b38728]/30 rounded-xl pointer-events-none z-10" />
      <div className="absolute inset-[13px] sm:inset-[16px] border border-[#b38728]/15 rounded-lg pointer-events-none z-10" />

      {/* ════════════════ TIER 1: HEADER & TITLE ════════════════ */}
      <div className="flex flex-col items-center text-center gap-0.5 pb-0.5 relative z-10">
        <UniversityCrest />

        <p className="text-[9.5px] sm:text-[10.5px] tracking-[0.26em] font-sans font-extrabold text-[#002d62] uppercase leading-none">
          Đại Học Giao Thông Vận Tải TP.Hồ Chí Minh
        </p>

        <h1
          className="text-xl sm:text-2xl md:text-3xl font-serif font-black uppercase tracking-[0.06em] leading-snug py-1 drop-shadow-xs inline-block"
          style={{
            background:
              "linear-gradient(135deg, #001d42 0%, #003a80 50%, #001d42 100%)",
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
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#b38728]/10 border border-[#b38728]/25 mb-1">
          <Sparkles className="w-2.5 h-2.5 text-[#b38728]" />
          <span className="text-[8.5px] sm:text-[9px] uppercase tracking-[0.26em] text-[#7a5c10] font-bold font-sans">
            Trân Trọng Kính Mời
          </span>
          <Sparkles className="w-2.5 h-2.5 text-[#b38728]" />
        </div>

        <h2
          className="text-xl sm:text-2xl md:text-3xl font-handwriting text-[#002d62] font-normal leading-tight text-glow px-2"
          style={{ letterSpacing: "0.04em", wordSpacing: "0.12em" }}
        >
          {guestName || "Toàn thể Đại gia đình"}
        </h2>
      </div>

      {/* ════════════════ TIER 3: HERO GRADUATE CENTERPIECE ════════════════ */}
      <div className="relative z-10 max-w-lg mx-auto my-1.5">
        <div
          className="py-2.5 sm:py-3 px-3 sm:px-5 rounded-xl flex flex-col items-center text-center gap-1.5 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(253,248,238,0.92) 100%)",
            border: "1.5px solid rgba(179,135,40,0.35)",
            boxShadow:
              "0 8px 24px rgba(0,29,66,0.07), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}
        >
          {/* Graduation Cap Badge */}
          <div className="w-9 h-9 rounded-full flex items-center justify-center relative bg-[#002d62]/10 border border-[#b38728]/40 shadow-xs">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#b38728]/40 animate-[spin_25s_linear_infinite]" />
            <GraduationCap className="w-4.5 h-4.5 text-[#002d62] relative z-10" />
          </div>

          {/* Graduate Info */}
          <div>
            <span className="text-[8.5px] uppercase tracking-[0.22em] text-[#7a5c10] font-sans font-bold block mb-0.5">
              Tân Cử Nhân
            </span>

            <h3
              className="text-xl sm:text-2xl font-serif font-black tracking-wide uppercase leading-snug text-glow pt-1.5 pb-0.5 px-1 inline-block"
              style={{
                background:
                  "linear-gradient(135deg, #b38728 0%, #002d62 60%, #b38728 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {config.gradName}
            </h3>

            {/* Academic Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-1.5 text-[10px] text-slate-800 font-medium">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#002d62]/8 border border-[#002d62]/15">
                <span className="w-1.2 h-1.2 rounded-full bg-[#b38728]" />
                Ngành:{" "}
                <span className="font-extrabold text-[#002d62]">{config.major}</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#002d62]/8 border border-[#002d62]/15">
                <span className="w-1.2 h-1.2 rounded-full bg-[#b38728]" />
                Học vị:{" "}
                <span className="font-extrabold text-[#002d62]">
                  {config.degree || "Cử nhân"}
                </span>
              </span>
            </div>

            <p className="text-[8.5px] uppercase tracking-[0.22em] text-[#7a5c10] font-sans font-bold mt-1">
              Niên Khóa 2022 – 2026
            </p>
          </div>

          {/* Golden Gradient Divider */}
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#b38728] to-transparent my-0.5" />

          {/* Personal Invitation Text */}
          <p className="text-[10.5px] sm:text-[11px] text-slate-700 leading-[1.5] max-w-md italic px-1 font-serif">
            <span className="text-[#b38728] font-serif font-bold text-sm">“</span>
            {config.invitationText ||
              "Trân trọng kính mời gia đình đến chia vui cùng con trong buổi lễ tốt nghiệp."}
            <span className="text-[#b38728] font-serif font-bold text-sm">”</span>
          </p>
        </div>
      </div>

      {/* ════════════════ EVENT DETAILS MODULES ════════════════ */}
      <div className="my-1.5 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-1.5">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#b38728]/35" />
          <span className="text-[8.5px] sm:text-[9.5px] font-sans font-extrabold uppercase tracking-[0.22em] text-[#7a5c10] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#b38728]" /> Thông Tin Lễ Tốt Nghiệp
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#b38728]/35" />
        </div>

        {/* Modular Grid Layout: 2 Columns on Mobile, 3 Columns on Desktop */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_1fr_auto] gap-1.5 sm:gap-2 rounded-xl overflow-hidden p-1.5 sm:p-2"
          style={{
            background: "rgba(255,255,255,0.92)",
            border: "1.5px solid rgba(179,135,40,0.3)",
            boxShadow: "0 4px 18px rgba(0,29,66,0.05)",
          }}
        >
          {/* TIME CARD */}
          <div className="p-2 sm:p-2.5 rounded-lg bg-gradient-to-b from-[#fdfbf7] to-[#f7f2e6] border border-[#b38728]/20 flex flex-col justify-between">
            <h5 className="text-[8.5px] sm:text-[9px] font-sans font-extrabold uppercase tracking-[0.16em] text-[#7a5c10] flex items-center gap-1 pb-1 border-b border-[#b38728]/15">
              <Clock className="w-3 h-3 text-[#b38728]" /> Thời Gian
            </h5>

            <div className="space-y-1.5 mt-1">
              <div className="flex items-start gap-1.5 sm:gap-2">
                <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-md bg-[#b38728]/12 flex items-center justify-center shrink-0 border border-[#b38728]/20">
                  <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#7a5c10]" />
                </div>
                <div>
                  <p className="text-[7px] sm:text-[7.5px] text-slate-500 font-bold uppercase tracking-wider">
                    Ngày Diễn Ra
                  </p>
                  <p className="text-[10.5px] sm:text-xs font-extrabold text-[#002d62] mt-0.5 leading-tight">
                    {formatVietnameseDate(config.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-1.5 sm:gap-2">
                <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-md bg-[#b38728]/12 flex items-center justify-center shrink-0 border border-[#b38728]/20">
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#7a5c10]" />
                </div>
                <div>
                  <p className="text-[7px] sm:text-[7.5px] text-slate-500 font-bold uppercase tracking-wider">
                    Giờ Khai Mạc
                  </p>
                  <p className="text-[10.5px] sm:text-xs font-extrabold text-[#002d62] mt-0.5">
                    {config.time}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* LOCATION CARD */}
          <div className="p-2 sm:p-2.5 rounded-lg bg-gradient-to-b from-[#fdfbf7] to-[#f7f2e6] border border-[#b38728]/20 flex flex-col justify-between">
            <h5 className="text-[8.5px] sm:text-[9px] font-sans font-extrabold uppercase tracking-[0.16em] text-[#7a5c10] flex items-center gap-1 pb-1 border-b border-[#b38728]/15">
              <MapPin className="w-3 h-3 text-[#b38728]" /> Địa Điểm
            </h5>

            <div className="space-y-1.5 mt-1">
              <div className="flex items-start gap-1.5 sm:gap-2">
                <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-md bg-[#002d62]/10 flex items-center justify-center shrink-0 border border-[#002d62]/20">
                  <GraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#002d62]" />
                </div>
                <div>
                  <p className="text-[7px] sm:text-[7.5px] text-slate-500 font-bold uppercase tracking-wider">
                    Hội Trường
                  </p>
                  <p className="text-[10.5px] sm:text-xs font-extrabold text-[#002d62] mt-0.5">
                    {config.hall}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-1.5 sm:gap-2">
                <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-md bg-[#b38728]/12 flex items-center justify-center shrink-0 border border-[#b38728]/20">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#7a5c10]" />
                </div>
                <div>
                  <p className="text-[7px] sm:text-[7.5px] text-slate-500 font-bold uppercase tracking-wider">
                    Địa Chỉ Chi Tiết
                  </p>
                  <p className="text-[10px] sm:text-[11px] font-bold text-slate-700 mt-0.5 leading-snug">
                    {config.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* QR MAP PASS CARD (HORIZONTAL STRIP ON MOBILE) */}
          <div className="p-2 sm:p-2.5 rounded-lg bg-gradient-to-b from-[#001d42] to-[#002d62] border border-[#b38728]/40 text-white flex flex-row md:flex-col items-center justify-between sm:justify-center gap-2 shadow-sm sm:col-span-2 md:col-span-1 md:w-32">
            <div className="p-1 sm:p-1.5 bg-white rounded-md border border-[#b38728] shadow-inner shrink-0">
              <QRCodeSVG
                value={googleMapsUrl}
                size={62}
                bgColor="#ffffff"
                fgColor="#001d42"
                level="M"
                includeMargin={false}
              />
            </div>
            
            <div className="flex flex-col items-end sm:items-center gap-1">
              <span className="text-[7.5px] uppercase tracking-[0.18em] font-bold text-[#f3e5ab]">
                Bản Đồ Định Vị
              </span>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[8.5px] font-bold text-[#001d42] bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] hover:brightness-110 px-2.5 py-1 rounded transition-all cursor-pointer uppercase tracking-wider no-underline shadow-xs font-sans whitespace-nowrap active:scale-95"
              >
                Chỉ Đường
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════ FOOTER & SIGNATURE ════════════════ */}
      <div className="relative z-10 pt-1 text-center">
        <GoldFlourish className="w-40 h-4 text-[#b38728] opacity-85 mx-auto mb-1" />
        <div className="text-[9px] text-slate-500 font-sans">
          <p>
            Trân trọng kính mời & đón tiếp •{" "}
            <span className="font-extrabold text-[#002d62] italic">
              Nguyễn Trung Tiến
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
