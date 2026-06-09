import React from "react";
import { MapPin, Calendar, Clock, GraduationCap, Heart } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function InvitationCard({ config, guestName }) {
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
    <div className="w-full max-w-3xl mx-auto my-3 p-4 sm:p-8 md:p-10 bg-[#FCFBF7] rounded-2xl sm:rounded-3xl border-4 sm:border-8 border-double border-accent/40 shadow-2xl relative overflow-hidden text-slate-800">
      {/* Corner borders */}
      <div className="absolute top-1 sm:top-2 left-1 sm:left-2 w-8 sm:w-12 h-8 sm:h-12 border-t-2 border-l-2 border-accent/40 pointer-events-none"></div>
      <div className="absolute top-1 sm:top-2 right-1 sm:right-2 w-8 sm:w-12 h-8 sm:h-12 border-t-2 border-r-2 border-accent/40 pointer-events-none"></div>
      <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 w-8 sm:w-12 h-8 sm:h-12 border-b-2 border-l-2 border-accent/40 pointer-events-none"></div>
      <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 w-8 sm:w-12 h-8 sm:h-12 border-b-2 border-r-2 border-accent/40 pointer-events-none"></div>

      {/* Decorative Golden inner frame */}
      <div className="absolute inset-1.5 sm:inset-3 border border-accent/20 pointer-events-none"></div>

      {/* 1. School Header & Title (Centered layout) */}
      <div className="flex flex-col items-center text-center gap-3 pb-4 border-b border-accent/20 relative z-10">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Logo_UTH.png"
          alt="Logo UTH"
          className="w-14 h-14 sm:w-16 sm:h-16 object-contain bg-white p-1 rounded-full border border-accent/30 shadow-sm shrink-0"
        />
        <div className="flex flex-col items-center">
          <h3 className="text-[10px] sm:text-xs tracking-[0.2em] font-serif font-bold text-slate-700 uppercase leading-none">
            Trường Đại Học Giao Thông Vận Tải TP.HCM
          </h3>
          <h1 className="text-lg sm:text-2xl font-serif font-extrabold text-[#002d62] uppercase tracking-wider mt-1.5 flex items-center justify-center gap-2">
            THƯ MỜI DỰ LỄ TỐT NGHIỆP
          </h1>
        </div>
      </div>

      {/* 2. Personalized Greeting */}
      <div className="text-center py-3.5 px-6 bg-accent/5 rounded-xl border border-accent/20 max-w-lg mx-auto my-5 relative z-10 shadow-sm">
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
          Kính gửi
        </p>
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-handwriting text-[#002d62] font-normal py-0.5 mt-0.5 leading-normal"
          style={{ letterSpacing: "0.04em", wordSpacing: "0.15em" }}
        >
          {guestName || "Toàn thể Đại gia đình"}
        </h2>
      </div>

      {/* 3. Graduate Info Details */}
      <div className="py-5 px-6 sm:px-8 bg-[#FAF9F6] rounded-2xl border border-accent/25 max-w-xl mx-auto mb-5 relative z-10 shadow-sm flex flex-col items-center text-center gap-3">
        {/* Decorative Badge with Graduation Cap */}
        <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center shadow-inner relative">
          <GraduationCap className="w-6 h-6 text-[#002d62]" />
          <div className="absolute -inset-0.5 border border-accent/10 rounded-full pointer-events-none"></div>
        </div>

        <div>
          <h4 className="text-xl sm:text-2xl font-serif font-extrabold text-[#002d62] tracking-wide uppercase">
            <span className="text-accent">{config.gradName}</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 font-medium tracking-wide mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 sm:gap-2">
            <span>
              Ngành học:{" "}
              <span className="text-slate-800 font-bold">{config.major}</span>
            </span>
            <span className="text-accent/40 hidden sm:inline">|</span>
            <span>
              Học vị:{" "}
              <span className="text-slate-800 font-bold">
                {config.degree || "Cử nhân"} Chính quy
              </span>
            </span>
          </p>
          <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400 font-sans font-bold mt-1">
            Niên Khóa 2022 - 2026
          </p>
        </div>

        {/* Decorative Divider */}
        <div className="w-16 h-[1px] bg-accent/30 my-1"></div>

        <div className="relative max-w-md">
          <Heart className="absolute -left-3.5 -top-3.5 w-6 h-6 text-accent/10 fill-accent/5 pointer-events-none" />
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic relative z-10 px-3">
            "Trải qua chặng đường 4 năm học tập và rèn luyện dưới mái trường Đại
            học Giao thông vận tải TP.HCM (UTH), con đã hoàn thành chặng đường
            tri thức đầu tiên. Sự đồng hành, nuôi dưỡng và động viên của gia
            đình là điểm tựa lớn nhất giúp con đạt được dấu mốc này. Trân trọng
            kính mời gia đình đến chia vui cùng con trong buổi lễ tốt nghiệp
            thiêng liêng."
          </p>
        </div>
      </div>

      {/* 5. 3-Stub VIP Ticket (Time, Location, Map QR Merged) */}
      <div className="mb-6 relative z-10">
        <div className="bg-[#FAF9F6] border-2 border-accent/30 rounded-2xl relative overflow-hidden shadow-sm flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-dashed divide-accent/30">
          {/* Ticket Punch Hole Notches (Sides) */}
          <div className="absolute top-1/2 -left-3.5 w-7 h-7 rounded-full bg-[#f1f5f9] border-2 border-accent/20 -translate-y-1/2 z-10 hidden md:block"></div>
          <div className="absolute top-1/2 -right-3.5 w-7 h-7 rounded-full bg-[#f1f5f9] border-2 border-accent/20 -translate-y-1/2 z-10 hidden md:block"></div>

          {/* Dotted border wrapper */}
          <div className="absolute inset-1.5 border border-dashed border-accent/10 rounded-xl pointer-events-none"></div>

          {/* TIME STUB */}
          <div className="flex-1 p-5 text-left flex flex-col gap-3 relative">
            <h5 className="text-[10px] font-sans font-bold uppercase tracking-wider text-accent border-b border-accent/10 pb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Thời Gian Lễ
            </h5>

            <div className="flex flex-col gap-2.5 my-auto">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">
                    Ngày
                  </p>
                  <p className="text-xs font-semibold text-slate-800 leading-none mt-1">
                    {formatVietnameseDate(config.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">
                    Giờ Khai Mạc
                  </p>
                  <p className="text-xs font-semibold text-slate-800 leading-none mt-1">
                    {config.time}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* LOCATION STUB */}
          <div className="flex-1 p-5 text-left flex flex-col gap-3 relative">
            <h5 className="text-[10px] font-sans font-bold uppercase tracking-wider text-accent border-b border-accent/10 pb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Địa Điểm
            </h5>

            <div className="flex flex-col gap-2.5 my-auto">
              <div className="flex items-start gap-2">
                <GraduationCap className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">
                    Hội Trường
                  </p>
                  <p className="text-xs font-semibold text-[#002d62] leading-none mt-1">
                    {config.hall}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">
                    Địa Chỉ
                  </p>
                  <p className="text-xs font-semibold text-slate-700 leading-tight mt-1">
                    {config.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* QR CODE / NAV STUB */}
          <div className="w-full md:w-44 p-4 flex flex-col items-center justify-center gap-2 shrink-0 bg-[#FAF9F6] relative">
            {/* Circular tear-off notches for this stub segment - positioned exactly on the left boundary of the QR stub */}
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#f1f5f9] border border-accent/20 z-10 hidden md:block"></div>
            <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-6 h-6 rounded-full bg-[#f1f5f9] border border-accent/20 z-10 hidden md:block"></div>

            <div className="p-1.5 bg-white rounded-lg shadow-sm border border-accent/30 hover:scale-105 transition-transform duration-200">
              <QRCodeSVG
                value={googleMapsUrl}
                size={85}
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
              className="text-[9px] font-bold text-white bg-[#002d62] hover:bg-blue-800 px-3 py-1 rounded transition-all cursor-pointer uppercase shadow-sm border-none leading-none"
            >
              Chỉ Đường Maps
            </a>
          </div>
        </div>
      </div>

      {/* Footer message */}
      <div className="text-center mt-8 text-[9px] text-slate-400 border-t border-accent/15 pt-4 relative z-10 flex flex-col items-center justify-center gap-0.5">
        <p className="font-serif tracking-widest uppercase text-slate-500 font-semibold">
          Trường Đại học Giao thông vận tải TP.HCM
        </p>
        <p className="font-sans">
          Thiết kế bởi:{" "}
          <span className="font-semibold text-slate-700">
            Nguyễn Trung Tiến
          </span>
        </p>
      </div>
    </div>
  );
}
