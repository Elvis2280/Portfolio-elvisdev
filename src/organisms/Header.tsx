'use client';
import NavLink from '@/atoms/NavLink';
import MobileMenu from '@/molecules/MobileMenu';

const projectId = 'project-section';
const Header = () => {
  const handleScrollToProjects = () => {
    document.getElementById(projectId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="relative h-[72px] p-4 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-[0_4px_32px_rgba(34,211,238,0.18)]">
      {/* Neon cyan glow line at bottom edge */}
      <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
      <nav className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <span className="relative font-bold text-2xl text-white/90 animate-header-blink lg:text-3xl">
            ElvisDev
          </span>
        </div>
        <div className="gap-12 hidden md:flex">
          <NavLink className="text-xl lg:text-2xl" href="/">
            Home
          </NavLink>
          <NavLink
            className="text-xl lg:text-2xl"
            href="/"
            onClick={handleScrollToProjects}
          >
            Projects
          </NavLink>
          <NavLink className="text-xl lg:text-2xl" href="/">
            Contact
          </NavLink>
        </div>
        <MobileMenu onNavigate={handleScrollToProjects} />
        <div className="hidden md:block"></div>
      </nav>
    </header>
  );
};

export default Header;
