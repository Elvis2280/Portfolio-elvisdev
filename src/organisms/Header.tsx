'use client';
import NavLink from '@/atoms/NavLink';
import ContactModal from '@/molecules/ContactModal';
import MobileMenu from '@/molecules/MobileMenu';
import { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="relative h-[72px] p-4 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-[0_4px_32px_rgba(34,211,238,0.18)]">
        {/* Neon cyan glow line at bottom edge */}
        <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
        <nav className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <NavLink href="/">
              <span className="relative font-bold text-2xl text-white/90 animate-header-blink lg:text-3xl">
                ElvisDev
              </span>
            </NavLink>
          </div>
          <div className="gap-12 hidden md:flex">
            <NavLink className="text-xl lg:text-xl" href="/">
              Home
            </NavLink>
            <NavLink className="text-xl lg:text-xl" href="/projects">
              Projects
            </NavLink>
            <NavLink
              onClick={() => setIsOpen(true)}
              className="text-xl lg:text-xl"
              href="#"
            >
              Contact
            </NavLink>
          </div>
          <MobileMenu onOpen={() => setIsOpen(true)} />
          <div className="hidden md:block"></div>
        </nav>
      </header>
      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Header;
