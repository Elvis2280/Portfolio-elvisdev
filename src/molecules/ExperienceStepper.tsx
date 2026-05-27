'use client';

import { useEffect, useRef } from 'react';
import ExperienceStep from '@/molecules/ExperienceStep';
import { createStepperEntrance } from '@/lib/gsap/animations';
import type { Experience } from '@/data/experience';

interface ExperienceStepperProps {
  experiences: Experience[];
}

export default function ExperienceStepper({
  experiences,
}: ExperienceStepperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = createStepperEntrance(containerRef.current);
    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="mt-16">
      {experiences.map((exp, index) => (
        <div key={exp.id} data-stepper-step>
          <ExperienceStep isLast={index === experiences.length - 1}>
            <ExperienceStep.Title>{exp.title}</ExperienceStep.Title>
            <ExperienceStep.Subtitle>{exp.subtitle}</ExperienceStep.Subtitle>
            <ExperienceStep.Text>{exp.text}</ExperienceStep.Text>
          </ExperienceStep>
        </div>
      ))}
    </div>
  );
}
