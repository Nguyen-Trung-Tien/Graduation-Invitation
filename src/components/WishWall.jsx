import React, { useState, useEffect } from 'react';
import { Send, Heart, CalendarCheck, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WishWall({ defaultGuestName, onRSVP }) {
  const [name, setName] = useState(defaultGuestName || '');
  const [status, setStatus] = useState('will_attend'); // 'will_attend', 'cannot_attend'
  const [message, setMessage] = useState('');
  const [wishes, setWishes] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Sync defaultGuestName with name state if it changes
  useEffect(() => {
    if (defaultGuestName) {
      setName(defaultGuestName);
    }
  }, [defaultGuestName]);

  // Load wishes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('uth_graduation_wishes');
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Default wishes to fill space beautifully
      const defaults = [
        {
          name: "Bố Mẹ",
          status: "will_attend",
          message: "Chúc mừng con yêu đã tốt nghiệp xuất sắc! Cả nhà tự hào về con.",
          date: new Date(2026, 5, 9).toLocaleDateString('vi-VN')
        },
        {
          name: "Chú Út",
          status: "will_attend",
          message: "Chúc mừng cháu trai tốt nghiệp kỹ sư UTH! Chúc cháu vững bước trên con đường tương lai.",
          date: new Date(2026, 5, 9).toLocaleDateString('vi-VN')
        },
        {
          name: "Anh Hai",
          status: "will_attend",
          message: "Tuyệt vời em trai ơi! Ra trường rồi nỗ lực làm việc nha, chúc mừng em!",
          date: new Date(2026, 5, 8).toLocaleDateString('vi-VN')
        }
      ];
      setWishes(defaults);
      localStorage.setItem('uth_graduation_wishes', JSON.stringify(defaults));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newWish = {
      name: name.trim(),
      status,
      message: message.trim() || (status === 'will_attend' ? 'Chúc mừng bạn tốt nghiệp nhé!' : 'Chúc mừng bạn tốt nghiệp tốt đẹp!'),
      date: new Date().toLocaleDateString('vi-VN')
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('uth_graduation_wishes', JSON.stringify(updated));

    if (status === 'will_attend') {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#d4af37', '#ffffff', '#002d62']
      });
    }

    setSubmitted(true);
    setMessage('');
    
    if (onRSVP) {
      onRSVP(newWish);
    }

    // Reset success banner after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* RSVP Form */}
      <div className="glass rounded-2xl p-6 border border-accent/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl pointer-events-none"></div>
        <h3 className="text-xl sm:text-2xl font-serif text-accent mb-2 flex items-center justify-center gap-2">
          <CalendarCheck className="w-5 h-5" /> Xác Nhận Tham Dự & Lời Chúc
        </h3>
        <p className="text-xs text-slate-400 mb-6 max-w-md mx-auto">
          Sự hiện diện của quý khách là niềm vinh hạnh lớn cho tôi và gia đình trong buổi lễ tốt nghiệp này.
        </p>

        {submitted ? (
          <div className="py-8 px-4 flex flex-col items-center justify-center text-center rounded-xl bg-accent/10 border border-accent/30 animate-fade-in">
            <Heart className="w-12 h-12 text-accent fill-accent/20 animate-bounce mb-3" />
            <h4 className="text-lg font-serif text-accent font-semibold mb-1">Cảm Ơn Lời Chúc Của Bạn!</h4>
            <p className="text-sm text-slate-300">
              Phản hồi RSVP và lời chúc của bạn đã được ghi nhận. Rất mong được gặp bạn tại lễ tốt nghiệp!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left max-w-lg mx-auto">
            {/* Guest Name */}
            <div>
              <label htmlFor="guest-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Tên Của Bạn / Gia Đình
              </label>
              <input
                id="guest-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên của bạn hoặc gia đình..."
                className="w-full px-4 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Attendance Status */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Xác Nhận Tham Dự
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setStatus('will_attend')}
                  className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    status === 'will_attend'
                      ? 'bg-accent/15 border-accent text-accent shadow-md shadow-accent/5'
                      : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-base">🥳</span> Sẽ tham dự
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('cannot_attend')}
                  className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    status === 'cannot_attend'
                      ? 'bg-red-500/10 border-red-500/40 text-red-400 shadow-md'
                      : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-base">😢</span> Rất tiếc vắng mặt
                </button>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="guest-message" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Lời Chúc Cho Tân Khoa
              </label>
              <textarea
                id="guest-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Gửi lời chúc mừng, động viên đến tân khoa..."
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-accent transition-colors resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-2 w-full py-3 rounded-lg bg-gradient-to-r from-accent to-accent-light text-slate-950 font-bold hover:shadow-lg hover:shadow-accent/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md border border-accent-light/50"
            >
              <Send className="w-4 h-4" /> Gửi Lời Chúc & Xác Nhận
            </button>
          </form>
        )}
      </div>

      {/* Wishes Wall List */}
      <div className="flex flex-col gap-4">
        <h4 className="text-lg font-serif text-accent tracking-wider font-semibold">
          ✨ Hộp Thư Chúc Mừng ({wishes.length})
        </h4>
        
        {wishes.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-sm">
            Chưa có lời chúc nào. Hãy là người đầu tiên chúc mừng!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-accent/20">
            {wishes.map((wish, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl glass-light border border-slate-800 text-left hover:border-accent/30 transition-colors flex flex-col justify-between gap-3 relative"
              >
                <div className="absolute top-3 right-3 text-lg">
                  {wish.status === 'will_attend' ? (
                    <span title="Sẽ tham dự">🎉</span>
                  ) : (
                    <span title="Vắng mặt">✉️</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif font-bold text-accent text-sm">
                      {wish.name}
                    </span>
                    <span className="text-[9px] text-slate-500">
                      {wish.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 italic font-light leading-relaxed whitespace-pre-line">
                    "{wish.message}"
                  </p>
                </div>

                <div className="text-[10px] self-end mt-1 text-slate-400">
                  {wish.status === 'will_attend' ? (
                    <span className="text-emerald-400 font-medium">✓ Sẽ tham dự lễ</span>
                  ) : (
                    <span className="text-slate-400 italic">Vắng mặt (đã gửi chúc)</span>
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
