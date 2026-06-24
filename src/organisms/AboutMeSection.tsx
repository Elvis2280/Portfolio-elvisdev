'use client';
import ConchoMusicAnimated from '@/molecules/ConchoMusicAnimated';
import { spotifyCurrentPlayingData } from '@/types/spotify';
import { useEffect, useState } from 'react';

export default function AboutMeSection() {
  const [playingSpotifyData, setPlayingSpotifyData] =
    useState<null | spotifyCurrentPlayingData>();

  useEffect(() => {
    const fetchSpotifyNowListening = () => {
      fetch('/api/nowPlaying')
        .then((res) => res.json())
        .then((res_json: spotifyCurrentPlayingData) =>
          setPlayingSpotifyData(res_json),
        );
    };
    fetchSpotifyNowListening();
  }, []);
  return (
    <section className="relative overflow-hidden bg-background pb-8 2xl:flex 2xl:gap-6 ">
      {/* Content */}
      <div className=" 2xl:min-w-3xl">
        <div className="relative z-10 px-4 pt-12 max-w-4xl">
          <p className="text-caption text-muted-foreground/70 md:text-lg">
            ~/Portfolio/About
          </p>

          <h2 className="mt-6">
            <span className="block drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">
              <span className="font-bold text-section md:text-5xl xl:text-5xl 2xl:text-7xl bg-gradient-to-r from-white to-neon bg-clip-text text-transparent">
                Getting to Know Me
              </span>
            </span>
          </h2>
        </div>

        <div className="relative z-10 px-4 flex items-start gap-8 mt-4 xl:mt-8 flex-col">
          <div className="flex-1 max-w-2xl xl:max-w-4xl">
            <p className="text-body text-muted-foreground/80 leading-relaxed md:text-lg xl:text-lg">
              Concho handled the intro, so let&apos;s look under the hood. I am
              a{' '}
              <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
                full-stack developer
              </span>{' '}
              building international projects across different{' '}
              <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
                cultures
              </span>
              . Rooted in my{' '}
              <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
                Latino
              </span>{' '}
              heritage, I bring a relentless{' '}
              <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
                mindset
              </span>{' '}
              to engineering: the tougher the{' '}
              <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
                problem
              </span>
              , the more driven I am to solve it.
            </p>

            <p className="mt-4 text-body text-muted-foreground/80 leading-relaxed md:text-lg xl:text-xl">
              I specialize in taking{' '}
              <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
                projects
              </span>{' '}
              from absolute zero to final{' '}
              <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
                deployment
              </span>
              . Beyond my core{' '}
              <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
                strengths
              </span>{' '}
              in UI/UX and full-stack development, I confidently manage
              architecture and DevOps, adapting my skills to ensure the project{' '}
              <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
                succeeds
              </span>
              .
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <ConchoMusicAnimated
          className="w-[350px] md:w-[500px] 2xl:w-[700px] 3xl:w-[900px] pt-16 xl:pt-8"
          playingData={playingSpotifyData}
        />
      </div>
    </section>
  );
}
