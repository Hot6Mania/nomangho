import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'NoMangHo - 지듣노망호',
  description: '지듣노를 동기화해서 들을 수 있는 실시간 스트리밍 서비스',
  keywords: ['음악', '동기화', '실시간', '스트리밍', '협업', '플레이리스트'],
  authors: [{ name: 'NoMangHo Team' }],
  creator: 'NoMangHo Team',
  publisher: 'NoMangHo',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nomangho.vercel.app'),
  openGraph: {
    title: 'NoMangHo - 지듣노망호',
    description: '지듣노를 동기화해서 들을 수 있는 실시간 스트리밍 서비스',
    url: 'https://nomangho.vercel.app',
    siteName: 'NoMangHo',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NoMangHo - 지듣노망호',
    description: '지듣노를 동기화해서 들을 수 있는 실시간 스트리밍 서비스',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  themeColor: '#007AFF',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="site-header">
          <div className="site-header__inner">
            <div className="site-logo">Nomangho</div>

            <div className="search">
              <div className="search__box">
                <button className="icon-btn" aria-label="Open search">🔎</button>
                <input
                  className="search__input"
                  placeholder="Search"
                  type="search"
                />
                <button className="icon-btn" aria-label="Voice search">🎤</button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="icon-btn" aria-label="Notifications">🔔</button>
              <button className="btn btn--ghost">Sign in</button>
            </div>
          </div>
        </header>

        {children}

        <footer className="site-footer">
          <div className="container-page">© {new Date().getFullYear()} Nomangho</div>
        </footer>
      </body>
    </html>
  );
}
