import { useState, useEffect } from "react";

function calculateTimeLeft(targetDate) {
  const difference = +new Date(targetDate) - +new Date();
  if (difference <= 0 || isNaN(difference)) {
    return null;
  }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft(targetDate);
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const addLeadingZero = (num) => String(num).padStart(2, "0");

  if (!timeLeft) {
    return (
      <div className="flex flex-col items-center justify-center p-5 text-center border border-[#B38728]/30 rounded-xl bg-white/80 max-w-md mx-auto shadow-xs">
        <span className="text-base sm:text-lg font-serif text-[#002D62] font-semibold">
          🎓 Buổi lễ đang diễn ra hoặc đã kết thúc tốt đẹp!
        </span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-3">
      <h4 className="text-xs tracking-wider font-semibold uppercase text-slate-500">
        Đếm ngược đến ngày khai mạc
      </h4>
      <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full">
        {/* Days */}
        <div className="flex flex-col items-center p-2.5 sm:p-3 rounded-xl bg-white border border-[#B38728]/25 shadow-xs">
          <span className="text-xl sm:text-3xl font-bold font-serif text-[#002D62]">
            {addLeadingZero(timeLeft.days)}
          </span>
          <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider mt-0.5">
            Ngày
          </span>
        </div>

        {/* Hours */}
        <div className="flex flex-col items-center p-2.5 sm:p-3 rounded-xl bg-white border border-[#B38728]/25 shadow-xs">
          <span className="text-xl sm:text-3xl font-bold font-serif text-[#002D62]">
            {addLeadingZero(timeLeft.hours)}
          </span>
          <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider mt-0.5">
            Giờ
          </span>
        </div>

        {/* Minutes */}
        <div className="flex flex-col items-center p-2.5 sm:p-3 rounded-xl bg-white border border-[#B38728]/25 shadow-xs">
          <span className="text-xl sm:text-3xl font-bold font-serif text-[#002D62]">
            {addLeadingZero(timeLeft.minutes)}
          </span>
          <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider mt-0.5">
            Phút
          </span>
        </div>

        {/* Seconds */}
        <div className="flex flex-col items-center p-2.5 sm:p-3 rounded-xl bg-white border border-[#B38728]/25 shadow-xs">
          <span className="text-xl sm:text-3xl font-bold font-serif text-[#B38728]">
            {addLeadingZero(timeLeft.seconds)}
          </span>
          <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider mt-0.5">
            Giây
          </span>
        </div>
      </div>
    </div>
  );
}
