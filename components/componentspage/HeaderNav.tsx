'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavButton } from './NavButton';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export const HeaderNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const [isVisible, setIsVisible] = useState(true);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (isHomePage) {
        setIsVisible(currentScrollY > 200);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Reset visibility when pathname changes
  useEffect(() => {
    setIsVisible(true);
  }, [pathname]);

  const navItems = [
    { label: 'ABOUT', href: '/about' },
    { label: 'SERVICE', href: '/service' },
    { label: 'NEWS + BLOG', href: '/blog' },
    { label: 'CONTACT', href: '/contact' }
  ];

  return (
    <nav
      className={`fixed left-0 right-0 z-50 flex items-center justify-between bg-white px-3 transition-opacity duration-300 md:px-12 ${
        isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div>
        <Link href="/">
          <Image
            src="/external/AMAMNECEN-logo.png"
            alt="AMANECEN logo"
            width={189}
            height={77}
            className="h-[50px] w-auto md:h-[77px]"
          />
        </Link>
        <h1 className="sr-only">
          神奈川・湘南・横浜でWEB制作とMEO対策｜夜明けを共に歩むAMANECEN
        </h1>
      </div>
      <div className="hidden flex-1 justify-end md:flex">
        <div className="flex gap-4 lg:gap-8 xl:gap-12">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <NavButton>{item.label}</NavButton>
            </Link>
          ))}
        </div>
      </div>
      <button
        className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-white md:hidden"
        onClick={toggleMobileMenu}
      >
        <div className="inline-flex h-12 w-12 translate-y-0 items-center justify-center text-neutral-950 transition duration-500 group-hover:-translate-y-[150%]">
          <Menu className="h-6 w-6" />
        </div>
        <div className="absolute inline-flex h-12 w-12 translate-y-[100%] items-center justify-center text-neutral-50 transition duration-500 group-hover:translate-y-0">
          <span className="absolute h-full w-full translate-y-full skew-y-12 scale-y-0 bg-blue-500 transition duration-500 group-hover:translate-y-0 group-hover:scale-150"></span>
          <X className="z-10 h-6 w-6" />
        </div>
      </button>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={toggleMobileMenu}
        >
          <div
            className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col p-4">
              <Button
                variant="outline"
                size="icon"
                className="mb-4 self-end"
                onClick={toggleMobileMenu}
              >
                <X className="h-6 w-6" />
              </Button>
              {navItems.map((item) => (
                <Link key={item.label} href={item.href}>
                  <Button
                    variant="ghost"
                    className="justify-start py-4 text-lg font-normal text-[#242424]"
                    onClick={toggleMobileMenu}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
