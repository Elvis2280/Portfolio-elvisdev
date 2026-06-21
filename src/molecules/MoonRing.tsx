'use client';

import React, { useMemo } from 'react';

interface MoonRingProps {
  children: React.ReactNode[];
  direction?: 'clockwise' | 'counterclockwise';
  duration?: number;
  scale?: number;
  className?: string;
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 10000;
  return x - Math.floor(x);
}

export default function MoonRing({
  children,
  direction = 'clockwise',
  duration = 20,
  scale = 1.5,
  className = '',
}: MoonRingProps) {
  const items = React.Children.toArray(children).slice(0, 5);

  // Generate deterministic "random" positions with minimum spacing
  const positions = useMemo(() => {
    const count = items.length;
    if (count === 0) return [];

    const segmentSize = 360 / count;
    const minBuffer = 25; // minimum degrees from segment edges

    return Array.from({ length: count }, (_, i) => {
      const segmentStart = i * segmentSize;
      const minAngle = segmentStart + minBuffer;
      const maxAngle = segmentStart + segmentSize - minBuffer;

      // Deterministic "random" using index as seed
      const randomFactor = pseudoRandom(i + 42);
      const angleDeg = minAngle + randomFactor * (maxAngle - minAngle);

      return (angleDeg * Math.PI) / 180;
    });
  }, [items.length]);

  const spinClass =
    direction === 'clockwise' ? 'animate-spin-cw' : 'animate-spin-ccw';
  const itemSpinClass =
    direction === 'clockwise'
      ? 'animate-item-spin-ccw'
      : 'animate-item-spin-cw';

  const ringWidthPercent = (scale / 1.5) * 100;

  return (
    <div
      className={`absolute aspect-square rounded-full border border-border/50 ${spinClass} ${className}`}
      style={{
        width: `${ringWidthPercent}%`,
        height: `${ringWidthPercent}%`,
        top: '50%',
        left: '50%',
        marginLeft: `-${ringWidthPercent / 2}%`,
        marginTop: `-${ringWidthPercent / 2}%`,
        animationDuration: `${duration}s`,
      }}
    >
      {/* Items on circumference */}
      {items.map((child, index) => {
        const angle = positions[index];
        const x = 50 + 50 * Math.cos(angle);
        const y = 50 + 50 * Math.sin(angle);

        return (
          <div
            key={index}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className={`w-5 h-5 md:w-8 md:h-8 flex items-center justify-center text-white ${itemSpinClass}`}
              style={{ animationDuration: `${duration}s` }}
            >
              {child}
            </div>
          </div>
        );
      })}
    </div>
  );
}
