import type { Metadata } from "next";
import { Montserrat, Italiana } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  style: "normal",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
});

const italiana = Italiana({
  variable: "--font-italiana",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  style: "normal",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Valentine Dutertre - Architecture d'Intérieur",
  description: "Portfolio de Valentine Dutertre, étudiante en 4e année d'architecture d'intérieur passionnée par la conception d'espaces uniques et fonctionnels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${montserrat.variable} ${italiana.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
