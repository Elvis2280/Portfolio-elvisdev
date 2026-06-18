'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import OvniProject from '@/atoms/OvniProject';
import {
  createOvniProjectAnimations,
  createOvniHoverAnimation,
} from '@/lib/gsap/animations';

export interface OvniProjectAnimatedHandle {
  playHoverAnimation: () => void;
}

interface OvniProjectAnimatedProps {
  className?: string;
}

const OvniProjectAnimated = forwardRef<
  OvniProjectAnimatedHandle,
  OvniProjectAnimatedProps
>(({ className }, ref) => {
  const weaponRef = useRef<SVGGElement>(null);
  const ovniRef = useRef<SVGGElement>(null);
  const alienRef = useRef<SVGGElement>(null);
  const lightColorRef = useRef<SVGGElement>(null);

  useImperativeHandle(ref, () => ({
    playHoverAnimation: () => {
      createOvniHoverAnimation(
        weaponRef.current,
        ovniRef.current,
        lightColorRef.current,
      );
    },
  }));

  useEffect(() => {
    const ctx = createOvniProjectAnimations(
      weaponRef.current,
      ovniRef.current,
      alienRef.current,
      lightColorRef.current,
    );

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <OvniProject
      className={className}
      weaponRef={weaponRef}
      ovniRef={ovniRef}
      alienRef={alienRef}
      lightColorRef={lightColorRef}
    />
  );
});

OvniProjectAnimated.displayName = 'OvniProjectAnimated';

export default OvniProjectAnimated;
