'use client';

import { useEffect, useRef } from 'react';
import Sistema from '@/atoms/Sistema';
import { createSistemaOrbitAnimations } from '@/lib/gsap/animations';

interface SistemaAnimatedProps {
  className?: string;
}

export default function SistemaAnimated({ className }: SistemaAnimatedProps) {
  const saturnRef = useRef<SVGGElement>(null);
  const asteroidRef = useRef<SVGGElement>(null);
  const saturnLine1Ref = useRef<SVGGElement>(null);
  const saturnLine2Ref = useRef<SVGGElement>(null);
  const particules1Ref = useRef<SVGGElement>(null);
  const partciules2Ref = useRef<SVGGElement>(null);
  const particules3Ref = useRef<SVGGElement>(null);
  const speedRef = useRef<SVGGElement>(null);
  const starsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const ctx = createSistemaOrbitAnimations(
      saturnRef.current,
      asteroidRef.current,
      saturnLine1Ref.current,
      saturnLine2Ref.current,
      particules1Ref.current,
      partciules2Ref.current,
      particules3Ref.current,
      speedRef.current,
      starsRef.current,
    );

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <Sistema
      className={className}
      saturnRef={saturnRef}
      asteroidRef={asteroidRef}
      saturnLine1Ref={saturnLine1Ref}
      saturnLine2Ref={saturnLine2Ref}
      particules1Ref={particules1Ref}
      partciules2Ref={partciules2Ref}
      particules3Ref={particules3Ref}
      speedRef={speedRef}
      starsRef={starsRef}
    />
  );
}
