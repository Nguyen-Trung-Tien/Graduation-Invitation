import { useState, useRef } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  GraduationCap,
  Sparkles,
  Award,
  CalendarPlus,
  ExternalLink,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

/* ── Ceremonial Art Deco / Royal Gold Flourish ── */
function GoldFlourish({ className = "" }) {
  return (
    <svg viewBox="0 0 300 20" className={className} fill="none" aria-hidden="true">
      <path
        d="M150 10 C125 10, 110 2.5, 80 2.5 C50 2.5, 35 10, 15 10 C8 10, 3 7.5, 0 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M150 10 C175 10, 190 2.5, 220 2.5 C250 2.5, 265 10, 285 10 C292 10, 297 7.5, 300 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="150" cy="10" r="3" fill="currentColor" />
      <circle cx="80" cy="2.5" r="1.8" fill="currentColor" opacity="0.85" />
      <circle cx="220" cy="2.5" r="1.8" fill="currentColor" opacity="0.85" />
      <path d="M150 3 L152.5 10 L150 17 L147.5 10 Z" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

/* ── Royal Corner Ornament with Filigree ── */
function CornerOrnament({ position }) {
  const rotations = {
    "top-left": "rotate(0)",
    "top-right": "rotate(90deg)",
    "bottom-right": "rotate(180deg)",
    "bottom-left": "rotate(270deg)",
  };
  const positions = {
    "top-left": "top-2 left-2 sm:top-2.5 sm:left-2.5",
    "top-right": "top-2 right-2 sm:top-2.5 sm:right-2.5",
    "bottom-right": "bottom-2 right-2 sm:bottom-2.5 sm:right-2.5",
    "bottom-left": "bottom-2 left-2 sm:bottom-2.5 sm:left-2.5",
  };
  return (
    <svg
      viewBox="0 0 50 50"
      className={`absolute ${positions[position]} w-6 h-6 sm:w-8 sm:h-8 text-[#b38728] pointer-events-none z-20 opacity-80`}
      style={{ transform: rotations[position] }}
      fill="none"
      aria-hidden="true"
    >
      {/* Outer corner frame */}
      <path
        d="M3 28 V7 C3 4.8 4.8 3 7 3 H28"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Inner ornamental filigree */}
      <path
        d="M9 20 V11 C9 9.9 9.9 9 11 9 H20"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M3 16 Q16 16, 16 3"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.65"
      />
      <circle cx="3" cy="28" r="2" fill="currentColor" />
      <circle cx="28" cy="3" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

/* ── University Emblem Crest Badge ── */
function UniversityCrest() {
  return (
    <div className="flex items-center justify-center gap-1.5 mb-0.5 no-print">
      <div className="h-[1px] w-6 sm:w-12 bg-gradient-to-r from-transparent to-[#b38728]/60" />
      <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#001d42]/5 border border-[#b38728]/40 shadow-2xs">
        <GraduationCap className="w-3.5 h-3.5 text-[#002d62]" />
      </div>
      <div className="h-[1px] w-6 sm:w-12 bg-gradient-to-l from-transparent to-[#b38728]/60" />
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
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -1.8;
    const rotateY = ((x - centerX) / centerX) * 1.8;

    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
      shineX,
      shineY,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
      shineX: 50,
      shineY: 50,
      isHovered: false,
    });
  };

  const formatVietnameseDate = (dateStr) => {
    if (!dateStr || dateStr === "Đang cập nhật") return "Thứ Bảy, ngày 26 tháng 12 năm 2026";
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
      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear();
      return `${days[dateObj.getDay()]}, ngày ${day} tháng ${month} năm ${year}`;
    } catch {
      return dateStr;
    }
  };

  const googleMapsUrl = "https://maps.app.goo.gl/SrCYzQdAPC5invdt8";

  // Google Calendar URL Generator
  const createGoogleCalendarUrl = () => {
    const title = encodeURIComponent(
      `Lễ Tốt Nghiệp ${config.degree || "Cử nhân"} ${config.gradName} - UTH`
    );
    const details = encodeURIComponent(
      `Trân trọng kính mời ${guestName || "quý khách"} đến tham dự và chia vui cùng ${config.gradName} trong Lễ Tốt Nghiệp Ngành ${config.major}.\n\n` +
      `📌 Địa điểm: ${config.hall} - ${config.address}\n` +
      `🕒 Giờ khai mạc: ${config.time || "16:30"}\n\n` +
      `Lời chúc: "${config.invitationText || ""}"`
    );
    const location = encodeURIComponent(`${config.hall}, ${config.address}`);

    let startDateStr = "20261226T163000";
    let endDateStr = "20261226T193000";

    const cleanDateStr = (config.date || "").replace(/\s*\(dự kiến\)/gi, "").trim();
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
        const endHour = String(Math.min(23, parseInt(timeHour, 10) + 3)).padStart(2, "0");
        endDateStr = `${yyyy}${mm}${dd}T${endHour}${timeMin}00`;
      }
    }

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startDateStr}/${endDateStr}`;
  };

  const isExpectedDate = config.isExpectedDate !== false;
  const isExpectedTime = config.isExpectedTime !== false;

  return (
    <article
      ref={cardRef}
      id={isPrintable ? "printable-invitation" : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="invitation-card w-full max-w-[620px] mx-auto my-0.5 relative overflow-hidden text-slate-800 transition-all duration-300 ease-out card-paper-texture shadow-2xl"
      style={{
        borderRadius: "1.2rem",
        border: "3px solid rgba(179, 135, 40, 0.45)",
        boxShadow: tiltStyle.isHovered
          ? "0 20px 50px rgba(0, 29, 66, 0.28), 0 0 18px rgba(179, 135, 40, 0.24)"
          : "0 0 0 1px rgba(179, 135, 40, 0.22), 0 14px 38px rgba(0, 29, 66, 0.2), 0 4px 12px rgba(179, 135, 40, 0.15)",
        padding: "clamp(0.85rem, 1.8vh, 1.25rem) clamp(1.1rem, 2.5vw, 1.6rem)",
        transform: tiltStyle.transform,
      }}
    >
      {/* Subtle Gold Shimmer Spot Follower on Desktop */}
      {tiltStyle.isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 320px at ${tiltStyle.shineX}% ${tiltStyle.shineY}%, rgba(255, 245, 205, 0.2) 0%, rgba(179, 135, 40, 0.05) 50%, transparent 80%)`,
          }}
        />
      )}

      {/* Royal Corner Ornaments */}
      <CornerOrnament position="top-left" />
      <CornerOrnament position="top-right" />
      <CornerOrnament position="bottom-left" />
      <CornerOrnament position="bottom-right" />

      {/* Multi-layered Double Gold Foil Inner Border Frame */}
      <div className="absolute inset-2 sm:inset-2.5 border-2 border-[#b38728]/35 rounded-xl pointer-events-none z-10" />
      <div className="absolute inset-[10px] sm:inset-[13px] border border-[#b38728]/20 rounded-lg pointer-events-none z-10" />

      {/* ════════════════ TIER 1: HEADER & TITLE ════════════════ */}
      <header className="flex flex-col items-center text-center gap-0 pb-0.5 relative z-10">
        <UniversityCrest />

        <p className="text-[10px] sm:text-[10.5px] tracking-wider font-sans font-extrabold text-[#002d62] uppercase leading-none mt-0.5">
          Đại Học Giao Thông Vận Tải TP.Hồ Chí Minh
        </p>

        <h1
          className="text-lg sm:text-xl md:text-[23px] font-serif font-black uppercase tracking-wide leading-snug py-0.5 text-glow drop-shadow-xs inline-block"
          style={{
            background:
              "linear-gradient(135deg, #001d42 0%, #003a80 45%, #8b661b 75%, #001d42 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Thư Mời Dự Lễ Tốt Nghiệp
        </h1>

        {/* Flourish Divider */}
        <GoldFlourish className="w-36 sm:w-44 h-2.5 text-[#b38728] opacity-85 my-0.5" />
      </header>

      {/* ════════════════ TIER 2: GUEST PERSONALIZATION ════════════════ */}
      <section className="text-center py-0.5 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#b38728]/12 border border-[#b38728]/30 shadow-2xs mb-0.5">
          <Sparkles className="w-2.5 h-2.5 text-[#b38728]" />
          <span className="text-[10px] sm:text-[10.5px] uppercase tracking-wider text-[#7a5c10] font-extrabold font-sans">
            Trân Trọng Kính Mời
          </span>
          <Sparkles className="w-2.5 h-2.5 text-[#b38728]" />
        </div>

        <h2
          className="text-xl sm:text-2xl md:text-[30px] font-handwriting text-[#002d62] font-normal leading-tight text-glow px-2 py-0"
          style={{ letterSpacing: "0.02em" }}
        >
          {guestName || "Toàn thể Đại gia đình"}
        </h2>
      </section>

      {/* ════════════════ TIER 3: HERO GRADUATE CENTERPIECE (FOCAL POINT) ════════════════ */}
      <section className="relative z-10 max-w-lg mx-auto my-1">
        <div
          className="py-2 sm:py-2.5 px-3 sm:px-5 rounded-xl flex flex-col items-center text-center gap-1 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(254,250,242,0.95) 100%)",
            border: "1.5px solid rgba(179,135,40,0.38)",
            boxShadow:
              "0 6px 20px rgba(0,29,66,0.06), 0 0 0 1px rgba(255,255,255,0.8), inset 0 1px 0 rgba(255,255,255,0.95)",
          }}
        >
          {/* Graduate Emblem Title */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#002d62]/6 border border-[#b38728]/40">
            <GraduationCap className="w-3.5 h-3.5 text-[#002d62]" />
            <span className="text-[10px] sm:text-[10.5px] uppercase tracking-wider text-[#7a5c10] font-sans font-extrabold">
              Tân {config.degree || "Cử Nhân"}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-[27px] font-serif font-black tracking-wide uppercase leading-tight text-[#001d42] py-0.5 px-2 inline-block drop-shadow-xs">
            {config.gradName}
          </h3>

          {/* Academic Info */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-800 font-medium">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#002d62]/8 border border-[#002d62]/20 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b38728]" />
              Ngành: <strong className="font-extrabold text-[#002d62]">{config.major}</strong>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#002d62]/8 border border-[#002d62]/20 shadow-2xs">
              <Award className="w-3 h-3 text-[#b38728]" />
              Học vị: <strong className="font-extrabold text-[#002d62]">{config.degree || "Cử nhân"}</strong>
            </span>

            <span className="text-[10px] sm:text-[10.5px] uppercase tracking-wider text-[#7a5c10] font-sans font-bold">
              • Khóa 2022–2026
            </span>
          </div>

          {/* Golden Gradient Divider */}
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#b38728] to-transparent my-0.5" />

          {/* Personal Invitation Text */}
          <p className="text-[11px] sm:text-xs text-slate-700 leading-snug max-w-md italic px-1 font-serif whitespace-pre-line">
            <span className="text-[#b38728] font-serif font-bold text-sm mr-0.5">“</span>
            {config.invitationText ||
              "Trân trọng kính mời gia đình đến chia vui cùng con trong buổi lễ tốt nghiệp.\nLưu ý: Khi tham gia lễ phải có vé tham gia (tối đa 5 vé)"}
            <span className="text-[#b38728] font-serif font-bold text-sm ml-0.5">”</span>
          </p>
        </div>
      </section>

      {/* ════════════════ TIER 4: EVENT DETAILS MODULES ════════════════ */}
      <section className="my-1 relative z-10">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_1fr_auto] gap-1.5 rounded-xl overflow-hidden p-1.5"
          style={{
            background: "rgba(255,255,255,0.94)",
            border: "1.5px solid rgba(179,135,40,0.32)",
            boxShadow: "0 4px 16px rgba(0,29,66,0.05)",
          }}
        >
          {/* TIME CARD */}
          <div className="p-2 sm:p-2.5 rounded-lg bg-gradient-to-b from-[#fdfbf7] to-[#f7f2e6] border border-[#b38728]/25 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-1 border-b border-[#b38728]/20">
                <h4 className="text-[10px] sm:text-[10.5px] font-sans font-extrabold uppercase tracking-wider text-[#7a5c10] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#b38728]" /> Thời Gian
                </h4>

                {/* Google Calendar Link Button */}
                <a
                  href={createGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-print inline-flex items-center gap-1 text-[10px] font-bold text-[#002d62] bg-[#b38728]/15 hover:bg-[#b38728]/25 px-2 py-0.5 rounded border border-[#b38728]/30 transition-all cursor-pointer no-underline active:scale-95"
                  title="Thêm nhắc lịch Lễ Tốt Nghiệp vào Google Calendar"
                >
                  <CalendarPlus className="w-2.5 h-2.5 text-[#7a5c10]" />
                  <span>Lưu Lịch</span>
                </a>
              </div>

              <div className="space-y-1 mt-1">
                <div className="flex items-start gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-[#b38728]/15 flex items-center justify-center shrink-0 border border-[#b38728]/25 mt-0.5">
                    <Calendar className="w-3 h-3 text-[#7a5c10]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none">
                      Ngày Diễn Ra
                    </p>
                    <p className="text-[11px] sm:text-xs font-extrabold text-[#002d62] mt-0.5 leading-tight">
                      {formatVietnameseDate(config.date)}{" "}
                      {isExpectedDate && (
                        <span className="text-[10px] text-amber-700 font-semibold italic">
                          (dự kiến)
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-[#b38728]/15 flex items-center justify-center shrink-0 border border-[#b38728]/25 mt-0.5">
                    <Clock className="w-3 h-3 text-[#7a5c10]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none">
                      Giờ Khai Mạc
                    </p>
                    <p className="text-[11px] sm:text-xs font-extrabold text-[#002d62] mt-0.5 leading-tight">
                      {config.time || "16:30"}{" "}
                      {isExpectedTime && (
                        <span className="text-[10px] text-amber-700 font-semibold italic">
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
          <div className="p-2 sm:p-2.5 rounded-lg bg-gradient-to-b from-[#fdfbf7] to-[#f7f2e6] border border-[#b38728]/25 flex flex-col justify-between">
            <div>
              <h4 className="text-[10px] sm:text-[10.5px] font-sans font-extrabold uppercase tracking-wider text-[#7a5c10] flex items-center gap-1 pb-1 border-b border-[#b38728]/20">
                <MapPin className="w-3 h-3 text-[#b38728]" /> Địa Điểm
              </h4>

              <div className="space-y-1 mt-1">
                <div className="flex items-start gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-[#002d62]/12 flex items-center justify-center shrink-0 border border-[#002d62]/25 mt-0.5">
                    <GraduationCap className="w-3 h-3 text-[#002d62]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none">
                      Hội Trường
                    </p>
                    <p className="text-[11px] sm:text-xs font-extrabold text-[#002d62] mt-0.5 leading-tight">
                      {config.hall}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-[#b38728]/15 flex items-center justify-center shrink-0 border border-[#b38728]/25 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#7a5c10]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none">
                      Địa Chỉ Chi Tiết
                    </p>
                    <p className="text-[10.5px] sm:text-[11px] font-semibold text-slate-700 mt-0.5 leading-snug">
                      {config.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QR MAP PASS CARD */}
          <div className="p-2 sm:p-2.5 rounded-lg bg-gradient-to-b from-[#001d42] via-[#002654] to-[#002d62] border border-[#b38728]/50 text-white flex flex-row md:flex-col items-center justify-between sm:justify-center gap-1.5 shadow-sm sm:col-span-2 md:col-span-1 md:w-30">
            <div className="p-1 bg-white rounded border border-[#b38728]/40 shrink-0">
              <QRCodeSVG
                value={googleMapsUrl}
                size={50}
                bgColor="#ffffff"
                fgColor="#001d42"
                level="M"
                includeMargin={false}
              />
            </div>

            <div className="flex flex-col items-end sm:items-center gap-1">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#f3e5ab] text-center">
                Bản Đồ GPS
              </span>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="no-print text-[10px] font-extrabold text-[#001d42] bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] hover:brightness-110 px-2 py-0.5 rounded transition-all cursor-pointer uppercase tracking-wider no-underline shadow-xs font-sans whitespace-nowrap active:scale-95 flex items-center gap-1"
              >
                <span>Chỉ Đường</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ FOOTER & SIGNATURE ════════════════ */}
      <footer className="relative z-10 pt-0.5 text-center">
        <GoldFlourish className="w-36 h-2.5 text-[#b38728] opacity-80 mx-auto mb-0.5" />
        <div className="text-[10.5px] sm:text-[11px] text-slate-600 font-sans leading-none">
          <p>
            Trân trọng kính mời & đón tiếp •{" "}
            <span className="font-extrabold text-[#002d62] italic text-[11px] sm:text-xs">
              {config.gradName}
            </span>
          </p>
        </div>
      </footer>
    </article>
  );
}
