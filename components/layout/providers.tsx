'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
export default function Providers({
  session,
  children
}: {
  session: Session | null | undefined; // 型を明示的に修正
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider session={session}>
          {session && children}
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
