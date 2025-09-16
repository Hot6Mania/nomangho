import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: [
    "Noto Sans KR",
    "Noto Sans",
    "Segoe UI",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Noto Color Emoji",
    "system-ui",
    "sans-serif",
  ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: [
    "D2Coding",
    "Fira Code",
    "JetBrains Mono",
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "monospace",
  ],
});

export const metadata: Metadata = {
  title: "Nomangho - 지구의 노래, 함께 들어요",
  description: "지구 구석구석의 이야기를 음악과 함께 나누는 실시간 큐레이션 클럽 Nomangho.",
  keywords: ["음악", "실시간", "스트리밍", "플레이리스트", "파티"],
  authors: [{ name: "Nomangho Team" }],
  creator: "Nomangho Team",
  publisher: "Nomangho",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nomangho.vercel.app"),
  openGraph: {
    title: "Nomangho - 지구의 노래, 함께 들어요",
    description: "Nomangho와 함께 어디서나, 어떤 언어로도 음악을 공유해 보세요.",
    url: "https://nomangho.vercel.app",
    siteName: "Nomangho",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nomangho - 지구의 노래, 함께 들어요",
    description: "Nomangho와 함께 어디서나, 어떤 언어로도 음악을 공유해 보세요.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  themeColor: "#007AFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <div className="min-h-dvh font-sans">{children}</div>
      </body>
    </html>
  );
}
