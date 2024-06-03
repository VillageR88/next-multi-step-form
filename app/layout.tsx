import './globals.css';
import type { Metadata } from 'next';
import { Kumbh_Sans } from 'next/font/google';
import DataProvider from '@/app/_providers/DataContext';

const kumbhSans = Kumbh_Sans({
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-kumbhSans',
  subsets: ['latin', 'latin-ext'],
});

export const metadata: Metadata = {
  title: 'Officelite coming soon site',
  description: 'Officelite coming soon site',
  applicationName: 'Officelite coming soon site',
} as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
        <meta property="og:image" content={undefined} />
      </head>
      <body className={`${kumbhSans.variable} bg-[#FAFAFA]`}>
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
