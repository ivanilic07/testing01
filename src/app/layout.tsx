import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// ClientBody removed; render children directly

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Active Rehab",
  description:
    "Active Rehab – rehabilitacija, personalni treninzi i plan ishrane. Zakažite konsultacije online.",
  metadataBase: new URL("http://localhost:3001"),
  openGraph: {
    title: "Active Rehab – Rehabilitacija i treninzi",
    description:
      "Personalizovana rehabilitacija, coaching i plan ishrane. Brži oporavak i održiv napredak.",
    type: "website",
    locale: "sr_RS",
  },
};

export const viewport: Viewport = {
  themeColor: "#111317",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <head></head>
      <body suppressHydrationWarning className="antialiased">{children}</body>
    </html>
  );
}
