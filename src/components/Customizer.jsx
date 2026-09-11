import { useState } from "react";
import { Settings, X, Copy, Check, Info, Palette } from "lucide-react";

export default function Customizer({
  config,
  onChange,
  defaultGuest,
  bgTheme = "uth-campus",
  onBgThemeChange,
  isOpen,
  onClose,
}) {
  const [guestName, setGuestName] = useState(defaultGuest || "Toàn thể Đại gia đình");
  const [copied, setCopied] = useState(false);

  const handleFieldChange = (field, value) => {
    onChange({
      ...config,
      [field]: value,
    });
  };

  const generateShareLink = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();

    params.set("guest", guestName);
    params.set("name", config.gradName);
    params.set("major", config.major);
    params.set("degree", config.degree);
    params.set("date", config.date);
    params.set("time", config.time);
    params.set("hall", config.hall);
    params.set("address", config.address);
    if (config.invitationText) {
      params.set("text", config.invitationText);
    }
    if (bgTheme) {
      params.set("theme", bgTheme);
    }
    params.set("shared", "true");

    const fullUrl = `${baseUrl}?${params.toString()}`;

    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const themes = [
    {
      id: "uth-campus",
      name: "🏛️ UTH Campus Heritage",
      desc: "Khuôn viên trường ĐH Giao thông Vận tải TP.HCM",
    },
    {
      id: "classic",
      name: "📜 Giấy Da Hoàng Gia",
      desc: "Tông ngà ấm áp trang trọng",
    },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        aria-label="Tùy chỉnh thiệp mời"
        className={`fixed top-0 right-0 h-full w-full max-w-full sm:max-w-md bg-[#FFFDF7] border-l border-[#B38728]/25 z-50 shadow-2xl flex flex-col transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#B38728]/20 flex items-center justify-between bg-[#FAF6ED]">
          <h3 className="text-base font-serif font-bold text-[#002D62] flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#B38728]" />
            <span>Tùy Chỉnh Thiệp Mời</span>
          </h3>
          <button
            onClick={onClose}
            aria-label="Đóng bảng tùy chỉnh"
            className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4 text-left">
          <div className="p-3 bg-[#FAF6ED] rounded-xl border border-[#B38728]/20 flex gap-2.5 items-start">
            <Info className="w-4 h-4 text-[#B38728] shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed">
              Tùy chỉnh thông tin và chọn hình nền phù hợp, sau đó nhấn <strong>Sao chép link mời</strong> để gửi riêng cho người thân, bạn bè.
            </p>
          </div>

          {/* Theme Selector */}
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-[#002D62] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-[#B38728]" /> Giao diện nền
            </label>
            <div className="grid grid-cols-1 gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onBgThemeChange && onBgThemeChange(t.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col gap-0.5 ${
                    bgTheme === t.id
                      ? "bg-[#002D62] text-white border-[#B38728] shadow-sm"
                      : "bg-[#FAF8F2] text-slate-700 border-slate-200 hover:border-[#B38728]/40"
                  }`}
                >
                  <span className="text-xs font-bold">{t.name}</span>
                  <span
                    className={`text-[11px] ${
                      bgTheme === t.id ? "text-[#DFC479]" : "text-slate-500"
                    }`}
                  >
                    {t.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Controls */}
          <div className="flex flex-col gap-3.5">
            {/* Guest personalization */}
            <div className="p-3 bg-[#FAF6ED] rounded-xl border border-[#B38728]/25">
              <label className="block text-xs font-bold text-[#002D62] uppercase tracking-wider mb-1">
                Tên Khách Mời Mặc Định
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Ví dụ: Bác Nam, Cô Út, Gia đình anh Hai..."
                className="w-full px-3 py-2 text-sm rounded-lg bg-white border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#B38728] transition-colors"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Link chia sẻ sẽ hiển thị lời mời gửi đến tên này.
              </p>
            </div>

            {/* Graduate Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Tên Tân Khoa
              </label>
              <input
                type="text"
                value={config.gradName}
                onChange={(e) => handleFieldChange("gradName", e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg bg-[#FAF8F2] border border-slate-300 text-slate-800 focus:bg-white focus:outline-none focus:border-[#B38728] transition-colors"
              />
            </div>

            {/* Degree & Major */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Học Vị
                </label>
                <select
                  value={config.degree}
                  onChange={(e) => handleFieldChange("degree", e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-[#FAF8F2] border border-slate-300 text-slate-800 focus:bg-white focus:outline-none focus:border-[#B38728] transition-colors cursor-pointer"
                >
                  <option value="Cử nhân">Cử nhân</option>
                  <option value="Kỹ sư">Kỹ sư</option>
                  <option value="Thạc sĩ">Thạc sĩ</option>
                  <option value="Tiến sĩ">Tiến sĩ</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Ngành Học
                </label>
                <input
                  type="text"
                  value={config.major}
                  onChange={(e) => handleFieldChange("major", e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-[#FAF8F2] border border-slate-300 text-slate-800 focus:bg-white focus:outline-none focus:border-[#B38728] transition-colors"
                />
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Ngày Lễ
                </label>
                <input
                  type="date"
                  value={config.date}
                  onChange={(e) => handleFieldChange("date", e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-[#FAF8F2] border border-slate-300 text-slate-800 focus:bg-white focus:outline-none focus:border-[#B38728] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Giờ Khai Mạc
                </label>
                <input
                  type="time"
                  value={config.time}
                  onChange={(e) => handleFieldChange("time", e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-[#FAF8F2] border border-slate-300 text-slate-800 focus:bg-white focus:outline-none focus:border-[#B38728] transition-colors"
                />
              </div>
            </div>

            {/* Hall */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Hội trường
              </label>
              <input
                type="text"
                value={config.hall}
                onChange={(e) => handleFieldChange("hall", e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg bg-[#FAF8F2] border border-slate-300 text-slate-800 focus:bg-white focus:outline-none focus:border-[#B38728] transition-colors"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Địa điểm
              </label>
              <input
                type="text"
                value={config.address}
                onChange={(e) => handleFieldChange("address", e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg bg-[#FAF8F2] border border-slate-300 text-slate-800 focus:bg-white focus:outline-none focus:border-[#B38728] transition-colors"
              />
            </div>

            {/* Invitation Text */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Lời mời
              </label>
              <textarea
                value={config.invitationText || ""}
                onChange={(e) => handleFieldChange("invitationText", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 text-sm rounded-lg bg-[#FAF8F2] border border-slate-300 text-slate-800 focus:bg-white focus:outline-none focus:border-[#B38728] transition-colors resize-none"
                placeholder="Nhập nội dung lời mời..."
              />
            </div>
          </div>
        </div>

        {/* Footer with Copy Link */}
        <div className="p-4 border-t border-[#B38728]/20 bg-[#FAF6ED] flex flex-col gap-2">
          <button
            type="button"
            onClick={generateShareLink}
            className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
              copied
                ? "bg-[#002D62] text-white"
                : "bg-[#002D62] hover:bg-[#001D42] text-white"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#DFC479]" /> Đã sao chép link mời!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#DFC479]" /> Sao chép link mời
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
