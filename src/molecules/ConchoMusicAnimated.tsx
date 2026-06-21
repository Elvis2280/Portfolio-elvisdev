'use client';

import { useEffect, useRef, useState } from 'react';
import ConchoMusic from '@/atoms/ConchoMusic';
import {
  createBlinkAnimation,
  createNotesAnimation,
} from '@/lib/gsap/animations';
import { IoBatteryFull } from 'react-icons/io5';

interface ConchoMusicAnimatedProps {
  className?: string;
}

const SVG_WIDTH = 663;
const SVG_HEIGHT = 715;

export default function ConchoMusicAnimated({
  className,
}: ConchoMusicAnimatedProps) {
  const notesRRef = useRef<SVGGElement>(null);
  const notesLRef = useRef<SVGGElement>(null);
  const audifonoLRef = useRef<SVGGElement>(null);
  const audifonoRRef = useRef<SVGGElement>(null);
  const pantallaRef = useRef<SVGGElement>(null);
  const parpadosRef = useRef<SVGGElement>(null);
  const [pantallaBBox, setPantallaBBox] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (pantallaRef.current) {
      setPantallaBBox(pantallaRef.current.getBBox());
    }
  }, []);

  useEffect(() => {
    const blinkAnim = createBlinkAnimation(parpadosRef.current);
    const notesAnim = createNotesAnimation(
      notesLRef.current,
      notesRRef.current,
    );
    return () => {
      blinkAnim?.kill();
      notesAnim?.revert();
    };
  }, []);

  return (
    <div className={`relative ${className ?? ''}`}>
      <ConchoMusic
        className="w-full h-full"
        notesRRef={notesRRef}
        notesLRef={notesLRef}
        audifonoLRef={audifonoLRef}
        audifonoRRef={audifonoRRef}
        pantallaRef={pantallaRef}
        parpadosRef={parpadosRef}
      />
      {pantallaBBox && (
        <div
          className="absolute bg-white border-2 border-background"
          style={{
            left: `${(pantallaBBox.x / SVG_WIDTH) * 100}%`,
            top: `${(pantallaBBox.y / SVG_HEIGHT) * 100}%`,
            width: `${(pantallaBBox.width / SVG_WIDTH) * 102}%`,
            height: `${(pantallaBBox.height / SVG_HEIGHT) * 102}%`,
          }}
        >
          <IpodNoPlayingMusic />
        </div>
      )}
    </div>
  );
}

const IpodNoPlayingMusic = () => {
  return (
    <div className="text-black p-1">
      <div className=" flex justify-around items-center">
        <span> </span>
        <p className="text-[8px]">IPOD</p>
        <IoBatteryFull className="text-[8px]" />
      </div>
      <div className="text-[10px] flex flex-col gap-1">
        <p className="text-center text-[6px]">No soundtrack detected.</p>
      </div>
    </div>
  );
};
