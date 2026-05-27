'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { FaReact, FaPython, FaNodeJs, FaVuejs } from 'react-icons/fa';
import { FaGolang } from 'react-icons/fa6';
import { RiNextjsFill } from 'react-icons/ri';
import MoonRing from '@/molecules/MoonRing';
import SpeechBubble from '@/molecules/SpeechBubble';
import { createAstronautAnimation } from '@/lib/gsap/animations';

export default function HeroSection() {
  const astronautRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anim = createAstronautAnimation(astronautRef.current);
    return () => {
      anim?.kill();
    };
  }, []);

  return (
    <section
      className="h-[calc(100vh-72px)] px-4 bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: 'url(/images/bg/space-background.svg)' }}
    >
      <div className="absolute inset-0 bg-background/80" />

      {/* Sun at top right - 50% visible */}
      <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-[36vw] max-w-[450px] aspect-square pointer-events-none z-[5]">
        <Image
          src="/images/decorations/planets/sun.svg"
          alt="Sun decoration"
          fill
          className="object-contain animate-sun-glow"
        />
      </div>

      <div className="relative z-10 pt-12 max-w-4xl">
        <p className="text-caption text-muted-foreground/70">
          ~/Portfolio/Main
        </p>

        <h1 className="mt-6">
          <span className="block text-hero text-white">Fullstack</span>
          <span className="block drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">
            <span className="text-hero bg-gradient-to-br from-neon via-neon-300 to-purple bg-clip-text text-transparent">
              Developer
            </span>
          </span>
        </h1>

        <p className="mt-8 text-body text-muted-foreground/80 leading-relaxed max-w-2xl">
          Building robust digital solutions from concept to production. Five
          years of experience across{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            Go
          </span>
          ,{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            Python
          </span>
          , and{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            Node.js
          </span>{' '}
          architecture, paired with interactive{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            React
          </span>{' '}
          frontends.
        </p>
      </div>

      {/* Moon + Rings wrapper */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[72vw] max-w-[900px] aspect-square pointer-events-none z-[5]">
        {/* Ring 1: Inner, Clockwise */}

        <MoonRing direction="clockwise" duration={20} scale={1.5}>
          <FaReact className="text-[32px]" />
          <Image
            src="/images/decorations/planets/earth.svg"
            alt="Earth"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
          <FaVuejs className="text-[32px]" />
          <RiNextjsFill className="text-[32px]" />
          <Image
            src="/images/decorations/objects/ovni.svg"
            alt="OVNI"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
        </MoonRing>

        {/* Ring 2: Outer, Counter-clockwise */}

        <MoonRing direction="counterclockwise" duration={20} scale={1.3}>
          <FaPython className="text-[32px]" />
          <Image
            src="/images/decorations/planets/saturn.svg"
            alt="Saturn"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
          <FaGolang className="text-[32px]" />
          <FaNodeJs className="text-[32px]" />
          <Image
            src="/images/decorations/objects/rocket.svg"
            alt="Rocket"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
        </MoonRing>

        {/* Moon at center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%]">
          <Image
            src="/images/decorations/planets/moon.svg"
            alt="Moon decoration"
            fill
            className="object-contain animate-moon-glow"
          />
        </div>
      </div>

      {/* Astronaut floating above the moon */}
      <div
        ref={astronautRef}
        className="absolute bottom-[400px] left-1/2 -translate-x-1/2 w-[350px] h-[350px] pointer-events-none z-[7]"
      >
        <SpeechBubble
          messages={[
            `Holaa, I’m Concho 👋
Elvis is such a huge fan of Bad Bunny that I somehow became part of his daily life too 😎
Yep… you can spot me in the DTMF music album. Since then, I’ve been hanging around while he builds cool things on the internet`,
            `Outside of coding, me and Elvis are usually vibing to music 🎵, playing games 🎮, traveling ✈️, cooking something good 🍳, or dancing like nobody’s watching 💃
That Latino energy? It’s always part of the process`,
            `Sooo… if you need a developer with creativity, good vibes, and Latino sazón 🌴🔥
you’re definitely in the right place.
Hope we can connect and build something amazing together!`,
          ]}
          delay={5}
          arrowPosition="center"
          typingSpeed={100}
          className="absolute -top-16 left-4 w-24"
        />
        <Image
          src="/images/decorations/objects/concho-astronaut.webp"
          alt="Astronaut"
          fill
          className="object-contain"
        />
      </div>

      {/* Smooth fade at section bottom — gradual transition over 192px */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/50 to-transparent z-[6] pointer-events-none" />
    </section>
  );
}
