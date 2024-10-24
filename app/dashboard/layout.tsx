import AppSidebar from '@/components/layout/app-sidebar';
import Providers from '@/components/layout/providers';
import { authOptions } from '@/libs/auth';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect('/');
  }
  return (
    <>
      <Providers session={session}>
        <AppSidebar>{session && children}</AppSidebar>
      </Providers>
    </>
  );
}
