import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/organisms/Header';
import Footer from '@/organisms/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
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
    icon: '/favicon.webp',
  },
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
