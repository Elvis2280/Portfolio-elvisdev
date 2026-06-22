'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import SistemaUnified from '@/atoms/SistemaUnified';
import {
  createSistemaOrbitAnimations,
  createOvniProjectAnimations,
  createOvniHoverAnimation,
} from '@/lib/gsap/animations';
import { gsap } from '@/lib/gsap/config';

export interface SistemaUnifiedAnimatedHandle {
  playHoverAnimation: () => void;
}

interface SistemaUnifiedAnimatedProps {
  className?: string;
}

const SVG_WIDTH = 968;
const SVG_HEIGHT = 824;

const SistemaUnifiedAnimated = forwardRef<
  SistemaUnifiedAnimatedHandle,
  SistemaUnifiedAnimatedProps
>(({ className }, ref) => {
  const [planetBBox, setPlanetBBox] = useState<DOMRect | null>(null);

  const starsRef = useRef<SVGGElement>(null);
  const saturnRef = useRef<SVGGElement>(null);
  const asteroidRef = useRef<SVGGElement>(null);
  const saturnLine1Ref = useRef<SVGGElement>(null);
  const saturnLine2Ref = useRef<SVGGElement>(null);
  const particules1Ref = useRef<SVGGElement>(null);
  const particules2Ref = useRef<SVGGElement>(null);
  const particules3Ref = useRef<SVGGElement>(null);
  const speedRef = useRef<SVGGElement>(null);
  const ovniRef = useRef<SVGGElement>(null);
  const weaponRef = useRef<SVGGElement>(null);
  const alienRef = useRef<SVGGElement>(null);
  const lightColorRef = useRef<SVGGElement>(null);
  const planetRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (planetRef.current) {
      setPlanetBBox(planetRef.current.getBBox());
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      createSistemaOrbitAnimations(
        saturnRef.current!,
        asteroidRef.current!,
        saturnLine1Ref.current!,
        saturnLine2Ref.current!,
        particules1Ref.current!,
        particules2Ref.current!,
        particules3Ref.current!,
        speedRef.current!,
        starsRef.current!,
      );

      createOvniProjectAnimations(
        weaponRef.current!,
        ovniRef.current!,
        alienRef.current!,
        lightColorRef.current!,
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const handlePlanetHover = useCallback(() => {
    createOvniHoverAnimation(
      weaponRef.current!,
      ovniRef.current!,
      lightColorRef.current!,
    );
  }, []);

  useImperativeHandle(ref, () => ({
    playHoverAnimation: handlePlanetHover,
  }));

  return (
    <div className={`relative ${className ?? ''}`}>
      <SistemaUnified
        className="w-full h-full overflow-visible"
        starsRef={starsRef}
        saturnRef={saturnRef}
        asteroidRef={asteroidRef}
        saturnLine1Ref={saturnLine1Ref}
        saturnLine2Ref={saturnLine2Ref}
        particules1Ref={particules1Ref}
        particules2Ref={particules2Ref}
        particules3Ref={particules3Ref}
        speedRef={speedRef}
        ovniRef={ovniRef}
        weaponRef={weaponRef}
        alienRef={alienRef}
        lightColorRef={lightColorRef}
        planetRef={planetRef}
      />
      {planetBBox && (
        <div
          className="pointer-events-auto absolute rounded-full bg-gray-800 animate-planet-glow cursor-pointer z-10"
          style={{
            left: `${(planetBBox.x / SVG_WIDTH) * 100}%`,
            top: `${(planetBBox.y / SVG_HEIGHT) * 100}%`,
            width: `${(planetBBox.width / SVG_WIDTH) * 100}%`,
            height: `${(planetBBox.height / SVG_HEIGHT) * 100}%`,
          }}
          onMouseEnter={handlePlanetHover}
        />
      )}
    </div>
  );
});

SistemaUnifiedAnimated.displayName = 'SistemaUnifiedAnimated';

export default SistemaUnifiedAnimated;
