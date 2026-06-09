import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MailOpen } from "lucide-react";

export default function Envelope({ guestName, onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Duration for flap to open and letter to slide up before transitioning to card view
    setTimeout(() => {
      onOpen();
    }, 1800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-transparent">
      {/* Decorative ambient background lights */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-[400px] sm:h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-[400px] sm:h-[400px] bg-rose-500/8 rounded-full blur-[100px] pointer-events-none animate-blob-delayed"></div>

      <div className="stars"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[500px] flex flex-col items-center gap-6 z-10"
      >
        {/* Helper Instructions */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-center flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold font-sans">
            LỄ TỐT NGHIỆP 2026
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#002d62] font-extrabold mt-1 tracking-wide">
            THƯ MỜI
          </h2>
        </motion.div>

        {/* Outer 3D Envelope Container */}
        <div
          className="w-full aspect-[1.5/1] relative perspective-1000 cursor-pointer"
          onClick={handleOpen}
        >
          {/* Flap & Envelope Wrapper */}
          <motion.div
            whileHover={
              !isOpening ? { scale: 1.02, rotateY: 3, rotateX: 3 } : {}
            }
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-full h-full relative preserve-3d"
          >
            {/* The Back Layer of Envelope (holds the letter inside) */}
            <div className="absolute inset-0 bg-[#002d62] rounded-2xl border-2 border-accent/40 shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex items-center justify-center overflow-hidden">
              {/* Decorative interior pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#003a80_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
            </div>

            {/* Letter Layer (Slides out when opened) */}
            <motion.div
              initial={{ y: 0, scale: 0.95 }}
              animate={isOpening ? { y: "-50%", scale: 1, z: 10 } : {}}
              transition={{ delay: 0.6, duration: 1, ease: "easeInOut" }}
              className="absolute inset-x-4 top-4 bottom-4 bg-[#fcfbf7] rounded-xl border border-amber-800/20 shadow-md p-6 flex flex-col items-center justify-between text-slate-900 pointer-events-none z-10"
            >
              <div className="w-8 h-8 rounded-full border border-amber-800/10 flex items-center justify-center">
                <span className="text-xs font-serif font-semibold text-amber-800">
                  UTH
                </span>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-[10px] uppercase tracking-widest text-amber-800/60 font-semibold">
                  Lễ Tốt Nghiệp
                </p>
                <h3 className="text-lg font-serif font-bold text-slate-950 mt-1">
                  THIỆP MỜI
                </h3>
              </div>
              <div className="w-16 h-[1px] bg-amber-800/20"></div>
            </motion.div>

            {/* Left Flap */}
            <div 
              className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#002b5c] to-[#002247] rounded-l-2xl border-l border-y border-accent/10 pointer-events-none z-20 shadow-md"
              style={{ clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)" }}
            />

            {/* Right Flap */}
            <div 
              className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#002b5c] to-[#002247] rounded-r-2xl border-r border-y border-accent/10 pointer-events-none z-20 shadow-md"
              style={{ clipPath: "polygon(100% 0%, 0% 50%, 100% 100%)" }}
            />

            {/* Bottom Flap */}
            <div 
              className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#001c3d] to-[#002b5c] rounded-b-2xl border-b border-x border-accent/15 pointer-events-none z-21 shadow-lg"
              style={{ clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)" }}
            />

            {/* Guest Name Label Card */}
            <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[75%] sm:w-[65%] bg-[#FCFBF7] border-2 border-double border-accent/40 rounded-xl p-2.5 text-center shadow-lg pointer-events-none z-22 select-none">
              <span className="text-[9px] tracking-[0.2em] text-slate-400 font-bold uppercase block mb-0.5">
                Kính gửi
              </span>
              <h1
                className="text-xl sm:text-2xl font-handwriting text-[#002d62] font-normal leading-normal text-glow"
                style={{ letterSpacing: "0.04em", wordSpacing: "0.15em" }}
              >
                {guestName || "Toàn thể Đại gia đình"}
              </h1>
            </div>

            {/* Top Flap (Rotating flap) */}
            <motion.div
              style={{ originY: 0 }}
              animate={
                isOpening
                  ? { rotateX: 180, zIndex: 0 }
                  : { rotateX: 0, zIndex: 25 }
              }
              transition={{ duration: 0.6, ease: "easeInOut" }}
              // creates a triangular flap shape
              className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#003c80] to-[#00224d] rounded-t-2xl border-t border-x border-accent/20 pointer-events-none origin-top shadow-md"
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
                originY: 0,
              }}
            />

            {/* Gold Wax Seal (Fades out or rotates down when opening) */}
            <motion.div
              animate={
                isOpening
                  ? { scale: 0, opacity: 0, y: 30 }
                  : { scale: 1, opacity: 1 }
              }
              transition={{ duration: 0.4 }}
              className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-30 flex items-center justify-center"
            >
              {/* Wax circle */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-accent via-accent-light to-accent border border-accent-light/40 flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.5)] active:scale-95 duration-100 hover:brightness-110">
                {/* Embedded seal icon */}
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-950/20 flex flex-col items-center justify-center text-slate-950 font-serif">
                  <span className="text-xs">🎓</span>
                  <span className="text-[8px] font-bold tracking-widest font-sans mt-0.5">
                    UTH
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Small Instruction below envelope */}
        <motion.p
          animate={{ opacity: isOpening ? 0 : [0.4, 0.9, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xs text-slate-400 mt-2 flex items-center gap-1.5 pointer-events-none"
        >
          <MailOpen className="w-3.5 h-3.5 text-accent" /> Chạm vào phong bì để
          mở thư
        </motion.p>
      </motion.div>
    </div>
  );
}
