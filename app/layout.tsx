import type { Metadata } from 'next';
import { Special_Gothic_Expanded_One, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/organisms/Header';
import Footer from '@/organisms/Footer';
import { Toaster } from '@/atoms/ui/sonner';

const specialGothic = Special_Gothic_Expanded_One({
  variable: '--font-special-gothic',
  weight: '400',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Elvis Miranda - Personal Portfolio',
  description:
    'A personal portfolio showcasing the projects and skills of Elvis Miranda, a Latin American developer building software for the world.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ),
  icons: {
    icon: [
      {
        url: '/favicon_io/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon_io/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      { url: '/favicon_io/favicon.ico', sizes: '48x48' },
    ],
    apple: '/favicon_io/apple-touch-icon.png',
  },
  manifest: '/favicon_io/site.webmanifest',
  openGraph: {
    title: 'Elvis Miranda | Full Stack Developer Portfolio',
    description:
      'Explore projects, experience, and skills of Elvis Miranda, a developer building modern web applications.',
    url: '/',
    siteName: 'Developer Portfolio',
    images: [
      {
        url: '/preview.webp',
        width: 2982,
        height: 1634,
        alt: 'Portfolio Preview',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${specialGothic.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
