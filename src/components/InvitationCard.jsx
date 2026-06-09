import React from "react";
import { MapPin, Calendar, Clock, GraduationCap, Sparkles } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

/* ── Reusable SVG ornament flourish ── */
function GoldFlourish({ className = "" }) {
  return (
    <svg viewBox="0 0 200 20" className={className} fill="none">
      <path
        d="M100 10 C85 10, 75 2, 55 2 C35 2, 25 8, 10 8 C5 8, 2 6, 0 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M100 10 C115 10, 125 2, 145 2 C165 2, 175 8, 190 8 C195 8, 198 6, 200 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="100" cy="10" r="3" fill="currentColor" />
      <circle cx="55" cy="2" r="1.8" fill="currentColor" opacity="0.7" />
      <circle cx="145" cy="2" r="1.8" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

/* ── Corner ornament ── */
function CornerOrnament({ position }) {
  const rotations = {
    "top-left": "rotate(0)",
    "top-right": "rotate(90deg)",
    "bottom-right": "rotate(180deg)",
    "bottom-left": "rotate(270deg)",
  };
  const positions = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2",
    "bottom-right": "bottom-2 right-2",
    "bottom-left": "bottom-2 left-2",
  };
  return (
    <svg
      viewBox="0 0 40 40"
      className={`absolute ${positions[position]} w-9 h-9 sm:w-11 sm:h-11 text-accent pointer-events-none`}
      style={{ transform: rotations[position] }}
      fill="none"
    >
      <path
        d="M2 22 Q2 2, 22 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 15 Q7 7, 15 7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="2" cy="22" r="2" fill="currentColor" />
      <circle cx="22" cy="2" r="2" fill="currentColor" />
    </svg>
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
      className="invitation-card w-full max-w-2xl mx-auto my-3 relative overflow-hidden text-slate-800"
      style={{
        background:
          "linear-gradient(170deg, #FDF8EE 0%, #FAF3E3 35%, #F5EDDA 100%)",
        borderRadius: "1.25rem",
        border: "3px solid rgba(180, 140, 20, 0.35)",
        boxShadow:
          "0 0 0 1px rgba(212,175,55,0.1), 0 8px 32px rgba(0,45,98,0.12), 0 2px 8px rgba(212,175,55,0.15)",
        padding: "clamp(1.25rem, 3vw, 2rem)",
      }}
    >
      {/* ─── Corner Ornaments ─── */}
      <CornerOrnament position="top-left" />
      <CornerOrnament position="top-right" />
      <CornerOrnament position="bottom-left" />
      <CornerOrnament position="bottom-right" />

      {/* Inner frame with visible border */}
      <div className="absolute inset-2.5 sm:inset-4 border-2 border-accent/15 rounded-xl pointer-events-none" />

      {/* ════════════════ HEADER ════════════════ */}
      <div className="flex flex-col items-center text-center gap-0.5 pb-2 relative z-10">
        <p className="text-[10px] sm:text-[11px] tracking-[0.25em] font-sans font-semibold text-[#5a4a1e] uppercase">
          Đại Học Giao Thông Vận Tải TP.HCM
        </p>

        <h1
          className="text-lg sm:text-xl md:text-2xl font-serif font-extrabold uppercase tracking-[0.1em] leading-tight"
          style={{
            background:
              "linear-gradient(135deg, #002d62 0%, #1a4a8a 50%, #002d62 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Thư Mời Dự Lễ Tốt Nghiệp
        </h1>

        {/* Flourish divider */}
        <GoldFlourish className="w-40 sm:w-48 h-4 text-accent" />
      </div>

      {/* ════════ GREETING ════════ */}
      <div className="text-center py-1.5 relative z-10">
        <p className="text-[9px] uppercase tracking-[0.3em] text-accent font-bold mb-1 font-sans">
          ✦ Kính gửi ✦
        </p>
        <h2
          className="text-xl sm:text-2xl font-handwriting text-[#002d62] font-normal leading-snug text-glow"
          style={{ letterSpacing: "0.03em", wordSpacing: "0.12em" }}
        >
          {guestName || "Toàn thể Đại gia đình"}
        </h2>
      </div>

      {/* ════════════════ GRADUATE INFO ════════════════ */}
      <div className="relative z-10 max-w-lg mx-auto mb-3">
        <div
          className="py-3 px-4 sm:px-6 rounded-xl flex flex-col items-center text-center gap-1.5"
          style={{
            background:
              "linear-gradient(180deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.02) 100%)",
            border: "2px solid rgba(212,175,55,0.2)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
          }}
        >
          {/* Graduation badge */}
          <div className="w-9 h-9 rounded-full flex items-center justify-center relative bg-[#002d62]/5">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent/35 animate-[spin_18s_linear_infinite]" />
            <GraduationCap className="w-4 h-4 text-[#002d62] relative z-10" />
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-serif font-extrabold tracking-wide uppercase text-accent leading-tight">
              {config.gradName}
            </h4>

            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-2 text-[11px] text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Ngành:{" "}
                <span className="font-bold text-slate-800">{config.major}</span>
              </span>
              <span className="text-accent font-bold">|</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Học vị:{" "}
                <span className="font-bold text-slate-800">
                  {config.degree || "Cử nhân"} Chính quy
                </span>
              </span>
            </div>

            <p className="text-[8px] uppercase tracking-[0.2em] text-[#5a4a1e] font-sans font-bold mt-1">
              Niên Khóa 2022 – 2026
            </p>
          </div>

          <div className="w-10 h-[1px] bg-accent/30" />

          <p className="text-[10px] sm:text-[11px] text-slate-600 leading-[1.6] max-w-xs italic">
            <span className="text-accent font-serif font-bold">“</span>Trân
            trọng kính mời gia đình đến chia vui cùng con trong buổi lễ tốt
            nghiệp.<span className="text-accent font-serif font-bold">”</span>
          </p>
        </div>
      </div>

      {/* ════════════════ EVENT DETAILS ════════════════ */}
      <div className="mb-2 relative z-10">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-accent/25" />
          <span className="text-[8px] sm:text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Chi tiết sự kiện
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-accent/25" />
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-0 rounded-xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.85)",
            border: "2px solid rgba(212,175,55,0.2)",
            boxShadow: "0 4px 20px rgba(0,45,98,0.06)",
          }}
        >
          {/* TIME */}
          <div className="p-3 sm:p-4 sm:border-r border-b sm:border-b-0 border-accent/15">
            <h5 className="text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-accent flex items-center gap-1.5 mb-2 pb-1.5 border-b border-accent/10">
              <Clock className="w-3.5 h-3.5" /> Thời gian
            </h5>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-[8px] sm:text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                    Ngày
                  </p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">
                    {formatVietnameseDate(config.date)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                </div>
                <div>
                  <p className="text-[8px] sm:text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                    Giờ khai mạc
                  </p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">
                    {config.time}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* LOCATION */}
          <div className="p-3 sm:p-4 sm:border-r border-b sm:border-b-0 border-accent/15">
            <h5 className="text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-accent flex items-center gap-1.5 mb-2 pb-1.5 border-b border-accent/10">
              <MapPin className="w-3.5 h-3.5" /> Địa điểm
            </h5>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#002d62]/8 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4 text-[#002d62]" />
                </div>
                <div>
                  <p className="text-[8px] sm:text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                    Hội trường
                  </p>
                  <p className="text-xs font-extrabold text-[#002d62] mt-0.5">
                    {config.hall}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                </div>
                <div>
                  <p className="text-[8px] sm:text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                    Địa chỉ
                  </p>
                  <p className="text-xs font-bold text-slate-700 mt-0.5 leading-snug">
                    {config.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* QR CODE */}
          <div className="p-4 flex flex-row sm:flex-col items-center justify-center gap-3 sm:w-38 bg-accent/5">
            <div className="p-2 bg-white rounded-lg border-2 border-accent/25 shadow-md">
              <QRCodeSVG
                value={googleMapsUrl}
                size={82}
                bgColor="#ffffff"
                fgColor="#002d62"
                level="L"
                includeMargin={true}
              />
            </div>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] font-bold text-white bg-[#002d62] hover:bg-[#003a80] px-4 py-2 rounded-md transition-colors cursor-pointer uppercase tracking-wider no-underline shadow-md"
            >
              Chỉ đường
            </a>
          </div>
        </div>
      </div>

      {/* ════════════════ FOOTER ════════════════ */}
      <div className="relative z-10 pt-4">
        <GoldFlourish className="w-44 h-5 text-accent mx-auto mb-3" />
        <div className="text-center text-[9px] sm:text-[10px]">
          <p className="font-sans mt-1 text-slate-500">
            Thiết kế bởi{" "}
            <span className="font-bold text-slate-700">Nguyễn Trung Tiến</span>
          </p>
        </div>
      </div>
    </div>
  );
}
