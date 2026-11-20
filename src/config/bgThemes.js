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

export const ENVELOPE_PALETTES = {
  navy: {
    back: "bg-[#001a3b] border-[#b38728]/50",
    backDot: "bg-[radial-gradient(#003a80_1px,transparent_1px)]",
    leftFlap: "from-[#002b5c] via-[#002247] to-[#001938] border-[#b38728]/25",
    rightFlap: "from-[#002b5c] via-[#002247] to-[#001938] border-[#b38728]/25",
    bottomFlap: "from-[#001530] via-[#00234a] to-[#002b5c] border-[#b38728]/30",
    topFlap: "from-[#003c80] via-[#002a5c] to-[#001a3d] border-[#b38728]/35",
  },
  burgundy: {
    back: "bg-[#2e0612] border-[#dfb755]/50",
    backDot: "bg-[radial-gradient(#7a1c38_1px,transparent_1px)]",
    leftFlap: "from-[#581126] via-[#450c1d] to-[#320714] border-[#dfb755]/25",
    rightFlap: "from-[#581126] via-[#450c1d] to-[#320714] border-[#dfb755]/25",
    bottomFlap: "from-[#290510] via-[#470d1e] to-[#5e1329] border-[#dfb755]/30",
    topFlap: "from-[#731834] via-[#521023] to-[#360816] border-[#dfb755]/35",
  },
  emerald: {
    back: "bg-[#032119] border-[#dfb755]/50",
    backDot: "bg-[radial-gradient(#0e5c47_1px,transparent_1px)]",
    leftFlap: "from-[#094737] via-[#06382b] to-[#04291f] border-[#dfb755]/25",
    rightFlap: "from-[#094737] via-[#06382b] to-[#04291f] border-[#dfb755]/25",
    bottomFlap: "from-[#021c15] via-[#06382b] to-[#0b523f] border-[#dfb755]/30",
    topFlap: "from-[#0e614b] via-[#084233] to-[#04291f] border-[#dfb755]/35",
  },
  sepia: {
    back: "bg-[#241b15] border-[#dfb755]/50",
    backDot: "bg-[radial-gradient(#614838_1px,transparent_1px)]",
    leftFlap: "from-[#4a372b] via-[#3b2b21] to-[#2b1f18] border-[#dfb755]/25",
    rightFlap: "from-[#4a372b] via-[#3b2b21] to-[#2b1f18] border-[#dfb755]/25",
    bottomFlap: "from-[#211812] via-[#3b2b21] to-[#523d30] border-[#dfb755]/30",
    topFlap: "from-[#614838] via-[#453327] to-[#2e2119] border-[#dfb755]/35",
  },
  sakura: {
    back: "bg-[#f2cad9] border-[#b38728]/50",
    backDot: "bg-[radial-gradient(#d889a8_1px,transparent_1px)]",
    leftFlap: "from-[#f7dce7] via-[#f2cedd] to-[#ebc0d2] border-[#b38728]/30",
    rightFlap: "from-[#f7dce7] via-[#f2cedd] to-[#ebc0d2] border-[#b38728]/30",
    bottomFlap: "from-[#e8b8cc] via-[#f2cedd] to-[#fae3ec] border-[#b38728]/35",
    topFlap: "from-[#fcf0f5] via-[#f5d5e2] to-[#ecc3d4] border-[#b38728]/40",
  },
  sky: {
    back: "bg-[#c5e0f8] border-[#b38728]/50",
    backDot: "bg-[radial-gradient(#7ab6eb_1px,transparent_1px)]",
    leftFlap: "from-[#dceeff] via-[#cee4fa] to-[#bedaf5] border-[#b38728]/30",
    rightFlap: "from-[#dceeff] via-[#cee4fa] to-[#bedaf5] border-[#b38728]/30",
    bottomFlap: "from-[#b5d5f2] via-[#cee4fa] to-[#e6f3fe] border-[#b38728]/35",
    topFlap: "from-[#eff7ff] via-[#d7ebfc] to-[#c3dff8] border-[#b38728]/40",
  },
  lavender: {
    back: "bg-[#dccbf2] border-[#b38728]/50",
    backDot: "bg-[radial-gradient(#a78bfa_1px,transparent_1px)]",
    leftFlap: "from-[#ebe0fa] via-[#e2d3f7] to-[#d6c2f2] border-[#b38728]/30",
    rightFlap: "from-[#ebe0fa] via-[#e2d3f7] to-[#d6c2f2] border-[#b38728]/30",
    bottomFlap: "from-[#cfb9ed] via-[#e2d3f7] to-[#f3ecfc] border-[#b38728]/35",
    topFlap: "from-[#f7f2fe] via-[#e7dbf7] to-[#d8c5f0] border-[#b38728]/40",
  },
};

const THEME_ENVELOPE_MAP = {
  "uth-campus": "navy",
  "uth-sunset": "burgundy",
  "uth-memory": "sepia",
  "midnight-gold": "navy",
  "emerald-academic": "emerald",
  "royal-burgundy": "burgundy",
  "obsidian-cyber": "navy",
  classic: "navy",
  "sakura-ivory": "sakura",
  "sky-horizon": "sky",
  "lavender-mist": "lavender",
};

export function getEnvelopePalette(themeId) {
  const variant = THEME_ENVELOPE_MAP[themeId] || "navy";
  return ENVELOPE_PALETTES[variant] || ENVELOPE_PALETTES.navy;
}

export const LETTER_PALETTES = {
  navy: {
    paperTop: "#FFFDF7",
    paperMid: "#FAF4E6",
    paperBot: "#F4EAD2",
    accentDark: "#001d42",
    accent: "#002d62",
    accentMid: "#003a80",
    gold: "#b38728",
    qrGradient: "from-[#001a3b] via-[#002654] to-[#003575]",
  },
  burgundy: {
    paperTop: "#FFF9FA",
    paperMid: "#FAF0F2",
    paperBot: "#F3E1E5",
    accentDark: "#450a1b",
    accent: "#6b132b",
    accentMid: "#8a1c3a",
    gold: "#b38728",
    qrGradient: "from-[#3b0816] via-[#540e22] to-[#701530]",
  },
  emerald: {
    paperTop: "#F8FCFA",
    paperMid: "#EEF7F3",
    paperBot: "#E1EFE8",
    accentDark: "#03261d",
    accent: "#064031",
    accentMid: "#0b5945",
    gold: "#b38728",
    qrGradient: "from-[#032119] via-[#06382b] to-[#0b523f]",
  },
  sepia: {
    paperTop: "#FCF9F4",
    paperMid: "#F6EFE5",
    paperBot: "#ECE1D1",
    accentDark: "#2e2118",
    accent: "#4a3527",
    accentMid: "#664a37",
    gold: "#b38728",
    qrGradient: "from-[#291d15] via-[#3f2e22] to-[#574030]",
  },
  sakura: {
    paperTop: "#FFF9FB",
    paperMid: "#FCEFF4",
    paperBot: "#F7E2EB",
    accentDark: "#5e2139",
    accent: "#823151",
    accentMid: "#a6456b",
    gold: "#b38728",
    qrGradient: "from-[#591e35] via-[#782b49] to-[#963b5e]",
  },
  sky: {
    paperTop: "#F9FCFF",
    paperMid: "#EFF6FD",
    paperBot: "#E2EEFA",
    accentDark: "#0b2e59",
    accent: "#134682",
    accentMid: "#1e5ea8",
    gold: "#b38728",
    qrGradient: "from-[#0a294f] via-[#123d73] to-[#1a5396]",
  },
  lavender: {
    paperTop: "#FCFaff",
    paperMid: "#F5EFFB",
    paperBot: "#EAE0F6",
    accentDark: "#321b54",
    accent: "#4c2a7d",
    accentMid: "#653ca1",
    gold: "#b38728",
    qrGradient: "from-[#2c174a] via-[#43246e] to-[#5a3391]",
  },
};

export function getLetterPalette(themeId) {
  const variant = THEME_ENVELOPE_MAP[themeId] || "navy";
  return LETTER_PALETTES[variant] || LETTER_PALETTES.navy;
}
