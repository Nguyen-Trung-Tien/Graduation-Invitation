import { useRef, useState } from "react";
import { X, Printer, Info, Edit3, Eye, Download } from "lucide-react";
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
  // CRITICAL: Call all hooks BEFORE any conditional return to satisfy Rules of Hooks
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef(null);

  if (!isOpen) return null;

  const handleFieldChange = (field, value) => {
    onChange({
      ...config,
      [field]: value,
    });
  };

  const handlePrint = () => {
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const handleExportImage = async (format) => {
    if (!cardRef.current || isExporting) return;
    setIsExporting(true);

    try {
      await document.fonts.ready;
      await new Promise((resolve) => setTimeout(resolve, 200));

      const cardElement = cardRef.current.querySelector(".invitation-card");
      const targetElement = cardElement || cardRef.current;

      const cleanedName = (guestName || "Gia_Dinh")
        .trim()
        .replace(/[/\\?%*:|"<>\s]+/g, "_");
      const filename = `Thiep_Moi_Tot_Nghiep_${cleanedName}.${format}`;

      const options = {
        pixelRatio: 3,
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
          backgroundColor: "#FFFDF7",
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
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl bg-[#FFFDF7] border border-[#B38728]/35 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="px-5 py-4 border-b border-[#B38728]/20 flex items-center justify-between bg-[#FAF6ED]">
          <div className="text-left">
            <h3
              id="export-modal-title"
              className="text-base sm:text-lg font-serif font-bold text-[#002D62] flex items-center gap-2"
            >
              <Printer className="w-4 h-4 text-[#B38728]" />
              <span>Xem Trước & Xuất Bản Thiệp</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Chỉnh sửa thông tin thiệp bên trái, xem trước bản in và tải file bên phải.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng cửa sổ"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Two-Column Body */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#B38728]/15">
          {/* Left Column: Form Fields */}
          <div className="w-full md:w-[42%] overflow-y-auto p-4 sm:p-5 flex flex-col gap-3.5 text-left bg-white">
            <h4 className="text-xs font-bold text-[#002D62] uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <Edit3 className="w-3.5 h-3.5 text-[#B38728]" /> Chỉnh sửa thông tin thiệp
            </h4>

            {/* Guest Name */}
            <div>
              <label className="block text-xs font-bold text-[#002D62] uppercase tracking-wider mb-1">
                Kính gửi (Khách mời)
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => onGuestChange(e.target.value)}
                placeholder="Ví dụ: Bác Nam, Cô Út, Gia đình anh Hai..."
                className="w-full px-3 py-2 text-sm rounded-lg bg-[#FAF8F2] border border-slate-300 text-slate-800 focus:bg-white focus:outline-none focus:border-[#B38728] transition-colors"
              />
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

            {/* Date & Time */}
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

            {/* Hall & Address */}
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

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Địa điểm tổ chức
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
                Nội dung thư mời
              </label>
              <textarea
                value={config.invitationText || ""}
                onChange={(e) => handleFieldChange("invitationText", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 text-sm rounded-lg bg-[#FAF8F2] border border-slate-300 text-slate-800 focus:bg-white focus:outline-none focus:border-[#B38728] transition-colors resize-none"
                placeholder="Nhập nội dung lời mời..."
              />
            </div>

            {/* PDF Guidance Tip */}
            <div className="p-3 bg-[#FAF6ED] rounded-lg border border-[#B38728]/25 flex gap-2 items-start text-slate-700">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#B38728]" />
              <p className="text-[11px] leading-relaxed">
                <strong>Gợi ý lưu PDF:</strong> Trong hộp thoại in, chọn{" "}
                <strong>Lưu dưới dạng PDF (Save as PDF)</strong>. Khổ giấy in chuẩn là <strong>A5 (vừa khít thiệp mời, không thừa giấy)</strong>.
              </p>
            </div>
          </div>

          {/* Right Column: Preview */}
          <div className="w-full md:w-[58%] bg-[#FAF8F2] overflow-y-auto p-4 sm:p-6 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2 text-left">
              <Eye className="w-3.5 h-3.5 text-[#002D62]" /> Xem trước thiệp
            </h4>

            <div className="flex-1 flex items-start justify-center overflow-x-hidden min-h-[320px]">
              <div className="w-full origin-top scale-[0.85] sm:scale-95 flex justify-center">
                <div className="w-full pointer-events-none">
                  <InvitationCard config={config} guestName={guestName} hideCalendar={true} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions: UTH Palette (PDF Primary, PNG/JPG Secondary) */}
        <footer className="px-5 py-3.5 border-t border-[#B38728]/20 bg-[#FAF6ED] flex flex-wrap items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={isExporting}
            className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50"
          >
            Đóng
          </button>

          {/* Secondary Actions: PNG & JPG */}
          <button
            type="button"
            onClick={() => handleExportImage("png")}
            disabled={isExporting}
            className="px-3.5 py-2 rounded-lg border border-[#002D62]/30 bg-white hover:bg-[#002D62]/5 text-[#002D62] text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? "Đang xuất..." : "Tải ảnh PNG"}</span>
          </button>

          <button
            type="button"
            onClick={() => handleExportImage("jpg")}
            disabled={isExporting}
            className="px-3.5 py-2 rounded-lg border border-[#002D62]/30 bg-white hover:bg-[#002D62]/5 text-[#002D62] text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? "Đang xuất..." : "Tải ảnh JPG"}</span>
          </button>

          {/* Primary Action: PDF */}
          <button
            type="button"
            onClick={handlePrint}
            disabled={isExporting}
            className="px-5 py-2 rounded-lg bg-[#002D62] hover:bg-[#001D42] text-white text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-[#002D62]/20 disabled:opacity-50"
          >
            <Printer className="w-4 h-4 text-[#DFC479]" />
            <span>Tải File PDF / In Thiệp</span>
          </button>
        </footer>
      </div>

      {/* Off-screen high-res invitation container for export */}
      <div
        className="absolute -left-[9999px] -top-[9999px] pointer-events-none"
        style={{ width: "672px" }}
      >
        <div ref={cardRef}>
          <InvitationCard config={config} guestName={guestName} hideCalendar={true} />
        </div>
      </div>
    </div>
  );
}
