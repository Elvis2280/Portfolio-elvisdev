import Image from 'next/image';
import NavLink from '@/atoms/NavLink';

const Header = () => {
  return (
    <header className="relative h-[72px] p-4 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-[0_4px_32px_rgba(34,211,238,0.18)]">
      {/* Neon cyan glow line at bottom edge */}
      <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
      <nav className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <span className="relative font-bold text-2xl text-white/90 [text-shadow:_0_0_20px_rgba(255,255,255,0.2),_0_0_40px_rgba(34,211,238,0.1),_0_1px_2px_rgba(0,0,0,0.4)]">
            ElvisDev
          </span>
        </div>
        <div className="flex gap-12">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/">Projects</NavLink>
          <NavLink href="/">Contact</NavLink>
        </div>
        <div></div>
      </nav>
    </header>
  );
};

export default Header;
