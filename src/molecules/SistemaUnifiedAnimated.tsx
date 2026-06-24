'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SistemaUnified from '@/atoms/SistemaUnified';
import { Badge } from '@/atoms/ui/badge';
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
  projectTitle?: string;
  leftTechStack: string[];
  rightTechStack: string[];
  slug?: string;
  previewImageUrl?: string;
  previewImageAlt?: string;
}

const SVG_WIDTH = 968;
const SVG_HEIGHT = 824;

const SistemaUnifiedAnimated = forwardRef<
  SistemaUnifiedAnimatedHandle,
  SistemaUnifiedAnimatedProps
>(
  (
    {
      className,
      projectTitle,
      leftTechStack,
      rightTechStack,
      slug,
      previewImageUrl,
      previewImageAlt,
    },
    ref,
  ) => {
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

    const centerX = planetBBox ? planetBBox.x + planetBBox.width / 2 : 0;
    const centerY = planetBBox ? planetBBox.y + planetBBox.height / 2 : 0;
    const radius = planetBBox ? planetBBox.width / 2 : 0;

    const getTechPosition = (index: number, total: number) => {
      const itemSpacing = 15;
      const totalArc = itemSpacing * (total - 1);
      const startAngle = -totalArc / 2; // centers the stack vertically

      const angleDeg = startAngle + index * itemSpacing;
      const angleRad = (angleDeg * Math.PI) / 180;
      const offset = 18;

      const itemX = centerX + (radius + offset) * Math.cos(angleRad);
      const itemY = centerY + (radius + offset) * Math.sin(angleRad);

      return {
        left: `${(itemX / SVG_WIDTH) * 100}%`,
        top: `${(itemY / SVG_HEIGHT) * 100}%`,
      };
    };

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
          <Link
            href={slug ? `/${slug}` : '#'}
            className="absolute rounded-full overflow-hidden cursor-pointer z-10 group animate-planet-glow"
            style={{
              left: `${(planetBBox.x / SVG_WIDTH) * 100}%`,
              top: `${(planetBBox.y / SVG_HEIGHT) * 100}%`,
              width: `${(planetBBox.width / SVG_WIDTH) * 100}%`,
              height: `${(planetBBox.height / SVG_HEIGHT) * 100}%`,
            }}
            onMouseEnter={handlePlanetHover}
          >
            {previewImageUrl ? (
              <Image
                src={previewImageUrl}
                alt={previewImageAlt || projectTitle || 'Project preview'}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-800" />
            )}
          </Link>
        )}
        {planetBBox && leftTechStack && leftTechStack.length > 0 && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            {leftTechStack.map((tech, index) => {
              const pos = getTechPosition(index, leftTechStack.length);
              return (
                <div
                  key={tech}
                  className="absolute"
                  style={{
                    right: pos.left,
                    top: pos.top,
                    transform: 'translate(20%, -50%)',
                  }}
                >
                  <Badge variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                </div>
              );
            })}
          </div>
        )}
        {planetBBox && rightTechStack && rightTechStack.length > 0 && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            {rightTechStack.map((tech, index) => {
              const pos = getTechPosition(index, rightTechStack.length);
              return (
                <div
                  key={tech}
                  className="absolute"
                  style={{
                    left: pos.left,
                    top: pos.top,
                    transform: 'translate(20%, -50%)',
                  }}
                >
                  <Badge variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);

SistemaUnifiedAnimated.displayName = 'SistemaUnifiedAnimated';

export default SistemaUnifiedAnimated;
