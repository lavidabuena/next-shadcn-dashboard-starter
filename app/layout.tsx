import { Toaster } from '@/components/ui/sonner';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import { HeaderNav } from '@/components/componentspage/HeaderNav';
import { FooterNav } from '@/components/componentspage/FooterNav';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="jp" className={`${lato.className}`}>
      <body suppressHydrationWarning={true}>
        <NextTopLoader showSpinner={false} />
        <Toaster />
        <HeaderNav />
        {children}
        <FooterNav />
      </body>
    </html>
  );
}
