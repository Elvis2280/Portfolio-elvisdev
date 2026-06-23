'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { FaReact, FaPython, FaNodeJs, FaVuejs } from 'react-icons/fa';
import { FaGolang } from 'react-icons/fa6';
import { RiNextjsFill } from 'react-icons/ri';
import MoonRing from '@/molecules/MoonRing';
import SpeechBubble from '@/molecules/SpeechBubble';
import ConchoAstronaut from '@/atoms/ConchoAstronaut';
import {
  createAstronautAnimation,
  createBlinkAnimation,
  createCinturonGlowAnimation,
} from '@/lib/gsap/animations';
import { speechData } from '@/data/speech';

export default function HeroSection() {
  const astronautRef = useRef<HTMLDivElement>(null);
  const parpadosRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const floatAnim = createAstronautAnimation(astronautRef.current);
    const blinkAnim = createBlinkAnimation(parpadosRef.current);
    const cinturonAnim = createCinturonGlowAnimation();
    return () => {
      floatAnim?.kill();
      blinkAnim?.kill();
      cinturonAnim?.kill();
    };
  }, []);

  return (
    <section
      className="h-[calc(100vh-72px)] px-4 bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: 'url(/images/bg/space-background.svg)' }}
    >
      <div className="absolute inset-0 bg-background/80" />

      {/* Sun at top right - 50% visible */}
      <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 aspect-square pointer-events-none z-[5] w-[300px] h-[300px] md:w-[500px] md:h-[500px] xl:w-[550px] xl:h-[550px] 2xl:w-[800px] 2xl:h-[800px]">
        <Image
          src="/images/decorations/planets/sun.svg"
          alt="Sun decoration"
          fill
          className="object-contain animate-sun-glow"
        />
      </div>

      <div className="relative z-10 pt-12 max-w-4xl">
        <p className="text-caption text-muted-foreground/70 md:text-lg">
          ~/Portfolio/Main
        </p>

        <h1 className="font-heading mt-2">
          <span className="block text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-white">
            Fullstack
          </span>
          <span className="block drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">
            <span className="text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl bg-gradient-to-br from-neon via-neon-300 to-purple bg-clip-text text-transparent">
              Developer
            </span>
          </span>
        </h1>

        <p className="mt-8 text-body text-muted-foreground/80 leading-relaxed max-w-xl md:text-xl lg:max-w-md 2xl:max-w-xl">
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
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[55vw] lg:w-[57.6vw] min-[1290px]:w-[60vw] min-[1290px]:max-w-[760px] min-[1440px]:w-[65vw] min-[1920px]:w-[129.6vw] max-w-[500px] lg:max-w-[720px] min-[1440px]:max-w-[800px] min-[1920px]:max-w-[1620px] aspect-square pointer-events-none z-[5]">
        {/* Ring 1: Inner, Clockwise */}

        <MoonRing
          direction="clockwise"
          duration={20}
          className="scale-[2.2] md:scale-[1.7] lg:scale-[1.1] xl:scale-[1] 2xl:scale-[1.6]"
        >
          <FaReact className="text-[34px]" />
          <Image
            src="/images/decorations/planets/earth.svg"
            alt="Earth"
            width={42}
            height={42}
            className="w-12 h-12 object-contain"
          />
          <FaVuejs className="text-[34px]" />
          <RiNextjsFill className="text-[34px]" />
          <Image
            src="/images/decorations/objects/ovni.svg"
            alt="OVNI"
            width={42}
            height={42}
            className="w-12 h-12 object-contain"
          />
        </MoonRing>

        {/* Ring 2: Outer, Counter-clockwise */}

        <MoonRing
          direction="counterclockwise"
          duration={20}
          className="scale-[1.9] md:scale-[1.5] lg:scale-[1.3] xl:scale-[1.2] 2xl:scale-[1.4]"
        >
          <FaPython className="text-[34px]" />
          <Image
            src="/images/decorations/planets/saturn.svg"
            alt="Saturn"
            width={24}
            height={24}
            className="w-12 h-12 object-contain"
          />
          <FaGolang className="text-[34px]" />
          <FaNodeJs className="text-[34px]" />
          <Image
            src="/images/decorations/objects/rocket.svg"
            alt="Rocket"
            width={24}
            height={24}
            className="w-12 h-12 object-contain"
          />
        </MoonRing>

        {/* Moon at center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-[400px] h-[400px] md:w-[600px] md:h-[600px] lg:w-[650px] lg:h-[650px] 2xl:w-[900px] 2xl:h-[900px] ">
          <Image
            src="/images/decorations/planets/moon.svg"
            alt="Moon decoration"
            fill
            className="object-contain animate-moon-glow"
            loading="eager"
          />
        </div>
      </div>

      {/* Astronaut floating above the moon */}
      <div
        ref={astronautRef}
        className="absolute bottom-[120px] left-1/2 -translate-x-1/2  pointer-events-none z-[7] w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] md:bottom-[250px] lg:w-[250px] lg:h-[250px] lg:bottom-[220px] 2xl:w-[400px] 2xl:h-[400px] 2xl:bottom-[300px]"
      >
        <SpeechBubble
          messages={speechData.intro}
          delay={5}
          arrowPosition="left"
          typingSpeed={100}
          className="absolute -top-16 left-4 w-24 md:-top-28 "
        />
        <ConchoAstronaut className="w-full h-full" parpadosRef={parpadosRef} />
      </div>

      {/* Smooth fade at section bottom — gradual transition over 192px */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-background via-background/50 to-transparent z-[6] pointer-events-none" />
    </section>
  );
}
