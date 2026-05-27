'use client';

import { useEffect, useRef } from 'react';
import Estrella from '@/atoms/Estrella';
import { createEstrellaAnimation } from '@/lib/gsap/animations';
import ExperienceStepper from '@/molecules/ExperienceStepper';
import { experiences } from '@/data/experience';

export default function ExperienceSection() {
  const estrellaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = createEstrellaAnimation(estrellaRef.current);
    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section className="min-h-[100vh] relative overflow-hidden bg-background">
      {/* Estrella at top right */}
      <div
        ref={estrellaRef}
        className="absolute top-0 right-20 w-[300px] h-[300px] pointer-events-none z-[5] overflow-visible"
      >
        <Estrella className="w-full h-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 pt-32 max-w-4xl">
        <p className="text-caption text-muted-foreground/70">
          ~/Portfolio/Experience
        </p>

        <h2 className="mt-6">
          <span className="block drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">
            <span className="text-section bg-gradient-to-r from-white to-neon bg-clip-text text-transparent">
              Working experience
            </span>
          </span>
        </h2>

        <p className="mt-8 text-body text-muted-foreground/80 leading-relaxed max-w-2xl">
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

        <ExperienceStepper experiences={experiences} />
      </div>

      {/* Smooth fade at section bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/50 to-transparent z-[6] pointer-events-none" />
    </section>
  );
}
