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

import Image from 'next/image';
import SpeechBubble from '@/molecules/SpeechBubble';

interface ConchoMusicAnimatedProps {
  className?: string;
  playingData?: spotifyCurrentPlayingData | null;
}

const SVG_WIDTH = 663;
const SVG_HEIGHT = 715;

const albumUrls = [
  '/images/album_pictures/YHLQMDLGN.webp',
  '/images/album_pictures/nadie-sabe_loque_vapasar.webp',
  '/images/album_pictures/ultimo_tour.webp',
  '/images/album_pictures/un_verano_sin_ti.webp',
  '/images/album_pictures/x100pre.webp',
];

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
  const leftAlbumContainerRef = useRef<SVGGElement>(null);
  const rightAlbumContainerRef = useRef<SVGGElement>(null);
  const leftOrbitRef = useRef<gsap.core.Animation | null>(null);
  const rightOrbitRef = useRef<gsap.core.Animation | null>(null);
  const headSwayRef = useRef<gsap.core.Tween | null>(null);
  const [pantallaBBox, setPantallaBBox] = useState<DOMRect | null>(null);
  const [activeLeftAlbumUrl, setActiveLeftAlbumUrl] = useState<string | null>(
    null,
  );
  const [activeRightAlbumUrl, setActiveRightAlbumUrl] = useState<string | null>(
    null,
  );

  // The iPod screen is HTML layered over an SVG. Measure the SVG screen after
  // mount so the overlay can use the artwork's actual responsive coordinates.
  useEffect(() => {
    if (pantallaRef.current) {
      setPantallaBBox(pantallaRef.current.getBBox());
    }
  }, []);

  // Playing state owns the blinking eyes and music-note animation. When playback
  // stops, reset those SVG elements explicitly so the idle illustration is clean.
  useEffect(() => {
    if (!playingData?.title) {
      const paths = parpadosRef.current?.querySelectorAll('path');
      if (paths) {
        gsap.set(paths, {
          scaleY: 1,
          opacity: 1,
          transformOrigin: 'top center',
        });
      }
      if (notesLRef.current) {
        gsap.set(notesLRef.current, { opacity: 0, scale: 0 });
      }
      if (notesRRef.current) {
        gsap.set(notesRRef.current, { opacity: 0, scale: 0 });
      }
      return;
    }

    const blinkAnim = createBlinkAnimation(parpadosRef.current);
    const notesAnim = createNotesAnimation(
      notesLRef.current,
      notesRRef.current,
    );

    return () => {
      blinkAnim?.kill();
      notesAnim?.revert();
      const paths = parpadosRef.current?.querySelectorAll('path');
      if (paths) {
        gsap.set(paths, {
          scaleY: 1,
          opacity: 1,
          transformOrigin: 'top center',
        });
      }
      if (notesLRef.current) {
        gsap.set(notesLRef.current, { opacity: 0, scale: 0 });
      }
      if (notesRRef.current) {
        gsap.set(notesRRef.current, { opacity: 0, scale: 0 });
      }
    };
  }, [playingData?.isPlaying]);

  // Orbit animations update album art through callbacks. Clear the previous art
  // before scheduling new loops, then cancel every loop and pending visual state
  // during cleanup when the track changes or the component unmounts.
  useEffect(() => {
    if (!playingData?.title) {
      leftOrbitRef.current?.kill();
      rightOrbitRef.current?.kill();
      headSwayRef.current?.kill();
      gsap.set(headRef.current, { rotation: 0 });
      leftOrbitRef.current = null;
      rightOrbitRef.current = null;
      headSwayRef.current = null;
      return;
    }

    const pick = () => albumUrls[Math.floor(Math.random() * albumUrls.length)];

    // Clear the old album elements after the current effect completes so React
    // can render the next track's empty orbit before new animation callbacks run.
    queueMicrotask(() => {
      setActiveLeftAlbumUrl(null);
      setActiveRightAlbumUrl(null);
    });

    headSwayRef.current = createHeadSway(headRef.current);

    // Wait one frame for the SVG refs and cleared orbit content to be committed
    // before querying them to construct the new orbit animations.
    requestAnimationFrame(() => {
      leftOrbitRef.current = createAlbumOrbit(
        leftAlbumContainerRef.current,
        '#STROKE_4ecd9116-ec81-4159-8967-4aa59d9251cc',
        () => {
          setActiveLeftAlbumUrl(pick());
        },
      );

      rightOrbitRef.current = createAlbumOrbit(
        rightAlbumContainerRef.current,
        '#audifonoR > path:first-of-type',
        () => {
          setActiveRightAlbumUrl(pick());
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
      setActiveLeftAlbumUrl(null);
      setActiveRightAlbumUrl(null);
    };
  }, [playingData?.isPlaying]);

  // A new key restarts the typewriter bubble whenever the song or playback state
  // changes, while the idle key preserves one stable bubble for the idle state.
  const handlerReturnSpeechBubble = (
    isPlaying: boolean,
    title: string | null,
  ) => {
    if (isPlaying && title) {
      return (
        <SpeechBubble
          key={title}
          messages={[
            `Listening "${title}" with Elvis! Touch my iPod's screen to join us!`,
          ]}
          arrowPosition="left"
        />
      );
    } else if (!isPlaying && title) {
      return (
        <SpeechBubble
          key={title}
          messages={[
            `Elvis is resting but "${title}" was the last song he listened to. Touch my iPod\'s screen to join us!`,
          ]}
          arrowPosition="left"
        />
      );
    } else {
      return (
        <SpeechBubble
          key="idle"
          messages={[
            'Waiting for Elvis to listen to music together. Hope he comes back soon!',
          ]}
          arrowPosition="left"
        />
      );
    }
  };

  return (
    <div className={`relative ${className ?? ''}`}>
      <div className="absolute top-1 xl:top-0 2xl:top-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none w-full max-w-xs flex justify-center">
        {handlerReturnSpeechBubble(
          playingData?.isPlaying ?? false,
          playingData?.title ?? null,
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
      >
        <g ref={leftAlbumContainerRef}>
          {activeLeftAlbumUrl && (
            <image
              href={activeLeftAlbumUrl}
              width="48"
              height="48"
              x="-24"
              y="-24"
            />
          )}
        </g>
        <g ref={rightAlbumContainerRef}>
          {activeRightAlbumUrl && (
            <image
              href={activeRightAlbumUrl}
              width="48"
              height="48"
              x="-24"
              y="-24"
            />
          )}
        </g>
      </ConchoMusic>
      {pantallaBBox && (
        <div
          className="absolute border-2 border-background bg-background bg-center translate-y-4 xl:translate-y-2 xl:-translate-x-0.5"
          style={{
            left: `${(pantallaBBox.x / SVG_WIDTH) * 100}%`,
            top: `${(pantallaBBox.y / SVG_HEIGHT) * 100}%`,
            width: `${(pantallaBBox.width / SVG_WIDTH) * 104}%`,
            height: `${(pantallaBBox.height / SVG_HEIGHT) * 104}%`,
            backgroundImage: `url('/images/album_pictures/x100pre.webp'})`,
          }}
        >
          {playingData?.isPlaying || playingData?.title ? (
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
          Elvis is not listening music
        </p>
      </div>
      <div className="flex gap-2 text-black text-sm mt-0.5">
        <span className="w-4 h-4 rounded-full text-white flex items-center justify-center ">
          <TbPlayerSkipBackFilled size={8} />
        </span>
        <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center ">
          <TbPlayerPlayFilled size={8} />
        </span>
        <span className="w-4 h-4 rounded-full text-white  flex items-center justify-center">
          <TbPlayerSkipForwardFilled size={8} />
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
      {/*<div className=" flex justify-between items-center w-full">
        <span> </span>
        <p className="text-[3px] xl:text-[6px]">IPOD</p>
        <IoBatteryFull className="text-[6px] xl:text-[8px]" />
      </div>*/}
      <div className="text-[10px] flex flex-col gap-1">
        <Image
          src={playingData.albumImageUrl}
          width={32}
          height={32}
          alt="spotify album cover"
        />
      </div>
      <div>
        <div className="flex flex-col w-full min-w-0 items-center">
          <span className="text-[3px] xl:text-[4px] font-medium block truncate">
            {playingData.title}
          </span>
          <span className="text-[3px] xl:text-[4px] text-zinc-400 block truncate">
            {playingData.artist}
          </span>
        </div>
        <div className="flex gap-2 text-black text-sm justify-center">
          <span className="w-2 h-2 rounded-full text-white flex items-center justify-center ">
            <TbPlayerSkipBackFilled size={5} />
          </span>
          <span className="w-2 h-2 rounded-full bg-white flex items-center justify-center ">
            <TbPlayerPauseFilled size={5} />
          </span>
          <span className="w-2 h-2 rounded-full text-white  flex items-center justify-center">
            <TbPlayerSkipForwardFilled size={5} />
          </span>
        </div>
      </div>
    </div>
  );
};
