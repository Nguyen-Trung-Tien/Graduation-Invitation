import React from "react";
import { MapPin, Calendar, Clock, GraduationCap, Heart } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function InvitationCard({ config, guestName, isPrintable }) {
  // Format Date to Vietnamese display format
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
      const dayName = days[dateObj.getDay()];
      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear();

      return `${dayName}, ngày ${day} tháng ${month} năm ${year}`;
    } catch (e) {
      return dateStr;
    }
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=Truong+Dai+hoc+Giao+thong+van+tai+TPHCM+02+Vo+Oanh`;

  return (
    <div 
      id={isPrintable ? "printable-invitation" : undefined} 
      className="invitation-card w-full max-w-2xl mx-auto my-3 relative overflow-hidden text-slate-800"
      style={{
        background: '#FCFBF7',
        borderRadius: '1.25rem',
        border: '3px solid rgba(212, 175, 55, 0.25)',
        boxShadow: '0 8px 40px rgba(0, 45, 98, 0.08), 0 1px 3px rgba(212, 175, 55, 0.1)',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
      }}
    >
      {/* Subtle inner border frame */}
      <div className="absolute inset-2 border border-accent/10 rounded-2xl pointer-events-none"></div>

      {/* ─── HEADER: School + Title ─── */}
      <div className="flex flex-col items-center text-center gap-2 pb-5 relative z-10">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Logo_UTH.png"
          alt="Logo UTH"
          className="w-14 h-14 object-contain bg-white p-1.5 rounded-full border border-accent/20 shadow-sm"
        />
        <p className="text-[10px] tracking-[0.25em] font-sans font-semibold text-slate-500 uppercase">
          Trường Đại Học Giao Thông Vận Tải TP.HCM
        </p>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#002d62] uppercase tracking-wider leading-tight">
          Thư Mời Dự Lễ Tốt Nghiệp
        </h1>
        {/* Gold divider */}
        <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent mt-1"></div>
      </div>

      {/* ─── GREETING ─── */}
      <div className="text-center py-4 px-6 relative z-10">
        <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-semibold mb-1">
          Kính gửi
        </p>
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-handwriting text-[#002d62] font-normal leading-normal"
          style={{ letterSpacing: "0.04em", wordSpacing: "0.15em" }}
        >
          {guestName || "Toàn thể Đại gia đình"}
        </h2>
      </div>

      {/* ─── GRADUATE INFO ─── */}
      <div className="py-5 px-5 sm:px-8 bg-gradient-to-b from-accent/[0.03] to-transparent rounded-xl border border-accent/15 max-w-lg mx-auto mb-5 relative z-10 flex flex-col items-center text-center gap-3">
        <div className="w-11 h-11 rounded-full bg-[#002d62]/5 border border-[#002d62]/15 flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-[#002d62]" />
        </div>

        <div>
          <h4 className="text-lg sm:text-xl font-serif font-bold text-accent tracking-wide uppercase">
            {config.gradName}
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-2 text-xs text-slate-600">
            <span>
              Ngành: <span className="font-semibold text-slate-800">{config.major}</span>
            </span>
            <span className="text-accent/30">•</span>
            <span>
              Học vị: <span className="font-semibold text-slate-800">{config.degree || "Cử nhân"} Chính quy</span>
            </span>
          </div>
          <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-sans font-semibold mt-2">
            Niên Khóa 2022 – 2026
          </p>
        </div>

        {/* Short gold divider */}
        <div className="w-12 h-[1px] bg-accent/25"></div>

        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed italic max-w-md px-2">
          "Trải qua 4 năm học tập và rèn luyện tại Đại học Giao thông vận tải TP.HCM,
          con đã hoàn thành chặng đường tri thức đầu tiên. Sự đồng hành và động viên
          của gia đình là điểm tựa lớn nhất. Trân trọng kính mời gia đình đến chia vui
          cùng con trong buổi lễ tốt nghiệp."
        </p>
      </div>

      {/* ─── EVENT DETAILS (Clean 2-column + QR) ─── */}
      <div className="mb-5 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-0 bg-white rounded-xl border border-accent/20 overflow-hidden shadow-sm">
          
          {/* TIME */}
          <div className="p-4 sm:p-5 sm:border-r border-b sm:border-b-0 border-accent/10">
            <h5 className="text-[10px] font-sans font-semibold uppercase tracking-wider text-accent flex items-center gap-1.5 mb-3">
              <Clock className="w-3.5 h-3.5" /> Thời gian
            </h5>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-accent/60 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[9px] text-slate-400 font-semibold uppercase">Ngày</p>
                  <p className="text-xs font-semibold text-slate-800 mt-0.5">
                    {formatVietnameseDate(config.date)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-accent/60 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[9px] text-slate-400 font-semibold uppercase">Giờ khai mạc</p>
                  <p className="text-xs font-semibold text-slate-800 mt-0.5">{config.time}</p>
                </div>
              </div>
            </div>
          </div>

          {/* LOCATION */}
          <div className="p-4 sm:p-5 sm:border-r border-b sm:border-b-0 border-accent/10">
            <h5 className="text-[10px] font-sans font-semibold uppercase tracking-wider text-accent flex items-center gap-1.5 mb-3">
              <MapPin className="w-3.5 h-3.5" /> Địa điểm
            </h5>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <GraduationCap className="w-4 h-4 text-accent/60 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[9px] text-slate-400 font-semibold uppercase">Hội trường</p>
                  <p className="text-xs font-semibold text-[#002d62] mt-0.5">{config.hall}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent/60 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[9px] text-slate-400 font-semibold uppercase">Địa chỉ</p>
                  <p className="text-xs font-semibold text-slate-700 mt-0.5 leading-snug">{config.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* QR CODE */}
          <div className="p-4 flex flex-row sm:flex-col items-center justify-center gap-3 sm:w-36 bg-slate-50/50">
            <div className="p-1.5 bg-white rounded-lg border border-accent/20">
              <QRCodeSVG
                value={googleMapsUrl}
                size={80}
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
              className="text-[9px] font-semibold text-white bg-[#002d62] hover:bg-[#003a80] px-3 py-1.5 rounded-md transition-colors cursor-pointer uppercase tracking-wide no-underline"
            >
              Chỉ đường
            </a>
          </div>
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <div className="text-center text-[9px] text-slate-400 border-t border-accent/10 pt-4 relative z-10">
        <p className="font-serif tracking-widest uppercase text-slate-500 font-semibold">
          Trường Đại học Giao thông vận tải TP.HCM
        </p>
        <p className="font-sans mt-0.5">
          Thiết kế bởi:{" "}
          <span className="font-semibold text-slate-600">Nguyễn Trung Tiến</span>
        </p>
      </div>
    </div>
  );
}
