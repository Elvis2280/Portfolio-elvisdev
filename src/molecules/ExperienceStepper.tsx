'use client';

import { useEffect, useRef } from 'react';
import ExperienceStep from '@/molecules/ExperienceStep';
import ConchoHelmet from '@/atoms/ConchoHelmet';
import { gsap, ScrollTrigger } from '@/lib/gsap/config';
import type { Experience } from '@/data/experience';

interface ExperienceStepperProps {
  experiences: Experience[];
}

export default function ExperienceStepper({
  experiences,
}: ExperienceStepperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const helmetRef = useRef<HTMLDivElement>(null);
  const antenaRef = useRef<SVGGElement>(null);

  const stepNodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotFillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const connFillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  const count = experiences.length;

  useEffect(() => {
    const container = containerRef.current;
    const helmet = helmetRef.current;
    if (!container || !helmet) return;

    const containerRect = container.getBoundingClientRect();
    const dotPositions = stepNodeRefs.current.slice(0, count).map((dot) => {
      if (!dot) return { x: 0, y: 0 };
      const rect = dot.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
      };
    });

    gsap.set(helmet, {
      xPercent: -50,
      yPercent: -50,
      x: dotPositions[0].x - 12,
      y: dotPositions[0].y,
    });

    if (dotFillRefs.current[0]) {
      gsap.set(dotFillRefs.current[0], { height: '100%' });
    }
    for (let i = 1; i < dotFillRefs.current.length; i++) {
      if (dotFillRefs.current[i]) {
        gsap.set(dotFillRefs.current[i], { height: '0%' });
      }
    }
    connFillRefs.current.forEach((fill) => {
      if (fill) gsap.set(fill, { height: '0%' });
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      for (let i = 1; i < count; i++) {
        const t = i;

        if (dotFillRefs.current[i]) {
          tl.to(
            dotFillRefs.current[i],
            { height: '100%', duration: 1, ease: 'none' },
            t - 1,
          );
        }

        if (i > 0 && connFillRefs.current[i - 1]) {
          tl.to(
            connFillRefs.current[i - 1],
            { height: '100%', duration: 1, ease: 'none' },
            t - 1,
          );
        }

        tl.to(
          helmet,
          {
            x: dotPositions[i].x - 12,
            y: dotPositions[i].y,
            duration: 1,
            ease: 'none',
          },
          t - 1,
        );
      }

      const lastStep = textRefs.current[count - 1];
      let maxProgress = 0;

      ScrollTrigger.create({
        trigger: container,
        start: 'top 80%',
        endTrigger: lastStep ?? undefined,
        end: 'top 80%',
        onUpdate(self) {
          const target = Math.max(maxProgress, self.progress);
          maxProgress = target;
          tl.progress(target);
        },
      });

      if (antenaRef.current) {
        gsap.set(antenaRef.current, { transformOrigin: '50% 100%' });
        gsap.fromTo(
          antenaRef.current,
          { rotation: -8 },
          {
            rotation: 8,
            duration: 1.5,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
          },
        );
      }
    }, container);

    const observers: IntersectionObserver[] = [];
    textRefs.current.slice(0, count).forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.remove('opacity-0');
            el.classList.add('animate-step-fade-in');
            el.style.animationDelay = `${0.5 + i * 0.15}s`;
            observer.unobserve(el);
          }
        },
        { threshold: 0.2 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      ctx.revert();
      observers.forEach((o) => o.disconnect());
    };
  }, [count]);

  return (
    <div ref={containerRef} className="relative mt-16 px-4">
      <div
        ref={helmetRef}
        className="absolute z-20 pointer-events-none w-16 h-16 lg:w-20 lg:h-20 2xl:w-24 2xl:h-24"
      >
        <ConchoHelmet className="w-full h-full" antenaRef={antenaRef} />
      </div>

      {experiences.map((exp, index) => (
        <div key={exp.id}>
          <ExperienceStep
            index={index}
            isLast={index === count - 1}
            dotRef={(el) => {
              stepNodeRefs.current[index] = el;
            }}
            dotFillRef={(el) => {
              dotFillRefs.current[index] = el;
            }}
            connectorFillRef={(el) => {
              connFillRefs.current[index] = el;
            }}
            textRef={(el) => {
              textRefs.current[index] = el;
            }}
          >
            <ExperienceStep.Title>{exp.title}</ExperienceStep.Title>
            <ExperienceStep.Subtitle>{exp.subtitle}</ExperienceStep.Subtitle>
            <ExperienceStep.Text>{exp.text}</ExperienceStep.Text>
          </ExperienceStep>
        </div>
      ))}
    </div>
  );
}
