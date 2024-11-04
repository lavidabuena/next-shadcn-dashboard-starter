// NavButton.tsx
'use client';
import React from 'react';

export const NavButton = ({
  children,
  isFooter = false
}: {
  children: React.ReactNode;
  isFooter?: boolean;
}) => (
  <button
    className={`group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md font-bold ${
      isFooter ? 'bg-black text-white' : 'text-black'
    }`}
  >
    <div className="inline-flex h-12 translate-y-0 items-center justify-center px-6 transition duration-500 group-hover:-translate-y-[150%]">
      {children}
    </div>
    <div className="absolute inline-flex h-12 w-full translate-y-[100%] items-center justify-center text-neutral-50 transition duration-500 group-hover:translate-y-0">
      <span
        className={`absolute h-full w-full translate-y-full skew-y-12 scale-y-0 ${
          isFooter ? 'bg-white' : 'bg-black'
        } transition duration-500 group-hover:translate-y-0 group-hover:scale-150`}
      ></span>
      <span className={`z-10 ${isFooter ? 'text-black' : ''}`}>{children}</span>
    </div>
  </button>
);
