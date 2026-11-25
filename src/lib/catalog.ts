import type { IconName } from "./icons";

export type Category = "game" | "ppob";

export type Item = {
  n: string;
  p: number;
  h?: boolean;
  id?: string;
};

export type Product = {
  name: string;
  pub: string;
  cat: Category;
  bg: string;
  lt: string;
  icon?: IconName;
  hot?: boolean;
  f: string;
  ph: string;
  phone?: boolean;
  zone?: boolean;
  server?: string[];
  providers?: string[];
  items: Item[];
  dbServiceId?: string;
};

const unitItems = (rows: [number, number, boolean?][], unit: string): Item[] =>
  rows.map(([qty, price, hot]) => ({
    n: `${qty.toLocaleString("id-ID")} ${unit}`,
    p: price,
    h: !!hot,
  }));

export const PRODUCTS: Record<string, Product> = {
  ml: {
    name: "Mobile Legends",
    pub: "Moonton",
    cat: "game",
    bg: "#CF0000",
    lt: "ML",
    hot: true,
    f: "User ID",
    ph: "12345678",
    zone: true,
    items: unitItems(
      [
        [86, 26900],
        [172, 53600],
        [257, 80100, true],
        [344, 107600],
        [429, 134000],
        [706, 216600],
        [1412, 433100],
        [2195, 638400],
      ],
      "Diamonds",
    ),
  },
  ff: {
    name: "Free Fire",
    pub: "Garena",
    cat: "game",
    bg: "#FDEA6F",
    lt: "FF",
    hot: true,
    f: "Player ID",
    ph: "123456789",
    items: unitItems(
      [
        [70, 9800],
        [140, 19800],
        [355, 49000, true],
        [720, 97900],
        [1450, 197800],
        [2180, 293800],
      ],
      "Diamonds",
    ),
  },
  pubg: {
    name: "PUBG Mobile",
    pub: "Tencent",
    cat: "game",
    bg: "#036D9A",
    lt: "PB",
    hot: true,
    f: "Character ID",
    ph: "5123456789",
    items: unitItems(
      [
        [60, 17200],
        [325, 81200, true],
        [660, 170500],
        [1800, 409900],
        [3850, 820800],
      ],
      "UC",
    ),
  },
  genshin: {
    name: "Genshin Impact",
    pub: "HoYoverse",
    cat: "game",
    bg: "#8FCBE4",
    lt: "GI",
    f: "UID",
    ph: "812345678",
    server: ["Asia", "America", "Europe", "TW/HK/MO"],
    items: unitItems(
      [
        [60, 16800],
        [330, 82300],
        [1090, 258900, true],
        [2240, 496400],
        [3880, 827300],
      ],
      "Genesis Crystals",
    ),
  },
  hok: {
    name: "Honor of Kings",
    pub: "Level Infinite",
    cat: "game",
    bg: "#F5C84C",
    lt: "HK",
    f: "Player ID",
    ph: "123456789012",
    items: unitItems(
      [
        [80, 16400],
        [240, 49400],
        [400, 81700, true],
        [800, 162600],
        [1200, 246900],
      ],
      "Tokens",
    ),
  },
  valo: {
    name: "Valorant",
    pub: "Riot Games",
    cat: "game",
    bg: "#E23B3B",
    lt: "VL",
    f: "Riot ID",
    ph: "nama#TAG",
    items: unitItems(
      [
        [475, 54700],
        [1000, 109900, true],
        [2050, 219600],
        [3650, 381600],
        [5350, 534700],
      ],
      "VP",
    ),
  },
  roblox: {
    name: "Roblox",
    pub: "Roblox Corp",
    cat: "game",
    bg: "#2F8FBA",
    lt: "RB",
    f: "Username",
    ph: "username",
    items: unitItems(
      [
        [80, 26600],
        [400, 84900, true],
        [800, 169700],
        [1700, 354700],
      ],
      "Robux",
    ),
  },
  steam: {
    name: "Steam Wallet",
    pub: "Valve",
    cat: "game",
    bg: "#0A4560",
    lt: "ST",
    f: "Email akun Steam",
    ph: "kamu@email.com",
    items: [
      { n: "Rp45.000", p: 46000 },
      { n: "Rp60.000", p: 61500, h: true },
      { n: "Rp90.000", p: 92500 },
      { n: "Rp120.000", p: 122500 },
      { n: "Rp250.000", p: 255000 },
    ],
  },
  pulsa: {
    name: "Pulsa",
    pub: "Semua operator",
    cat: "ppob",
    icon: "phone",
    bg: "#D4ECF6",
    lt: "PL",
    f: "Nomor HP",
    ph: "0812 3456 7890",
    phone: true,
    items: [
      { n: "Rp10.000", p: 12000 },
      { n: "Rp25.000", p: 26300, h: true },
      { n: "Rp50.000", p: 51000 },
      { n: "Rp100.000", p: 100500 },
    ],
  },
  data: {
    name: "Paket Data",
    pub: "Semua operator",
    cat: "ppob",
    icon: "wifi",
    bg: "#D4ECF6",
    lt: "DT",
    f: "Nomor HP",
    ph: "0812 3456 7890",
    phone: true,
    items: [
      { n: "5 GB · 7 hari", p: 18000 },
      { n: "15 GB · 30 hari", p: 52000, h: true },
      { n: "30 GB · 30 hari", p: 89000 },
      { n: "50 GB · 30 hari", p: 125000 },
    ],
  },
  ewallet: {
    name: "E-Wallet",
    pub: "DANA · OVO · GoPay · ShopeePay · LinkAja",
    cat: "ppob",
    icon: "wallet",
    bg: "#D4ECF6",
    lt: "EW",
    f: "Nomor HP terdaftar",
    ph: "0812 3456 7890",
    providers: ["DANA", "OVO", "GoPay", "ShopeePay", "LinkAja"],
    items: [
      { n: "Rp20.000", p: 21500 },
      { n: "Rp50.000", p: 51500, h: true },
      { n: "Rp100.000", p: 102000 },
      { n: "Rp200.000", p: 202500 },
    ],
  },
  pln: {
    name: "Token PLN",
    pub: "PLN Prabayar",
    cat: "ppob",
    icon: "bolt",
    bg: "#D4ECF6",
    lt: "PLN",
    f: "Nomor meter",
    ph: "5123 4567 8901",
    items: [
      { n: "Token Rp20.000", p: 22500 },
      { n: "Token Rp50.000", p: 52500, h: true },
      { n: "Token Rp100.000", p: 102500 },
      { n: "Token Rp200.000", p: 202500 },
    ],
  },
};

export const PRODUCT_ORDER = Object.keys(PRODUCTS);

export const GAME_KEYS = PRODUCT_ORDER.filter((key) => PRODUCTS[key].cat === "game");
export const PPOB_KEYS = PRODUCT_ORDER.filter((key) => PRODUCTS[key].cat === "ppob");

export const isSlug = (value: string | null | undefined): boolean =>
  !!value && value in PRODUCTS;

export const formatRp = (value: number) =>
  "Rp" + Math.round(value).toLocaleString("id-ID");

export const minPrice = (slug: string) =>
  Math.min(...PRODUCTS[slug].items.map((item) => item.p));

export const HERO_ROTATION = [
  { word: "gas terus!", lt: "ML", slug: "ml", item: "257 Diamonds" },
  { word: "push rank!", lt: "ML", slug: "ml", item: "344 Diamonds" },
  { word: "booyah!", lt: "FF", slug: "ff", item: "355 Diamonds" },
  { word: "chicken!", lt: "PB", slug: "pubg", item: "325 UC" },
  { word: "gacha!", lt: "GI", slug: "genshin", item: "1.090 Genesis Crystals" },
  { word: "clutch!", lt: "VL", slug: "valo", item: "1.000 VP" },
  { word: "kece!", lt: "RB", slug: "roblox", item: "400 Robux" },
];
