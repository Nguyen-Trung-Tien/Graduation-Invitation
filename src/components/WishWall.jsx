import { useState, useEffect } from "react";
import { Send, Heart, CalendarCheck } from "lucide-react";
import confetti from "canvas-confetti";

const DEFAULT_WISHES = [
  {
    name: "Bố Mẹ",
    status: "will_attend",
    message: "Chúc mừng con yêu đã tốt nghiệp xuất sắc! Cả nhà tự hào về con.",
    date: "09/06/2026",
  },
  {
    name: "Chú Út",
    status: "will_attend",
    message:
      "Chúc mừng cháu trai tốt nghiệp kỹ sư UTH! Chúc cháu vững bước trên con đường tương lai.",
    date: "09/06/2026",
  },
  {
    name: "Anh Hai",
    status: "will_attend",
    message:
      "Tuyệt vời em trai ơi! Ra trường rồi nỗ lực làm việc nha, chúc mừng em!",
    date: "08/06/2026",
  },
];

export default function WishWall({ defaultGuestName, onRSVP }) {
  const [name, setName] = useState(defaultGuestName || "");
  const [status, setStatus] = useState("will_attend");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Lazy initialize wishes from localStorage without causing cascade renders
  const [wishes, setWishes] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_WISHES;
    const saved = localStorage.getItem("uth_graduation_wishes");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_WISHES;
  });

  // Track previous defaultGuestName to update name safely
  const [prevDefaultGuest, setPrevDefaultGuest] = useState(defaultGuestName);
  if (defaultGuestName !== prevDefaultGuest) {
    setPrevDefaultGuest(defaultGuestName);
    setName(defaultGuestName || "");
  }

  // Persist wishes to localStorage when updated
  useEffect(() => {
    localStorage.setItem("uth_graduation_wishes", JSON.stringify(wishes));
  }, [wishes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newWish = {
      name: name.trim(),
      status,
      message:
        message.trim() ||
        (status === "will_attend"
          ? "Chúc mừng bạn tốt nghiệp nhé!"
          : "Chúc mừng bạn tốt nghiệp tốt đẹp!"),
      date: new Date().toLocaleDateString("vi-VN"),
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);

    if (status === "will_attend") {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#B38728", "#FFFFFF", "#002D62"],
        disableForReducedMotion: true,
      });
    }

    setSubmitted(true);
    setMessage("");

    if (onRSVP) {
      onRSVP(newWish);
    }

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* RSVP Form */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#B38728]/25 shadow-xs relative overflow-hidden">
        <h3 className="text-lg sm:text-xl font-serif text-[#002D62] font-bold mb-1.5 flex items-center justify-center gap-2">
          <CalendarCheck className="w-5 h-5 text-[#B38728]" />
          <span>Xác Nhận Tham Dự & Gửi Lời Chúc</span>
        </h3>
        <p className="text-xs text-slate-500 mb-5 max-w-md mx-auto text-center">
          Sự hiện diện của quý khách là niềm vinh hạnh lớn cho tôi và gia đình trong buổi lễ tốt nghiệp này.
        </p>

        {submitted ? (
          <div className="py-6 px-4 flex flex-col items-center justify-center text-center rounded-xl bg-[#FAF6ED] border border-[#B38728]/30">
            <Heart className="w-10 h-10 text-[#B38728] fill-[#B38728]/20 mb-2" />
            <h4 className="text-base font-serif text-[#002D62] font-bold mb-0.5">
              Cảm Ơn Lời Chúc Của Bạn!
            </h4>
            <p className="text-xs text-slate-600">
              Phản hồi và lời chúc của bạn đã được ghi nhận. Rất mong được gặp bạn tại lễ tốt nghiệp!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 text-left max-w-lg mx-auto">
            {/* Guest Name */}
            <div>
              <label htmlFor="rsvp-guest-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Tên Của Bạn / Gia Đình
              </label>
              <input
                id="rsvp-guest-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên của bạn hoặc gia đình..."
                className="w-full px-3.5 py-2 text-sm rounded-lg bg-[#FAF8F2] border border-slate-300 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#B38728] transition-colors"
              />
            </div>

            {/* Attendance Status */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Xác Nhận Tham Dự
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setStatus("will_attend")}
                  className={`py-2 px-3 rounded-lg border text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    status === "will_attend"
                      ? "bg-[#002D62] text-white border-[#002D62] shadow-xs"
                      : "bg-[#FAF8F2] border-slate-300 text-slate-700 hover:border-slate-400"
                  }`}
                >
                  <span>Sẽ tham dự</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("cannot_attend")}
                  className={`py-2 px-3 rounded-lg border text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    status === "cannot_attend"
                      ? "bg-slate-700 text-white border-slate-700 shadow-xs"
                      : "bg-[#FAF8F2] border-slate-300 text-slate-700 hover:border-slate-400"
                  }`}
                >
                  <span>Rất tiếc vắng mặt</span>
                </button>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="rsvp-guest-message" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Lời Chúc Cho Tân Khoa
              </label>
              <textarea
                id="rsvp-guest-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Gửi lời chúc mừng, động viên đến tân khoa..."
                rows={3}
                className="w-full px-3.5 py-2 text-sm rounded-lg bg-[#FAF8F2] border border-slate-300 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#B38728] transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-1 w-full py-2.5 rounded-lg bg-[#002D62] hover:bg-[#001D42] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Send className="w-4 h-4 text-[#DFC479]" />
              <span>Gửi Lời Chúc & Xác Nhận</span>
            </button>
          </form>
        )}
      </div>

      {/* Wishes List */}
      <div className="flex flex-col gap-3">
        <h4 className="text-base font-serif text-[#002D62] font-bold text-center">
          Hộp Thư Chúc Mừng ({wishes.length})
        </h4>

        {wishes.length === 0 ? (
          <p className="text-center py-4 text-slate-500 text-xs">
            Chưa có lời chúc nào. Hãy là người đầu tiên chúc mừng!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-1">
            {wishes.map((wish, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white border border-[#B38728]/20 text-left flex flex-col justify-between gap-2 shadow-xs"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-serif font-bold text-[#002D62] text-sm">
                      {wish.name}
                    </span>
                    <span className="text-[10px] text-slate-400">{wish.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 italic font-light mt-1 leading-relaxed whitespace-pre-line">
                    "{wish.message}"
                  </p>
                </div>

                <div className="text-[11px] self-end text-slate-500">
                  {wish.status === "will_attend" ? (
                    <span className="text-[#002D62] font-semibold">✓ Sẽ tham dự</span>
                  ) : (
                    <span className="italic">Vắng mặt (đã chúc)</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
