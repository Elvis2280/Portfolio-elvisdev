'use client';

import { useEffect, useRef } from 'react';
import ExperienceStep from '@/molecules/ExperienceStep';
import ConchoHelmet from '@/atoms/ConchoHelmet';
import { createExperienceScrollAnimation } from '@/lib/gsap/animations';
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
    const animation = createExperienceScrollAnimation(
      containerRef.current,
      helmetRef.current,
      antenaRef.current,
      stepNodeRefs.current.slice(0, count),
      dotFillRefs.current.slice(0, count),
      connFillRefs.current.slice(0, count - 1),
      textRefs.current.slice(0, count),
    );

    if (!animation || !containerRef.current) return;

    const stepper = containerRef.current;
    const threshold = stepper.offsetHeight <= window.innerHeight ? 1.0 : 0.8;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          animation.activateTrap();
        } else if (entry.intersectionRatio < 0.5) {
          animation.releaseTrap();
        }
      },
      {
        rootMargin: '40px 0px 0px 0px',
        threshold: [0.4, threshold],
      },
    );

    observer.observe(stepper);

    return () => {
      observer.disconnect();
      animation.ctx.revert();
    };
  }, [count]);

  return (
    <div ref={containerRef} className="relative mt-16 px-4">
      <div
        ref={helmetRef}
        className="absolute z-10 pointer-events-none w-16 h-16 lg:w-20 lg:h-20 2xl:w-24 2xl:h-24 z-20"
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
