import { Lato } from 'next/font/google';
import '../globals.css';
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
        <HeaderNav />
        <main>{children}</main>
        <FooterNav />
      </body>
    </html>
  );
}
