'use client';
import OvniProjectAnimated, {
  type OvniProjectAnimatedHandle,
} from '@/molecules/OvniProjectAnimated';
import ProjectPlanet from '@/atoms/ProjectPlanet';
import SistemaAnimated from '@/molecules/SistemaAnimated';
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/atoms/ui/pagination';
import { useRef, useState } from 'react';

export default function ProjectsSection() {
  const ovniAnimatedRef = useRef<OvniProjectAnimatedHandle>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const buildPagesLinks = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            href="#"
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }
    return pages;
  };
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Content */}
      <div className="relative z-10 px-4 pt-4 max-w-4xl">
        <p className="text-caption text-muted-foreground/70">
          ~/Portfolio/Projects
        </p>

        <h2 id="project-section" className="mt-6">
          <span className="block drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">
            <span className="text-section bg-gradient-to-r from-white to-neon bg-clip-text text-transparent">
              Featured Projects
            </span>
          </span>
        </h2>

        <p className="mt-8 text-body text-muted-foreground/80 leading-relaxed max-w-2xl">
          I believe the best applications are built with a{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            solid foundation{' '}
          </span>
          , an intuitive interface, and just enough{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            music
          </span>
          . This section features some of my builds, showcasing everything from
          custom{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            API architectures{' '}
          </span>
          to interactive user{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            interfaces
          </span>
          .
        </p>
      </div>
      <div className="flex w-full flex-col items-center">
        <div className="h-24 w-full"></div>
        <div className="relative max-w-5xl overflow-visible">
          <SistemaAnimated className="h-[500px] w-full overflow-visible" />

          {/* ProjectPlanet at center of Sistema */}
          <div className="pointer-events-none absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px]">
            {/* Shadow circle - no mask, full glow */}
            <div className="absolute inset-0 rounded-full animate-planet-glow" />
            {/* ProjectPlanet with mask */}
            <div className="relative w-full h-full">
              <ProjectPlanet
                className="w-full h-full cursor-pointer"
                onMouseEnter={() =>
                  ovniAnimatedRef.current?.playHoverAnimation()
                }
              />
            </div>
          </div>

          {/* OvniProject above the planet */}
          <div className="pointer-events-none absolute left-[50%] top-[0%] z-10 h-[200px] w-[250px] -translate-x-1/2 -translate-y-1/2">
            <OvniProjectAnimated
              ref={ovniAnimatedRef}
              className="h-full w-full"
            />
          </div>
        </div>
        <div>
          <Pagination>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                href="#"
              />
            </PaginationItem>
            {buildPagesLinks()}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                href="#"
              />
            </PaginationItem>
          </Pagination>
        </div>
      </div>
    </section>
  );
}
