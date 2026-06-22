'use client';

import { useEffect, useRef, useState } from 'react';
import ConchoMusic from '@/atoms/ConchoMusic';
import {
  createBlinkAnimation,
  createNotesAnimation,
} from '@/lib/gsap/animations';
import { IoBatteryFull } from 'react-icons/io5';
import {
  TbPlayerSkipBackFilled,
  TbPlayerSkipForwardFilled,
  TbPlayerPlayFilled,
  TbPlayerPauseFilled,
} from 'react-icons/tb';
import { spotifyCurrentPlayingData } from '@/types/spotify';
import { FaRandom } from 'react-icons/fa';
import { FaRepeat } from 'react-icons/fa6';

import Image from 'next/image';

interface ConchoMusicAnimatedProps {
  className?: string;
  playingData?: spotifyCurrentPlayingData | null;
}

const SVG_WIDTH = 663;
const SVG_HEIGHT = 715;

export default function ConchoMusicAnimated({
  className,
  playingData,
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
          className="absolute border-2 border-background bg-background bg-center"
          style={{
            left: `${(pantallaBBox.x / SVG_WIDTH) * 100}%`,
            top: `${(pantallaBBox.y / SVG_HEIGHT) * 100}%`,
            width: `${(pantallaBBox.width / SVG_WIDTH) * 104}%`,
            height: `${(pantallaBBox.height / SVG_HEIGHT) * 104}%`,
            backgroundImage: `url('/images/album_pictures/x100pre.webp'})`,
          }}
        >
          {playingData ? (
            <IpodPlayingMusic playingData={playingData} />
          ) : (
            <IpodNoPlayingMusic />
          )}
        </div>
      )}
    </div>
  );
}

const IpodNoPlayingMusic = () => {
  return (
    <div className="text-white p-1 flex flex-col items-center justify-between h-full">
      <div className=" flex justify-between items-center w-full">
        <span> </span>
        <p className="text-[8px]">IPOD</p>
        <IoBatteryFull className="text-[8px]" />
      </div>
      <div className="text-[10px] flex flex-col gap-1">
        <p className="text-center text-[6px] bg-background/70 px-1">
          Elvis is not listening music ☹️
        </p>
      </div>
      <div className="flex gap-2 text-black text-sm">
        <span className="w-4 h-4 rounded-full text-white flex items-center justify-center ">
          <TbPlayerSkipBackFilled size={12} />
        </span>
        <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center ">
          <TbPlayerPlayFilled size={12} />
        </span>
        <span className="w-4 h-4 rounded-full text-white  flex items-center justify-center">
          <TbPlayerSkipForwardFilled size={12} />
        </span>
      </div>
    </div>
  );
};

const IpodPlayingMusic = ({
  playingData,
}: {
  playingData: spotifyCurrentPlayingData;
}) => {
  return (
    <div className="text-white p-1 flex flex-col items-center justify-between h-full">
      <div className=" flex justify-between items-center w-full">
        <span> </span>
        <p className="text-[6px]">IPOD</p>
        <IoBatteryFull className="text-[8px]" />
      </div>
      <div className="text-[10px] flex flex-col gap-1">
        <Image
          src={playingData.albumImageUrl}
          width={24}
          height={24}
          alt="spotify album cover"
        />
      </div>
      <div>
        <div className="flex flex-col">
          <span className=" text-[4px]">{playingData.title}</span>
          <span className="text-[4px]">{playingData.artist}</span>
        </div>
        <div className="flex gap-2 text-black text-sm">
          <span className="w-2 h-2 rounded-full text-white flex items-center justify-center ">
            <FaRandom size={6} />
          </span>
          <span className="w-2 h-2 rounded-full text-white flex items-center justify-center ">
            <TbPlayerSkipBackFilled size={6} />
          </span>
          <span className="w-2 h-2 rounded-full bg-white flex items-center justify-center ">
            <TbPlayerPauseFilled size={6} />
          </span>
          <span className="w-2 h-2 rounded-full text-white  flex items-center justify-center">
            <TbPlayerSkipForwardFilled size={6} />
          </span>
          <span className="w-2 h-2 rounded-full text-white flex items-center justify-center ">
            <FaRepeat size={6} />
          </span>
        </div>
      </div>
    </div>
  );
};

const YHLQMDLGN = () => (
  <div
    className="w-16 h-16 bg-cover bg-center"
    style={{ backgroundImage: "url('/images/album_pictures/YHLQMDLGN.webp')" }}
  />
);

const nadie_sabe_loque_vapasar = () => (
  <div
    className="w-16 h-16 bg-cover bg-center"
    style={{
      backgroundImage:
        "url('/images/album_pictures/nadie-sabe_loque_vapasar.webp')",
    }}
  />
);

const ultimo_tour = () => (
  <div
    className="w-16 h-16 bg-cover bg-center"
    style={{
      backgroundImage: "url('/images/album_pictures/ultimo_tour.webp')",
    }}
  />
);

const un_verano_sin_ti = () => (
  <div
    className="w-16 h-16 bg-cover bg-center"
    style={{
      backgroundImage: "url('/images/album_pictures/un_verano_sin_ti.webp')",
    }}
  />
);

const x100pre = () => (
  <div
    className="w-16 h-16 bg-cover bg-center"
    style={{ backgroundImage: "url('/images/album_pictures/x100pre.webp')" }}
  />
);
