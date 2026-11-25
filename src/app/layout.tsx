import type { Metadata, Viewport } from "next";
import { Lilita_One, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { MobileTabBar } from "@/components/MobileTabBar";
import { RevealObserver } from "@/components/RevealObserver";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lilita",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kivoradigitalstore · Top up game & isi ulang kilat",
    template: "%s · Kivoradigitalstore",
  },
  description:
    "Top up Mobile Legends, Free Fire, PUBG, Genshin dan lainnya. Plus pulsa, kuota, e-wallet, dan token PLN. Cepat, aman, tanpa daftar.",
};

export const viewport: Viewport = {
  themeColor: "#FFFBE6",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${lilita.variable} ${jakarta.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <MobileTabBar />
        <RevealObserver />
      </body>
    </html>
  );
}
