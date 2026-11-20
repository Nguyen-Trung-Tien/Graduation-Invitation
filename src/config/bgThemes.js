export const BG_THEME_GROUPS = [
  { id: "photo", label: "🏛️ Ảnh Khuôn Viên UTH" },
  { id: "dark", label: "🌙 Tông Tối Sang Trọng" },
  { id: "light", label: "☀️ Tông Sáng Thanh Lịch" },
];

export const BG_THEMES = [
  // Photo themes
  {
    id: "uth-campus",
    category: "photo",
    name: "🏛️ UTH Campus Heritage",
    shortName: "Nền UTH",
    desc: "Khuôn viên ĐH GTVT TP.HCM",
    isLight: false,
    baseBgClass: "bg-[#0b1329]",
    swatchStyle:
      "linear-gradient(135deg, #001d42 0%, #003a80 55%, rgba(179,135,40,0.75) 100%)",
  },
  {
    id: "uth-sunset",
    category: "photo",
    name: "🌅 UTH Hoàng Hôn",
    shortName: "UTH Hoàng Hôn",
    desc: "Khuôn viên UTH ánh chiều ấm",
    isLight: false,
    baseBgClass: "bg-[#241016]",
    swatchStyle:
      "linear-gradient(135deg, #2b0f16 0%, #6e2b25 50%, #c9883b 100%)",
  },
  {
    id: "uth-aerial",
    category: "photo",
    name: "🎓 UTH Toàn Cảnh",
    shortName: "UTH Toàn Cảnh",
    desc: "Góc nhìn toàn cảnh trường UTH",
    isLight: false,
    baseBgClass: "bg-[#071830]",
    swatchStyle:
      "linear-gradient(135deg, #071830 0%, #0d3b66 55%, #d4af37 100%)",
  },
  {
    id: "uth-memory",
    category: "photo",
    name: "📸 Kỷ Niệm Thanh Xuân",
    shortName: "Kỷ Niệm",
    desc: "Khoảnh khắc lưu giữ thanh xuân UTH",
    isLight: false,
    baseBgClass: "bg-[#1a1512]",
    swatchStyle:
      "linear-gradient(135deg, #1a1512 0%, #4b382a 55%, #c59b5f 100%)",
  },

  // Dark luxury graphic themes
  {
    id: "midnight-gold",
    category: "dark",
    name: "✨ Đêm Sao Hoàng Kim",
    shortName: "Đêm Sao",
    desc: "Dải ngân hà & ánh kim sang trọng",
    isLight: false,
    baseBgClass: "bg-[#040814]",
    swatchStyle:
      "radial-gradient(circle at 80% 20%, rgba(243,229,171,0.65), transparent 50%), radial-gradient(circle at 20% 85%, rgba(56,103,214,0.45), transparent 55%), linear-gradient(135deg, #030612 0%, #0b1636 52%, #182b5c 100%)",
  },
  {
    id: "emerald-academic",
    category: "dark",
    name: "🌿 Xanh Ngọc Học Thuật",
    shortName: "Ngọc Lục Bảo",
    desc: "Nhung xanh lục bảo & viền vàng",
    isLight: false,
    baseBgClass: "bg-[#021712]",
    swatchStyle:
      "radial-gradient(circle at 75% 25%, rgba(223,183,85,0.55), transparent 52%), radial-gradient(circle at 25% 80%, rgba(20,145,108,0.4), transparent 55%), linear-gradient(135deg, #021712 0%, #063327 52%, #0e523f 100%)",
  },
  {
    id: "royal-burgundy",
    category: "dark",
    name: "🍷 Đỏ Đô Hoàng Gia",
    shortName: "Đỏ Đô",
    desc: "Nhung đỏ rượu vang & vàng champagne",
    isLight: false,
    baseBgClass: "bg-[#1a040c]",
    swatchStyle:
      "radial-gradient(circle at 75% 25%, rgba(243,229,171,0.5), transparent 50%), radial-gradient(circle at 25% 80%, rgba(168,32,68,0.45), transparent 55%), linear-gradient(135deg, #18030a 0%, #4d0d21 55%, #731834 100%)",
  },
  {
    id: "obsidian-cyber",
    category: "dark",
    name: "💻 Công Nghệ Số",
    shortName: "Công Nghệ",
    desc: "Lưới kỹ thuật số cyan & vàng kim",
    isLight: false,
    baseBgClass: "bg-[#050a14]",
    swatchStyle:
      "radial-gradient(circle at 80% 20%, rgba(56,189,248,0.45), transparent 50%), radial-gradient(circle at 20% 80%, rgba(223,183,85,0.35), transparent 55%), linear-gradient(135deg, #050a14 0%, #0c1d36 55%, #122c4f 100%)",
  },

  // Light elegant graphic themes
  {
    id: "classic",
    category: "light",
    name: "📜 Giấy Da Hoàng Gia",
    shortName: "Cổ Điển",
    desc: "Tông ngà ấm áp trang trọng",
    isLight: true,
    baseBgClass: "bg-[#F9F3E3]",
    swatchStyle: "linear-gradient(135deg, #FFFDF7 0%, #F8EED3 55%, #EBD8A3 100%)",
  },
  {
    id: "sakura-ivory",
    category: "light",
    name: "🌸 Hoa Anh Đào Phấn",
    shortName: "Anh Đào",
    desc: "Lụa ngà ánh nắng & sắc đào",
    isLight: true,
    baseBgClass: "bg-[#FDF0F4]",
    swatchStyle:
      "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.9), transparent 55%), radial-gradient(circle at 80% 80%, rgba(232,140,174,0.45), transparent 55%), linear-gradient(135deg, #FFFDFB 0%, #FCEBF1 52%, #F3CADA 100%)",
  },
  {
    id: "sky-horizon",
    category: "light",
    name: "☁️ Bầu Trời Hy Vọng",
    shortName: "Trời Xanh",
    desc: "Xanh ban mai tươi sáng & nhẹ nhàng",
    isLight: true,
    baseBgClass: "bg-[#EAF5FD]",
    swatchStyle:
      "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.95), transparent 55%), radial-gradient(circle at 80% 85%, rgba(96,165,250,0.35), transparent 55%), linear-gradient(135deg, #F6FBFF 0%, #E0F0FC 52%, #C4E1F7 100%)",
  },
  {
    id: "lavender-mist",
    category: "light",
    name: "💜 Oải Hương Dịu Dàng",
    shortName: "Oải Hương",
    desc: "Tím ngọc trai thanh lịch & tinh tế",
    isLight: true,
    baseBgClass: "bg-[#F4EEFA]",
    swatchStyle:
      "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.9), transparent 55%), radial-gradient(circle at 80% 80%, rgba(167,139,250,0.38), transparent 55%), linear-gradient(135deg, #FCFaff 0%, #F1E8FA 52%, #DFCEF4 100%)",
  },
];

export const DEFAULT_BG_THEME = BG_THEMES[0];

export function isValidBgTheme(themeId) {
  return BG_THEMES.some((t) => t.id === themeId);
}

export function getBgTheme(themeId) {
  return BG_THEMES.find((t) => t.id === themeId) || DEFAULT_BG_THEME;
}

export function getNextBgThemeId(currentId) {
  const index = BG_THEMES.findIndex((t) => t.id === currentId);
  if (index === -1) return DEFAULT_BG_THEME.id;
  return BG_THEMES[(index + 1) % BG_THEMES.length].id;
}
