'use client';

import { useEffect, useRef, useState } from 'react';
import ConchoMusic from '@/atoms/ConchoMusic';
import {
  createBlinkAnimation,
  createNotesAnimation,
  createHeadSway,
  createAlbumOrbit,
} from '@/lib/gsap/animations';
import { gsap } from '@/lib/gsap/config';
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
import SpeechBubble from '@/molecules/SpeechBubble';

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
  const headRef = useRef<SVGGElement>(null);
  const leftAlbumContainerRef = useRef<HTMLDivElement>(null);
  const rightAlbumContainerRef = useRef<HTMLDivElement>(null);
  const leftOrbitRef = useRef<gsap.core.Animation | null>(null);
  const rightOrbitRef = useRef<gsap.core.Animation | null>(null);
  const headSwayRef = useRef<gsap.core.Tween | null>(null);
  const [pantallaBBox, setPantallaBBox] = useState<DOMRect | null>(null);
  const [activeLeftAlbum, setActiveLeftAlbum] = useState<React.ReactNode>(null);
  const [activeRightAlbum, setActiveRightAlbum] =
    useState<React.ReactNode>(null);

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

  useEffect(() => {
    if (!playingData?.isPlaying) {
      leftOrbitRef.current?.kill();
      rightOrbitRef.current?.kill();
      headSwayRef.current?.kill();
      gsap.set(headRef.current, { rotation: 0 });
      leftOrbitRef.current = null;
      rightOrbitRef.current = null;
      headSwayRef.current = null;
      return;
    }

    const albums = [
      YHLQMDLGN,
      nadie_sabe_loque_vapasar,
      ultimo_tour,
      un_verano_sin_ti,
      x100pre,
    ];

    const pick = () => albums[Math.floor(Math.random() * albums.length)];

    queueMicrotask(() => {
      const LeftAlbum = pick();
      const RightAlbum = pick();
      setActiveLeftAlbum(<LeftAlbum />);
      setActiveRightAlbum(<RightAlbum />);
    });

    headSwayRef.current = createHeadSway(headRef.current);

    requestAnimationFrame(() => {
      leftOrbitRef.current = createAlbumOrbit(
        leftAlbumContainerRef.current,
        '#STROKE_4ecd9116-ec81-4159-8967-4aa59d9251cc',
        () => {
          const NextAlbum = pick();
          setActiveLeftAlbum(<NextAlbum />);
        },
      );

      rightOrbitRef.current = createAlbumOrbit(
        rightAlbumContainerRef.current,
        '#audifonoR > path:first-of-type',
        () => {
          const NextAlbum = pick();
          setActiveRightAlbum(<NextAlbum />);
        },
      );
    });

    return () => {
      leftOrbitRef.current?.kill();
      rightOrbitRef.current?.kill();
      headSwayRef.current?.kill();
      gsap.set(headRef.current, { rotation: 0 });
      leftOrbitRef.current = null;
      rightOrbitRef.current = null;
      headSwayRef.current = null;
      setActiveLeftAlbum(null);
      setActiveRightAlbum(null);
    };
  }, [playingData?.isPlaying]);

  return (
    <div className={`relative ${className ?? ''}`}>
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none w-full max-w-xs flex justify-center">
        {playingData?.isPlaying ? (
          <SpeechBubble
            key={playingData.title}
            messages={[
              `Listening "${playingData.title}" with Elvis! Touch my iPod's screen to join us!`,
            ]}
            arrowPosition="left"
          />
        ) : (
          <SpeechBubble
            key="idle"
            messages={[
              'Waiting for Elvis to listen to music together. Hope he comes back soon!',
            ]}
            arrowPosition="left"
          />
        )}
      </div>
      <ConchoMusic
        className="w-full h-full"
        notesRRef={notesRRef}
        notesLRef={notesLRef}
        audifonoLRef={audifonoLRef}
        audifonoRRef={audifonoRRef}
        pantallaRef={pantallaRef}
        parpadosRef={parpadosRef}
        headRef={headRef}
      />
      <div
        ref={leftAlbumContainerRef}
        className="absolute w-16 h-16 z-10 pointer-events-none"
      >
        {activeLeftAlbum}
      </div>
      <div
        ref={rightAlbumContainerRef}
        className="absolute w-16 h-16 z-10 pointer-events-none"
      >
        {activeRightAlbum}
      </div>
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
            <a
              href={playingData.songUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IpodPlayingMusic playingData={playingData} />
            </a>
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
        <p className="text-[3px] xl:text-[6px]">IPOD</p>
        <IoBatteryFull className="text-[6px] xl:text-[8px]" />
      </div>
      <div className="text-[10px] flex flex-col gap-1">
        <Image
          src={playingData.albumImageUrl}
          width={18}
          height={18}
          alt="spotify album cover"
        />
      </div>
      <div>
        <div className="flex flex-col w-full min-w-0">
          <span className="text-[3px] xl:text-[4px] font-medium block truncate">
            {playingData.title}
          </span>
          <span className="text-[3px] xl:text-[4px] text-zinc-400 block truncate">
            {playingData.artist}
          </span>
        </div>
        <div className="flex gap-2 text-black text-sm">
          <span className="hidden xl:flex w-2 h-2 rounded-full text-white items-center justify-center ">
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
          <span className="hidden xl:flex w-2 h-2 rounded-full text-white items-center justify-center ">
            <FaRepeat size={6} />
          </span>
        </div>
      </div>
    </div>
  );
};

const YHLQMDLGN = () => (
  <div
    className="w-8 h-8 lg:w-12 lg:h-12  bg-cover bg-center rounded-md"
    style={{ backgroundImage: "url('/images/album_pictures/YHLQMDLGN.webp')" }}
  />
);

const nadie_sabe_loque_vapasar = () => (
  <div
    className="w-8 h-8 lg:w-12 lg:h-12 bg-cover bg-center rounded-md"
    style={{
      backgroundImage:
        "url('/images/album_pictures/nadie-sabe_loque_vapasar.webp')",
    }}
  />
);

const ultimo_tour = () => (
  <div
    className="w-8 h-8 lg:w-12 lg:h-12 bg-cover bg-center rounded-md"
    style={{
      backgroundImage: "url('/images/album_pictures/ultimo_tour.webp')",
    }}
  />
);

const un_verano_sin_ti = () => (
  <div
    className="w-8 h-8 lg:w-12 lg:h-12 bg-cover bg-center rounded-md"
    style={{
      backgroundImage: "url('/images/album_pictures/un_verano_sin_ti.webp')",
    }}
  />
);

const x100pre = () => (
  <div
    className="w-8 h-8 lg:w-12 lg:h-12 bg-cover bg-center rounded-md"
    style={{ backgroundImage: "url('/images/album_pictures/x100pre.webp')" }}
  />
);
