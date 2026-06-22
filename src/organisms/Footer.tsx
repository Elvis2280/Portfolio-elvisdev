import { githubLink } from '@/data/links';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative h-[72px] p-4 bg-background/80 backdrop-blur-md border-t border-border/50 shadow-[0_-4px_32px_rgba(34,211,238,0.18)]">
      {/* Neon cyan glow line at top edge */}
      <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />

      <div className="flex justify-between items-center h-full">
        {/* Left: ElvisDev with animation */}
        <span className="relative font-bold text-2xl text-white/90 animate-header-blink">
          ElvisDev
        </span>

        {/* Center: Credits */}
        <p className="text-sm text-muted-foreground/70">
          Made with a 🍺 and some 🌮 by Elvis Miranda
        </p>

        {/* Right: Icon placeholders */}
        <div className="flex gap-3 items-center">
          <Link href={githubLink} target="_blank">
            <FaGithub className="text-white" size={28} />
          </Link>
          <div className="w-8 h-8 rounded-full bg-white/10 border border-border/50" />
        </div>
      </div>
    </footer>
  );
}
