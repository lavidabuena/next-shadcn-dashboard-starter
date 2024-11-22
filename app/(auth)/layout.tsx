import type { Metadata } from 'next';

import '../globals.css';

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default async function SigninLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
