'use client';

import { useEffect, useRef } from 'react';
import Estrella from '@/atoms/Estrella';
import Observatorio from '@/atoms/Observatorio';
import {
  createEstrellaAnimation,
  createMiraAnimation,
} from '@/lib/gsap/animations';
import ExperienceStepper from '@/molecules/ExperienceStepper';
import { experiences } from '@/data/experience';

export default function ExperienceSection() {
  const estrellaRef = useRef<HTMLDivElement>(null);
  const miraRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const ctx = createEstrellaAnimation(estrellaRef.current);
    return () => {
      ctx?.revert();
    };
  }, []);

  useEffect(() => {
    const tl = createMiraAnimation(miraRef.current);
    return () => {
      tl?.kill();
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-background pb-8 ">
      {/* Estrella at top right */}
      <div
        ref={estrellaRef}
        className="absolute top-1/5 right-4 w-[450px] h-[450px] pointer-events-none z-[5] overflow-visible hidden xl:block"
      >
        <Estrella className="w-full h-full overflow-visible" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 pt-32 max-w-4xl">
        <p className="text-caption text-muted-foreground/70 md:text-lg">
          ~/Portfolio/Experience
        </p>

        <h2 className="mt-6">
          <span className="block drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">
            <span className="font-bold text-section md:text-5xl xl:text-5xl 2xl:text-7xl bg-gradient-to-r from-white to-neon bg-clip-text text-transparent">
              Working Experience
            </span>
          </span>
        </h2>

        <p className="mt-4 xl:mt-8 text-body text-muted-foreground/80 leading-relaxed max-w-2xl md:text-lg xl:text-lg">
          Over the past half-decade, I&apos;ve been deeply immersed in building
          scalable digital products across the full stack. Below are my{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            3 latest
          </span>{' '}
          professional roles that highlight my journey and growth throughout my{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            +5 years as a developer
          </span>
          .
        </p>
      </div>

      <div className=" pl-4">
        <ExperienceStepper experiences={experiences} />
      </div>

      {/* Observatorio absolute at bottom right */}
      <div className="absolute bottom-[5%] right-[33%] z-[1] pointer-events-none w-[300px] h-[300px] overflow-visible hidden xl:block xl:left-[50%]">
        <Observatorio
          className="w-full h-full overflow-visible"
          miraRef={miraRef}
        />
      </div>
    </section>
  );
}
