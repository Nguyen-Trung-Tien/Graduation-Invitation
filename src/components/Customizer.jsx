import React, { useState } from 'react';
import { Settings, X, Copy, Check, Info, Palette, Image as ImageIcon } from 'lucide-react';

export default function Customizer({
  config,
  onChange,
  defaultGuest,
  bgTheme = "combined",
  onBgThemeChange,
  isOpen,
  onClose,
}) {
  const [guestName, setGuestName] = useState(defaultGuest || 'Toàn thể Đại gia đình');
  const [copied, setCopied] = useState(false);

  const handleFieldChange = (field, value) => {
    onChange({
      ...config,
      [field]: value
    });
  };

  const generateShareLink = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    
    params.set('guest', guestName);
    params.set('name', config.gradName);
    params.set('major', config.major);
    params.set('degree', config.degree);
    params.set('date', config.date);
    params.set('time', config.time);
    params.set('hall', config.hall);
    params.set('address', config.address);
    if (config.invitationText) {
      params.set('text', config.invitationText);
    }
    if (bgTheme) {
      params.set('theme', bgTheme);
    }
    params.set('shared', 'true');

    const fullUrl = `${baseUrl}?${params.toString()}`;
    
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const themes = [
    {
      id: "combined",
      name: "👑 Combined Luxury Gold",
      desc: "Nền UTH Campus + Khung Chân dung Tân khoa",
    },
    {
      id: "uth-campus",
      name: "🏛️ UTH Campus Theme",
      desc: "Nền toàn cảnh khuôn viên UTH hoành tráng",
    },
    {
      id: "graduate-portrait",
      name: "🎓 Graduate Portrait Theme",
      desc: "Nền Chân dung Tân khoa mượt mà",
    },
    {
      id: "classic",
      name: "📜 Classic Parchment",
      desc: "Phong cách Giấy da Hoàng gia cổ điển",
    },
  ];

  return (
    <>
      {/* Slide-over Drawer Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Slide-over Drawer Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-full sm:max-w-md bg-[#FCFBF7] border-l border-accent/20 z-50 shadow-2xl flex flex-col transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-accent/15 flex items-center justify-between bg-[#FCFBF7]">
          <h3 className="text-lg font-serif font-bold text-[#002d62] flex items-center gap-2">
            <Settings className="w-4 h-4 text-accent animate-spin-slow" /> Cấu Hình Thiệp Mời
          </h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5 text-left">
          
          <div className="p-3 bg-accent/5 rounded-xl border border-accent/20 flex gap-2.5 items-start">
            <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-normal">
              <strong>Hướng dẫn:</strong> Chọn Theme hình nền bên dưới và chỉnh sửa các thông tin để tùy biến thiệp. Sau đó nhấn **Sao Chép Link** để gửi riêng cho từng người.
            </p>
          </div>

          {/* Background Theme Selector */}
          <div className="p-3.5 bg-gradient-to-br from-accent/10 to-transparent rounded-xl border border-accent/25">
            <label className="block text-xs font-bold text-[#002d62] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-accent" /> Chọn Theme / Hình Nền Thiệp
            </label>
            <div className="grid grid-cols-1 gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onBgThemeChange && onBgThemeChange(t.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col gap-0.5 ${
                    bgTheme === t.id
                      ? "bg-[#002d62] text-white border-accent shadow-md"
                      : "bg-white text-slate-700 border-slate-200 hover:border-accent/50 hover:bg-amber-50/50"
                  }`}
                >
                  <span className="text-xs font-bold">{t.name}</span>
                  <span
                    className={`text-[10px] ${
                      bgTheme === t.id ? "text-amber-200" : "text-slate-500"
                    }`}
                  >
                    {t.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Groups */}
          <div className="flex flex-col gap-4">
            
            {/* Guest personalization */}
            <div className="p-3 bg-accent/5 rounded-xl border border-accent/15">
              <label className="block text-xs font-bold text-[#002d62] uppercase tracking-wider mb-1">
                Tên Khách Mời Mặc Định
              </label>
              <input 
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Ví dụ: Bác Nam, Cô Út, Gia đình anh Hai..."
                className="w-full px-3 py-2 text-sm rounded bg-white border border-slate-350 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent shadow-inner transition-colors"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Link chia sẻ sẽ mặc định kính gửi tên khách mời này.
              </p>
            </div>

            {/* Graduate Name */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Tên Tân Khoa
              </label>
              <input 
                type="text"
                value={config.gradName}
                onChange={(e) => handleFieldChange('gradName', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-accent shadow-inner transition-colors"
              />
            </div>

            {/* Degree & Major */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Học Vị
                </label>
                <select
                  value={config.degree}
                  onChange={(e) => handleFieldChange('degree', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded bg-white border border-slate-300 text-slate-850 focus:outline-none focus:border-accent shadow-inner transition-colors"
                >
                  <option value="Cử nhân">Cử nhân</option>
                  <option value="Kỹ sư">Kỹ sư</option>
                  <option value="Thạc sĩ">Thạc sĩ</option>
                  <option value="Tiến sĩ">Tiến sĩ</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Ngành Học
                </label>
                <input 
                  type="text"
                  value={config.major}
                  onChange={(e) => handleFieldChange('major', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-accent shadow-inner transition-colors"
                />
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Ngày Lễ tốt nghiệp
                </label>
                <input 
                  type="date"
                  value={config.date}
                  onChange={(e) => handleFieldChange('date', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-accent shadow-inner transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Giờ Khai Mạc
                </label>
                <input 
                  type="time"
                  value={config.time}
                  onChange={(e) => handleFieldChange('time', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-accent shadow-inner transition-colors"
                />
              </div>
            </div>

            {/* Hall and Location */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Hội trường / Phòng lễ
              </label>
              <input 
                type="text"
                value={config.hall}
                onChange={(e) => handleFieldChange('hall', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-accent shadow-inner transition-colors"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Địa điểm tổ chức
              </label>
              <input 
                type="text"
                value={config.address}
                onChange={(e) => handleFieldChange('address', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-accent shadow-inner transition-colors"
              />
            </div>

            {/* Invitation Text */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Nội dung thư mời
              </label>
              <textarea 
                value={config.invitationText || ''}
                onChange={(e) => handleFieldChange('invitationText', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 text-sm rounded bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-accent shadow-inner transition-colors resize-none"
                placeholder="Nhập nội dung lời mời..."
              />
            </div>


          </div>
        </div>

        {/* Footer with Copy Link */}
        <div className="p-4 border-t border-accent/15 bg-[#FCFBF7] flex flex-col gap-2">
          <button
            onClick={generateShareLink}
            className={`w-full py-2.5 rounded-lg text-slate-950 font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
              copied 
                ? 'bg-emerald-500 border-emerald-400 text-white' 
                : 'bg-gradient-to-r from-accent to-accent-light hover:shadow-lg hover:shadow-accent/20 active:scale-98'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" /> Đã sao chép link mời!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Sao Chép Đường Dẫn Mời
              </>
            )}
          </button>
          <p className="text-[10px] text-slate-400 text-center">
            Link chứa toàn bộ các cài đặt bạn đã chỉnh sửa.
          </p>
        </div>
      </div>
    </>
  );
}
