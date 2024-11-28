'use client';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';
import { Lato } from 'next/font/google';
import { Toaster as Toaste } from '@/components/ui/toaster';
import './globals.css';
import { StoreProvider } from './StoreProvider';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});
export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="jp" className={`${lato.className}`}>
      <body suppressHydrationWarning={true}>
        <StoreProvider>
          <NextTopLoader showSpinner={false} />
          <Toaster />
          <Toaste />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
