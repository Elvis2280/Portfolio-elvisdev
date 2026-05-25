import Link from 'next/link';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="group relative text-lg text-muted-foreground
        hover:text-neon transition-colors duration-300
        hover:[text-shadow:_0_0_12px_rgba(34,211,238,0.8),_0_0_24px_rgba(34,211,238,0.4)]"
    >
      {children}
      <span
        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-neon-400 rounded-full
        shadow-[0_0_6px_#22D3EE,0_0_12px_#22D3EE,0_0_24px_rgba(34,211,238,0.5)]
        scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
      />
    </Link>
  );
}
