import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { getAnnouncements } from '@/lib/api/navigation';
import { getNavigation } from '@/lib/api/navigation';

const geistSans = localFont({
  src: './fonts/GeistVF.woff2',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff2',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: {
    default: 'The Hoodie LB',
    template: '%s | The Hoodie LB',
  },
  description: 'The Hoodie LB — Coming Soon',
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const [announcements, navigation] = await Promise.all([
    getAnnouncements(),
    getNavigation(),
  ]);

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AnnouncementBar announcements={announcements} />
        <Header navItems={navigation.main} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
