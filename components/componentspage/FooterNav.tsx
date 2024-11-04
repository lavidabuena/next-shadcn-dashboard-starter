// FooterNav.tsx
'use client';
import React from 'react';
import Link from 'next/link'; // 追加
import { NavButton } from './NavButton';

export const FooterNav = () => {
  const navItems = [
    { label: 'ABOUT', href: '/about' },
    { label: 'SERVICE', href: '/service' },
    { label: 'NEWS + BLOG', href: '/blog' },
    { label: 'CONTACT', href: '/contact' }
  ];

  return (
    <footer className="bg-black py-8 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-center">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-[92px]">
            {navItems.map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <Link href={item.href}>
                  <NavButton isFooter>{item.label}</NavButton>
                </Link>
                <div className="mt-4 h-[1px] w-full bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>
        <p
          className="mb-8 text-center text-5xl font-extrabold italic md:text-[160px]"
          style={{
            fontFamily: 'Panchang-Bold, sans-serif',
            letterSpacing: '-10px'
          }}
        >
          AMANECEN
        </p>
        <div className="flex flex-col items-center">
          <Link href="/privacypolicy">
            <NavButton isFooter>PRIVACY POLICY</NavButton>
          </Link>
          <p className="mt-2 text-xs opacity-50">© 2024 AMANECEN Co., Ltd.</p>
        </div>
      </div>
    </footer>
  );
};
