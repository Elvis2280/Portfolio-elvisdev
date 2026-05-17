import Image from 'next/image';
import { Button } from '@/atoms/ui/button';

const Header = () => {
  return (
    <header className="p-4 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <span className="font-bold text-2xl bg-gradient-to-b from-white/90 via-white/50 to-neon-300/40 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(34,211,238,0.15)]">
            ElvisDev
          </span>
          <Image
            src="/illustrations/icon.png"
            alt="website logo"
            width={50}
            height={50}
          />
        </div>
        <div className="flex gap-3">
          <Button className="text-lg bg-card/40 backdrop-blur-sm border border-border/40 rounded-xl text-muted-foreground hover:bg-accent/20 hover:text-foreground hover:border-accent/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.1)]" variant="ghost" size={'lg'}>
            Home
          </Button>
          <Button className="text-lg bg-card/40 backdrop-blur-sm border border-border/40 rounded-xl text-muted-foreground hover:bg-accent/20 hover:text-foreground hover:border-accent/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.1)]" variant="ghost" size={'lg'}>
            Projects
          </Button>
          <Button className="text-lg bg-card/40 backdrop-blur-sm border border-border/40 rounded-xl text-muted-foreground hover:bg-accent/20 hover:text-foreground hover:border-accent/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.1)]" variant="ghost" size={'lg'}>
            Contact
          </Button>
        </div>
        <div></div>
      </nav>
    </header>
  );
};

export default Header;
