import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="theme-color" content="#007AFF" />
        <meta name="color-scheme" content="light dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="relative min-h-screen">
          {/* Background Pattern */}
          <div className="fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
          </div>
          
          {/* Main Content */}
          <main className="relative z-10">
            {children}
          </main>
          
          {/* Footer */}
          <footer className="relative z-10 mt-12 border-t border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-youtube rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">N</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    © 2024 NoMangHo. 함께 듣는 즐거움.
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <a href="#" className="hover:text-foreground transition-colors">이용약관</a>
                  <a href="#" className="hover:text-foreground transition-colors">개인정보처리방침</a>
                  <a href="#" className="hover:text-foreground transition-colors">문의하기</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}