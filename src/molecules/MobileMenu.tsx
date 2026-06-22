'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import NavLink from '@/atoms/NavLink';
import Estrella from '@/atoms/Estrella';
import Observatorio from '@/atoms/Observatorio';
import {
  createEstrellaAnimation,
  createMiraAnimation,
} from '@/lib/gsap/animations';

interface MobileMenuProps {
  onNavigate: () => void;
}

const MobileMenu = ({ onNavigate }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [exitAnimating, setExitAnimating] = useState(false);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const estrellaRef = useRef<HTMLDivElement>(null);
  const miraRef = useRef<SVGGElement>(null);

  const show = isOpen || exitAnimating;

  const close = useCallback(() => {
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    setExitAnimating(true);
    exitTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      setExitAnimating(false);
    }, 350);
  }, []);

  const toggle = useCallback(() => {
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    if (!isOpen) {
      setIsOpen(true);
    } else {
      close();
    }
  }, [isOpen, close]);

  const handleScrollToProjects = useCallback(() => {
    onNavigate();
    close();
  }, [onNavigate, close]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const ctx = createEstrellaAnimation(estrellaRef.current);
    return () => {
      ctx?.revert();
    };
  }, [show]);

  useEffect(() => {
    const tl = createMiraAnimation(miraRef.current);
    return () => {
      tl?.kill();
    };
  }, [show]);

  return (
    <>
      <button
        onClick={toggle}
        className="md:hidden z-50 flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <span
          className={`block w-6 h-[2px] bg-foreground rounded-full transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-[7px]' : ''
          }`}
        />
        <span
          className={`block w-6 h-[2px] bg-foreground rounded-full transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-6 h-[2px] bg-foreground rounded-full transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-[7px]' : ''
          }`}
        />
      </button>

      {show &&
        createPortal(
          <div
            className={`fixed inset-0 z-40 flex flex-col items-center justify-start pt-32 bg-background ${
              exitAnimating ? 'animate-menu-exit' : 'animate-menu-enter'
            }`}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 z-50 flex items-center justify-center w-10 h-10 text-foreground/70 hover:text-neon transition-colors"
              aria-label="Close menu"
            >
              <X size={40} />
            </button>
            <nav className="flex flex-col items-center w-full gap-8">
              <NavLink
                href="/"
                onClick={close}
                className="text-3xl w-full text-center"
              >
                Home
              </NavLink>
              <NavLink
                href="/"
                onClick={handleScrollToProjects}
                className="text-3xl w-full text-center"
              >
                Projects
              </NavLink>
              <NavLink
                href="/"
                onClick={close}
                className="text-3xl w-full text-center"
              >
                Contact
              </NavLink>
            </nav>
            <div className="absolute bottom-4 left-10 w-[150px] h-[150px] pointer-events-none">
              <Observatorio
                className="w-full h-full overflow-visible"
                miraRef={miraRef}
              />
            </div>
            <div
              ref={estrellaRef}
              className="absolute bottom-[200px] right-10 w-[150px] h-[150px] pointer-events-none"
            >
              <Estrella className="w-full h-full overflow-visible" />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default MobileMenu;
