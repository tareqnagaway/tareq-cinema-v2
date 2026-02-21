import type { Metadata } from 'next';
import { Cairo, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Script from 'next/script';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tareq Cinema | أفلام ومسلسلات مجاناً',
  description: 'شاهد أحدث الأفلام والمسلسلات مجاناً على منصة طارق سينما - Watch latest movies and TV shows free on Tareq Cinema',
  keywords: ['أفلام', 'مسلسلات', 'movies', 'series', 'streaming', 'cinema', 'Tareq Cinema'],
  authors: [{ name: 'Tareq Cinema' }],
  creator: 'Tareq Cinema',
  publisher: 'Tareq Cinema',
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
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: ['en_US'],
    url: 'https://tareq.live',
    title: 'Tareq Cinema | منصة طارق سينما',
    description: 'شاهد أحدث الأفلام والمسلسلات مجاناً - أفضل منصة للمشاهدة المباشرة',
    siteName: 'Tareq Cinema',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Tareq Cinema Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tareq Cinema | منصة طارق سينما',
    description: 'شاهد أحدث الأفلام والمسلسلات مجاناً',
    images: ['/logo.png'],
    creator: '@tareqcinema',
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* Google AdSense */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Schema.org for SEO */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Tareq Cinema',
              alternateName: 'منصة طارق سينما',
              url: 'https://tareq.live',
              description: 'شاهد أحدث الأفلام والمسلسلات مجاناً',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://tareq.live/search?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={`${cairo.variable} ${outfit.variable} cinema-grain`}>
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <footer className="bg-tareq-dark py-8 mt-20 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
            <p className="mb-2">© 2024 Tareq Cinema. جميع الحقوق محفوظة</p>
            <p className="text-xs">
              This site uses TMDB API but is not endorsed or certified by TMDB.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
