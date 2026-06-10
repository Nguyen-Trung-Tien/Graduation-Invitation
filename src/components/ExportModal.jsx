import React, { useRef, useState } from "react";
import { X, Printer, Info, Edit3, Eye, Image } from "lucide-react";
import { toPng, toJpeg } from "html-to-image";
import InvitationCard from "./InvitationCard";

export default function ExportModal({
  isOpen,
  onClose,
  config,
  onChange,
  guestName,
  onGuestChange,
}) {
  if (!isOpen) return null;

  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef(null);

  const handleFieldChange = (field, value) => {
    onChange({
      ...config,
      [field]: value,
    });
  };

  const handlePrint = () => {
    // Small delay to ensure all DOM updates are flushed before opening print dialog
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const handleExportImage = async (format) => {
    if (!cardRef.current || isExporting) return;
    setIsExporting(true);

    try {
      // Wait for fonts to be ready
      await document.fonts.ready;

      // Additional short delay to ensure browser layout is stable
      await new Promise((resolve) => setTimeout(resolve, 250));

      const cardElement = cardRef.current.querySelector(".invitation-card");
      const targetElement = cardElement || cardRef.current;

      const cleanedName = (guestName || "Gia_Dinh")
        .trim()
        .replace(/[\/\\?%*:|"<>\s]+/g, "_");
      const filename = `Thiep_Moi_Tot_Nghiep_${cleanedName}.${format}`;

      const options = {
        pixelRatio: 3, // 3x scale for crispness
        cacheBust: true,
        style: {
          margin: "0",
          boxShadow: "none",
          transform: "none",
        },
      };

      let dataUrl;
      if (format === "png") {
        dataUrl = await toPng(targetElement, options);
      } else {
        dataUrl = await toJpeg(targetElement, {
          ...options,
          quality: 0.95,
          backgroundColor: "#ffffff", // avoid black corners in JPG
        });
      }

      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error exporting image:", error);
      alert("Đã xảy ra lỗi khi xuất ảnh. Vui lòng thử lại!");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div
        className="w-full max-w-6xl bg-[#FCFBF7] border border-accent/30 rounded-2xl shadow-2xl flex flex-col max-h-[95vh] sm:max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-accent/15 flex items-center justify-between bg-[#FCFBF7]">
          <div className="text-left">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#002d62] flex items-center gap-2">
              <Printer className="w-5 h-5 text-accent animate-pulse" /> Xem
              Trước & Xuất Bản Thiệp
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Chỉnh sửa thông tin nhanh bên trái, xem trước và tải thiệp dạng
              PDF hoặc ảnh PNG/JPG sắc nét bên phải.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Two-Column Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-accent/15">
          {/* Left Column: Editable Form Fields */}
          <div className="w-full md:w-[40%] overflow-y-auto p-4 sm:p-6 flex flex-col gap-4 text-left bg-white">
            <h4 className="text-xs font-bold text-[#002d62] uppercase tracking-widest flex items-center gap-1.5 border-b border-accent/10 pb-2">
              <Edit3 className="w-3.5 h-3.5" /> Chỉnh sửa thông tin thiệp
            </h4>

            {/* Guest personalization */}
            <div className="p-3 bg-accent/5 rounded-xl border border-accent/15">
              <label className="block text-xs font-bold text-[#002d62] uppercase tracking-wider mb-1">
                Kính Gửi (Khách Mời)
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => onGuestChange(e.target.value)}
                placeholder="Ví dụ: Bác Nam, Cô Út, Gia đình anh Hai..."
                className="w-full px-3 py-2 text-sm rounded bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-accent shadow-inner transition-colors"
              />
            </div>

            {/* Graduate Name */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Tên Tân Khoa
              </label>
              <input
                type="text"
                value={config.gradName}
                onChange={(e) => handleFieldChange("gradName", e.target.value)}
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
                  onChange={(e) => handleFieldChange("degree", e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-accent shadow-inner transition-colors"
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
                  onChange={(e) => handleFieldChange("major", e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-accent shadow-inner transition-colors"
                />
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Ngày Lễ
                </label>
                <input
                  type="date"
                  value={config.date}
                  onChange={(e) => handleFieldChange("date", e.target.value)}
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
                  onChange={(e) => handleFieldChange("time", e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-accent shadow-inner transition-colors"
                />
              </div>
            </div>

            {/* Hall */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Hội trường / Phòng lễ
              </label>
              <input
                type="text"
                value={config.hall}
                onChange={(e) => handleFieldChange("hall", e.target.value)}
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
                onChange={(e) => handleFieldChange("address", e.target.value)}
                className="w-full px-3 py-2 text-sm rounded bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-accent shadow-inner transition-colors"
              />
            </div>

            {/* Invitation Text */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Nội dung thư mời
              </label>
              <textarea
                value={config.invitationText || ""}
                onChange={(e) =>
                  handleFieldChange("invitationText", e.target.value)
                }
                rows={3}
                className="w-full px-3 py-2 text-sm rounded bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-accent shadow-inner transition-colors resize-none"
                placeholder="Nhập nội dung lời mời..."
              />
            </div>

            <div className="mt-2 p-3 bg-blue-50/50 rounded-xl border border-blue-150 flex gap-2 items-start text-blue-800">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" />
              <p className="text-[10px] leading-normal font-medium">
                <strong>Gợi ý lưu PDF:</strong> Trong cửa sổ in hiện ra, tại mục{" "}
                <strong>Máy in đích (Destination)</strong>, vui lòng chọn{" "}
                <strong>Lưu dưới dạng PDF (Save as PDF)</strong> để tải file về
                máy.
              </p>
            </div>
          </div>

          {/* Right Column: Visual Invitation Preview */}
          <div className="w-full md:w-[60%] bg-slate-100 overflow-y-auto p-4 sm:p-8 flex flex-col gap-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-200 pb-2 text-left">
              <Eye className="w-3.5 h-3.5" /> Xem trước bản in thiệp
            </h4>

            {/* Printable Invitation Preview Container */}
            <div className="flex-1 flex items-start justify-center overflow-x-hidden min-h-[300px]">
              {/* Scale invitation wrapper to fit on desktop viewports nicely */}
              <div className="w-full max-w-full origin-top scale-[0.9] sm:scale-100 flex justify-center">
                <div className="w-full pointer-events-none">
                  <InvitationCard config={config} guestName={guestName} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-accent/15 bg-[#FCFBF7] flex flex-wrap justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isExporting}
            className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Đóng
          </button>

          <button
            onClick={handlePrint}
            disabled={isExporting}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-accent to-accent-light hover:shadow-lg hover:shadow-accent/20 active:scale-98 text-slate-950 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Printer className="w-4 h-4" /> Tải File PDF / In Ngay
          </button>

          <button
            onClick={() => handleExportImage("png")}
            disabled={isExporting}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md hover:shadow-emerald-500/20 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Image className="w-4 h-4" />
            )}
            {isExporting ? "Đang xuất PNG..." : "Xuất Ảnh PNG"}
          </button>

          <button
            onClick={() => handleExportImage("jpg")}
            disabled={isExporting}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-500 hover:to-purple-400 text-white font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md hover:shadow-indigo-500/20 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Image className="w-4 h-4" />
            )}
            {isExporting ? "Đang xuất JPG..." : "Xuất Ảnh JPG"}
          </button>
        </div>
      </div>

      {/* Off-screen invitation container for exporting high-resolution images */}
      <div
        className="absolute -left-[9999px] -top-[9999px] pointer-events-none"
        style={{ width: "672px" }}
      >
        <div ref={cardRef}>
          <InvitationCard config={config} guestName={guestName} />
        </div>
      </div>
    </div>
  );
}
