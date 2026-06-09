import React, { useState, useEffect } from 'react';

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isExpired, setIsExpired] = useState(false);

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    } else {
      return null;
    }

    return timeLeft;
  }

  useEffect(() => {
    // Initial check
    const initial = calculateTimeLeft();
    if (!initial) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      if (!remaining) {
        setIsExpired(true);
        clearInterval(timer);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const addLeadingZero = (num) => {
    return String(num).padStart(2, '0');
  };

  if (isExpired) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center border border-accent/20 rounded-xl glass-light max-w-md mx-auto">
        <span className="text-xl font-serif text-accent text-glow animate-pulse">
          🎓 Buổi lễ đang diễn ra hoặc đã kết thúc tốt đẹp!
        </span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-4">
      <h4 className="text-xs tracking-[0.2em] font-medium uppercase text-slate-400">
        Đếm ngược đến ngày trọng đại
      </h4>
      <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full">
        {/* Days */}
        <div className="flex flex-col items-center p-3 rounded-lg glass-light border border-accent/10 relative overflow-hidden group hover:border-accent/30 transition-colors">
          <span className="text-2xl sm:text-4xl font-bold font-serif text-accent text-glow">
            {addLeadingZero(timeLeft.days)}
          </span>
          <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest mt-1">
            Ngày
          </span>
          <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        {/* Hours */}
        <div className="flex flex-col items-center p-3 rounded-lg glass-light border border-accent/10 relative overflow-hidden group hover:border-accent/30 transition-colors">
          <span className="text-2xl sm:text-4xl font-bold font-serif text-accent text-glow">
            {addLeadingZero(timeLeft.hours)}
          </span>
          <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest mt-1">
            Giờ
          </span>
          <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        {/* Minutes */}
        <div className="flex flex-col items-center p-3 rounded-lg glass-light border border-accent/10 relative overflow-hidden group hover:border-accent/30 transition-colors">
          <span className="text-2xl sm:text-4xl font-bold font-serif text-accent text-glow">
            {addLeadingZero(timeLeft.minutes)}
          </span>
          <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest mt-1">
            Phút
          </span>
          <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        {/* Seconds */}
        <div className="flex flex-col items-center p-3 rounded-lg glass-light border border-accent/10 relative overflow-hidden group hover:border-accent/30 transition-colors">
          <span className="text-2xl sm:text-4xl font-bold font-serif text-accent text-glow">
            {addLeadingZero(timeLeft.seconds)}
          </span>
          <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest mt-1">
            Giây
          </span>
          <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </div>
    </div>
  );
}
