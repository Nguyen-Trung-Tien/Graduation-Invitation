import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, GraduationCap } from "lucide-react";

export default function Envelope({
  guestName,
  bgTheme = "uth-campus",
  onOpen,
  isCardHidden = false,
}) {
  const [isOpening, setIsOpening] = useState(false);
  const [canHover, setCanHover] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(hover: hover) and (pointer: fine)").matches
      : false
  );
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, active: false });
  const prefersReducedMotion = useReducedMotion();
  const isClassic = bgTheme === "classic";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
      const handler = (e) => setCanHover(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!canHover || isOpening || prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setTilt({
        x: (0.5 - y) * 7,
        y: (x - 0.5) * 9,
        glareX: x * 100,
        glareY: y * 100,
        active: true,
      });
    },
    [canHover, isOpening, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50, active: false });
  }, []);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50, active: false });

    // Balanced ceremonial choreography: seal pop -> flap open -> letter reveal
    setTimeout(
      () => {
        onOpen();
      },
      prefersReducedMotion ? 200 : 1650
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <div className={`min-h-dvh flex flex-col items-center justify-center px-4 pt-[max(3.25rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:py-6 relative overflow-y-auto overflow-x-hidden bg-transparent transition-opacity duration-500 ${isCardHidden ? "opacity-0 pointer-events-none select-none" : "opacity-100"}`}>
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.965 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0.25 : 1.15, ease: [0.16, 1, 0.3, 1] }}
        className="w-[92%] max-w-[min(440px,max(260px,calc((100dvh-10.5rem)*1.52)))] md:max-w-[min(500px,max(280px,calc((100dvh-11rem)*1.52)))] flex flex-col items-center gap-4 sm:gap-6 z-10 my-auto"
      >
        {/* Header Invitation Tagline (Fades out smoothly when envelope opens so rising card never overlaps) */}
        <motion.div
          animate={isOpening ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-center flex flex-col items-center gap-1.5 pointer-events-none"
        >
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border shadow-sm transition-colors ${
              isClassic
                ? "bg-white/90 border-[#b38728]/40 text-[#002d62]"
                : "bg-[#001d42]/85 sm:backdrop-blur-md border-[#b38728]/45 text-[#f3e5ab]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#dfb755]" />
            <span className="text-[10.5px] sm:text-xs uppercase tracking-[0.14em] font-bold font-sans">
              ĐẠI HỌC GIAO THÔNG VẬN TẢI TP. HCM
            </span>
          </div>

          <h1
            className={`text-[clamp(1.25rem,1rem+2vw,1.875rem)] sm:whitespace-nowrap font-serif font-black mt-1 tracking-wide uppercase bg-clip-text text-transparent foil-shimmer-text text-balance ${
              isClassic
                ? "bg-gradient-to-r from-[#001d42] via-[#8c6719] to-[#001d42] drop-shadow-[0_2px_8px_rgba(179,135,40,0.2)]"
                : "bg-gradient-to-r from-[#fffdf7] via-[#f3e5ab] to-[#fffdf7] drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]"
            }`}
          >
            THƯ MỜI DỰ LỄ TỐT NGHIỆP
          </h1>
        </motion.div>

        {/* Outer 3D Envelope Container */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Chạm vào phong bì để mở thiệp"
          onClick={handleOpen}
          onKeyDown={handleKeyDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full aspect-[1.52/1] relative perspective-1000 cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#b38728] focus-visible:outline-none rounded-2xl select-none"
        >
          {/* Flap & Envelope Wrapper - Smooth 3D Tilt */}
          <motion.div
            animate={
              isOpening
                ? prefersReducedMotion
                  ? { opacity: 0.9 }
                  : { scale: 1.02, y: 12, rotateX: 0, rotateY: 0 }
                : {
                    scale: tilt.active ? 1.015 : 1,
                    y: 0,
                    rotateX: tilt.x,
                    rotateY: tilt.y,
                  }
            }
            transition={
              tilt.active && !isOpening
                ? { type: "spring", stiffness: 260, damping: 24, mass: 0.6 }
                : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
            }
            className="w-full h-full relative preserve-3d active:scale-[0.988]"
          >

            {/* Back Interior Layer */}
            <div
              className="absolute inset-0 bg-[#001a3b] rounded-2xl border-2 border-[#b38728]/50 shadow-[0_24px_50px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)] flex items-center justify-center overflow-hidden"
              style={{ transform: "translateZ(-8px)" }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(#003a80_1px,transparent_1px)] [background-size:16px_16px] opacity-35" />
            </div>

            {/* Letter Sheet (Slides out when opened) */}
            <motion.div
              initial={{ y: 0, scale: 0.95, z: 0 }}
              animate={
                isOpening
                  ? prefersReducedMotion
                    ? { opacity: 1 }
                    : { y: "-58%", scale: 1, z: 0 }
                  : { y: 0, scale: 0.95, z: 0 }
              }
              transition={{
                delay: prefersReducedMotion ? 0 : 0.45,
                duration: prefersReducedMotion ? 0.15 : 0.95,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-x-3 sm:inset-x-4 top-3 sm:top-4 bottom-3 sm:bottom-4 card-paper-texture rounded-xl border border-[#b38728]/40 shadow-xl pt-4 sm:pt-6 px-3 sm:px-4 pb-3 flex flex-col items-center justify-start gap-2 sm:gap-2.5 text-slate-900 pointer-events-none z-10"
              style={{ willChange: isOpening ? "transform, opacity" : "auto" }}
            >
              <div className="w-11 h-11 rounded-full border-2 border-[#b38728] bg-[#001d42]/8 flex items-center justify-center shadow-xs">
                <GraduationCap className="w-5 h-5 text-[#002d62]" />
              </div>

              <div className="flex flex-col items-center text-center">
                <p className="text-[11px] uppercase tracking-wider text-[#7a5c10] font-bold">
                  Đại Học Giao Thông Vận Tải TP. Hồ Chí Minh
                </p>
                <h3 className="text-base sm:text-lg font-serif font-black text-[#002d62] mt-0.5 tracking-wide uppercase">
                  THƯ MỜI DỰ LỄ TỐT NGHIỆP
                </h3>
              </div>
              <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#b38728] to-transparent" />
            </motion.div>

            {/* Left Flap */}
            <div
              className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#002b5c] via-[#002247] to-[#001938] rounded-l-2xl border-l-2 border-y border-[#b38728]/25 pointer-events-none z-20 shadow-md"
              style={{
                clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
                transform: "translateZ(2px)",
              }}
            />

            {/* Right Flap */}
            <div
              className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#002b5c] via-[#002247] to-[#001938] rounded-r-2xl border-r-2 border-y border-[#b38728]/25 pointer-events-none z-20 shadow-md"
              style={{
                clipPath: "polygon(100% 0%, 0% 50%, 100% 100%)",
                transform: "translateZ(2px)",
              }}
            />

            {/* Bottom Flap */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#001530] via-[#00234a] to-[#002b5c] rounded-b-2xl border-b-2 border-x border-[#b38728]/30 pointer-events-none z-21 shadow-lg"
              style={{
                clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
                transform: "translateZ(2px)",
              }}
            />

            {/* Guest Name Card Tag (Embossed Paper Label) */}
            <div
              className="absolute bottom-[3.5%] sm:bottom-[7%] left-1/2 -translate-x-1/2 w-[84%] sm:w-[68%] bg-gradient-to-b from-[#FFFDF7] to-[#FAF3E3] border-2 border-double border-[#b38728]/50 rounded-xl py-1.5 px-3 sm:py-2.5 sm:px-4 text-center shadow-xl pointer-events-none z-22 select-none"
              style={{ transform: "translateZ(4px)" }}
            >
              <span className="text-[9.5px] sm:text-[11px] tracking-wider text-[#7a5c10] font-bold font-sans uppercase block leading-none mb-0.5">
                ✦ Kính gửi ✦
              </span>
              <p
                className="text-lg sm:text-2xl font-handwriting text-[#002d62] font-normal leading-tight text-glow mt-0.5 truncate"
                style={{ letterSpacing: "0.02em" }}
              >
                {guestName || "Toàn thể Đại gia đình"}
              </p>
            </div>

            {/* Top Flap (Rotating 3D Flap) */}
            <motion.div
              initial={{ rotateX: 0, z: 8 }}
              animate={
                isOpening
                  ? { rotateX: 180, z: -4 }
                  : { rotateX: 0, z: 8 }
              }
              transition={{
                rotateX: {
                  delay: prefersReducedMotion ? 0 : 0.15,
                  duration: prefersReducedMotion ? 0.15 : 0.75,
                  ease: [0.22, 1, 0.36, 1],
                },
                z: { delay: isOpening ? (prefersReducedMotion ? 0 : 0.45) : 0, duration: 0 },
              }}
              className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#003c80] via-[#002a5c] to-[#001a3d] rounded-t-2xl border-t-2 border-x border-[#b38728]/35 pointer-events-none shadow-md"
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
                transformOrigin: "top center",
                willChange: isOpening ? "transform" : "auto",
              }}
            />

            {/* Gold Metallic 3D Wax Seal Button */}
            <motion.div
              initial={{ scale: 1, opacity: 1, z: 24 }}
              animate={
                isOpening
                  ? { scale: 0, opacity: 0, y: 30, z: 24 }
                  : { scale: 1, opacity: 1, z: 24 }
              }
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="absolute top-[46%] sm:top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-30 flex items-center justify-center cursor-pointer group/seal"
            >
              {/* Pulsing Ripple Ring */}
              {!isOpening && (
                <div className="absolute w-[62px] h-[62px] sm:w-[88px] sm:h-[88px] rounded-full border border-[#f3e5ab]/60 pointer-events-none animate-seal-pulse" />
              )}

              {/* Metallic Wax Circle with Authentic Stamp Depth */}
              <div
                className={`w-[58px] h-[58px] sm:w-[84px] sm:h-[84px] rounded-full bg-gradient-to-tr from-[#8a5d15] via-[#dfb755] to-[#fef0b3] p-1 sm:p-1.5 flex items-center justify-center transition-all duration-300 relative z-10 group-hover/seal:scale-105 active:scale-95 ${
                  !isOpening ? "animate-seal-breathe" : ""
                }`}
                style={{
                  boxShadow:
                    "0 10px 24px rgba(0, 15, 40, 0.65), 0 3px 8px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.7), inset 0 -3px 6px rgba(90, 50, 0, 0.5)",
                }}
              >
                {/* Inner Pressed Coin Well */}
                <div
                  className="w-full h-full rounded-full border border-[#8a5d15]/40 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#f9e59b] via-[#d4a843] to-[#aa771c] p-0.5 sm:p-1"
                  style={{
                    boxShadow:
                      "inset 0 2px 5px rgba(0, 0, 0, 0.35), inset 0 -1px 2px rgba(255, 255, 255, 0.5)",
                  }}
                >
                  {/* Concentric Decorative Ring */}
                  <div className="absolute inset-[2.5px] sm:inset-[3px] rounded-full border border-dashed border-[#001d42]/30 pointer-events-none" />

                  {/* Graduation Cap Crest */}
                  <GraduationCap
                    className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#001d42] drop-shadow-[0_1px_0_rgba(255,255,255,0.5)] shrink-0 transition-transform duration-300 group-hover/seal:-translate-y-0.5"
                    strokeWidth={2.2}
                  />

                  {/* Embossed Luxury Typography */}
                  <span
                    className="text-[7px] sm:text-[8.5px] font-sans font-bold tracking-[0.12em] sm:tracking-[0.16em] text-[#001d42] uppercase whitespace-nowrap mt-0.5 leading-none select-none drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]"
                  >
                    MỞ THIỆP
                  </span>
                </div>
              </div>

              {/* Golden Hand Tap Indicator */}
              <motion.div
                animate={{
                  x: [2, 0, 2],
                  y: [2, 0, 2],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-0.5 -right-1 sm:-bottom-1 sm:-right-2 z-20 pointer-events-none filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]"
              >
                <svg
                  className="w-5 h-5 sm:w-7 sm:h-7 text-[#fcf6ba] transform -rotate-12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#001d42"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8M18 8a2 2 0 0 1 2 2v4a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"
                    fill="#fcf6ba"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Clean Elegant Instruction Banner */}
        <motion.p
          animate={
            isOpening
              ? { opacity: 0 }
              : { opacity: prefersReducedMotion ? 1 : [0.85, 1, 0.85] }
          }
          transition={
            isOpening
              ? { duration: 0.2, ease: "easeOut" }
              : {
                  duration: 2.2,
                  repeat: prefersReducedMotion ? 0 : Infinity,
                  ease: "easeInOut",
                }
          }
          className={`text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-1.5 pointer-events-none select-none px-4 py-1.5 rounded-full transition-opacity duration-200 ${
            isOpening ? "opacity-0" : ""
          } ${
            isClassic
              ? "text-[#002d62] bg-white/80 border border-[#b38728]/30 shadow-xs"
              : "text-[#f3e5ab] bg-black/35 backdrop-blur-sm border border-[#f3e5ab]/25 shadow-sm"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#b38728]" />
          <span>Chạm vào phong bì để mở thiệp</span>
          <Sparkles className="w-3.5 h-3.5 text-[#b38728]" />
        </motion.p>
      </motion.div>
    </div>
  );
}
