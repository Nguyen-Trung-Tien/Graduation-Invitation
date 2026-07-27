import React, { useState } from "react";
import { motion } from "framer-motion";
import { MailOpen, Sparkles, GraduationCap } from "lucide-react";

import uthCampusImg from "../assets/Hinh_UTH.jpg";
import gradPortraitImg from "../assets/1000011633-9970-7187.jpg";

export default function Envelope({ guestName, bgTheme = "combined", onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Duration for flap to open and letter to slide up before transitioning to card view
    setTimeout(() => {
      onOpen();
    }, 1850);
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-4 relative overflow-hidden bg-transparent">
      {/* Dynamic Merged Atmospheric Backdrop (100% Sharp & Bright) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0b1329] transition-all duration-500">
        {/* Theme: combined or uth-campus */}
        {(bgTheme === "combined" || bgTheme === "uth-campus") && (
          <div
            className={`absolute inset-y-0 left-0 ${
              bgTheme === "combined" ? "w-full sm:w-1/2" : "w-full"
            } overflow-hidden transition-all duration-500 opacity-100`}
          >
            <img
              src={uthCampusImg}
              alt="UTH Campus Background"
              className="w-full h-full object-cover object-center scale-100 filter brightness-105 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-[#0b1329]/80" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          </div>
        )}

        {/* Theme: combined or graduate-portrait */}
        {(bgTheme === "combined" || bgTheme === "graduate-portrait") && (
          <div
            className={`absolute inset-y-0 right-0 ${
              bgTheme === "combined" ? "w-full sm:w-1/2" : "w-full"
            } overflow-hidden transition-all duration-500 opacity-100`}
          >
            <img
              src={gradPortraitImg}
              alt="Graduate Portrait Background"
              className="w-full h-full object-cover object-top scale-100 filter brightness-105 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/10 via-transparent to-[#0b1329]/80" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          </div>
        )}

        {/* Light ambient center shadow for contrast */}
        <div
          className="absolute inset-0 pointer-events-none z-1"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(11,19,41,0.45) 80%, rgba(11,19,41,0.75) 100%)",
          }}
        />

        {/* Ambient Glowing Light Blobs */}
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none animate-blob" />
        <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-amber-500/12 rounded-full blur-[120px] pointer-events-none animate-blob-delayed" />

        <div className="stars" />
      </div>

      <div className="stars" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[520px] flex flex-col items-center gap-6 z-10"
      >
        {/* Header Invitation Tagline */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-center flex flex-col items-center gap-1.5 pointer-events-none"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#001d42]/80 backdrop-blur-md border border-[#b38728]/40 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#b38728]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#f3e5ab] font-bold font-sans">
              ĐẠI HỌC GIAO THÔNG VẬN TẢI TP.HCM
            </span>
          </div>

          <h2
            className="text-2xl sm:text-3xl font-serif text-white font-black mt-1 tracking-wide drop-shadow-md uppercase"
            style={{
              textShadow: "0 2px 10px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.3)",
            }}
          >
            THƯ MỜI LỄ TỐT NGHIỆP
          </h2>
        </motion.div>

        {/* Outer 3D Envelope Container */}
        <div
          className="w-full aspect-[1.52/1] relative perspective-1000 cursor-pointer group"
          onClick={handleOpen}
        >
          {/* Flap & Envelope Wrapper */}
          <motion.div
            whileHover={
              !isOpening ? { scale: 1.025, rotateY: 2, rotateX: 2 } : {}
            }
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="w-full h-full relative preserve-3d"
          >
            {/* Back Interior Layer (Holds the letter inside) */}
            <div className="absolute inset-0 bg-[#001a3b] rounded-2xl border-2 border-[#b38728]/45 shadow-[0_25px_60px_rgba(0,0,0,0.55)] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#003a80_1px,transparent_1px)] [background-size:16px_16px] opacity-35" />
            </div>

            {/* Letter Sheet (Slides out when opened) */}
            <motion.div
              initial={{ y: 0, scale: 0.95 }}
              animate={isOpening ? { y: "-46%", scale: 1, z: 10 } : {}}
              transition={{ delay: 0.55, duration: 1.1, ease: "easeInOut" }}
              className="absolute inset-x-3 sm:inset-x-4 top-3 sm:top-4 bottom-3 sm:bottom-4 card-paper-texture rounded-xl border-2 border-[#b38728]/35 shadow-xl p-3 sm:p-4 flex flex-col items-center justify-between text-slate-900 pointer-events-none z-10"
            >
              {/* Graduation Cap Crest Emblem Badge */}
              <div className="w-12 h-12 rounded-full border-2 border-[#b38728] bg-[#001d42]/8 flex items-center justify-center shadow-md">
                <GraduationCap className="w-6 h-6 text-[#002d62]" />
              </div>

              <div className="flex flex-col items-center text-center">
                <p className="text-[8.5px] uppercase tracking-[0.24em] text-[#7a5c10] font-bold">
                  Trường ĐH Giao Thông Vận Tải TP.HCM
                </p>
                <h3 className="text-base sm:text-lg font-serif font-black text-[#002d62] mt-0.5 tracking-wide">
                  THƯ MỜI TRÂN TRỌNG
                </h3>
              </div>
              <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#b38728] to-transparent" />
            </motion.div>

            {/* Left Flap */}
            <div
              className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#002b5c] via-[#002247] to-[#001938] rounded-l-2xl border-l-2 border-y border-[#b38728]/25 pointer-events-none z-20 shadow-md"
              style={{ clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)" }}
            />

            {/* Right Flap */}
            <div
              className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#002b5c] via-[#002247] to-[#001938] rounded-r-2xl border-r-2 border-y border-[#b38728]/25 pointer-events-none z-20 shadow-md"
              style={{ clipPath: "polygon(100% 0%, 0% 50%, 100% 100%)" }}
            />

            {/* Bottom Flap */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#001530] via-[#00234a] to-[#002b5c] rounded-b-2xl border-b-2 border-x border-[#b38728]/30 pointer-events-none z-21 shadow-lg"
              style={{ clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)" }}
            />

            {/* Guest Name Card Tag (Embossed Paper Label) */}
            <div className="absolute bottom-[9%] left-1/2 -translate-x-1/2 w-[78%] sm:w-[68%] bg-gradient-to-b from-[#FFFDF7] to-[#FAF3E3] border-2 border-double border-[#b38728]/50 rounded-xl p-3 text-center shadow-xl pointer-events-none z-22 select-none">
              <span className="text-[9px] tracking-[0.24em] text-[#7a5c10] font-bold font-sans uppercase block mb-0.5">
                ✦ Kính gửi ✦
              </span>
              <h1
                className="text-xl sm:text-2xl font-handwriting text-[#002d62] font-normal leading-normal text-glow"
                style={{ letterSpacing: "0.04em", wordSpacing: "0.15em" }}
              >
                {guestName || "Toàn thể Đại gia đình"}
              </h1>
            </div>

            {/* Top Flap (Rotating 3D Flap) */}
            <motion.div
              style={{ originY: 0 }}
              animate={
                isOpening
                  ? { rotateX: 180, zIndex: 0 }
                  : { rotateX: 0, zIndex: 25 }
              }
              transition={{ duration: 0.65, ease: "easeInOut" }}
              className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#003c80] via-[#002a5c] to-[#001a3d] rounded-t-2xl border-t-2 border-x border-[#b38728]/35 pointer-events-none origin-top shadow-md"
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
                originY: 0,
              }}
            />

            {/* Gold Metallic 3D Wax Seal */}
            <motion.div
              animate={
                isOpening
                  ? { scale: 0, opacity: 0, y: 35 }
                  : { scale: 1, opacity: 1 }
              }
              transition={{ duration: 0.4 }}
              className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-30 flex items-center justify-center"
            >
              {/* Metallic Wax Circle */}
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] border-2 border-[#f3e5ab]/60 flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-200">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border-2 border-dashed border-[#001d42]/30 flex flex-col items-center justify-center text-[#001d42] font-serif bg-gradient-to-b from-transparent to-[#000000]/10">
                  <span className="text-sm">🎓</span>
                  <span className="text-[8.5px] font-black tracking-widest font-sans mt-0.5">
                    UTH
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Small Instruction Banner */}
        <motion.p
          animate={{ opacity: isOpening ? 0 : [0.5, 1, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="text-xs text-[#f3e5ab] font-medium mt-1 flex items-center gap-2 pointer-events-none"
        >
          <MailOpen className="w-4 h-4 text-[#b38728]" /> Chạm vào phong bì để mở thư
        </motion.p>
      </motion.div>
    </div>
  );
}
