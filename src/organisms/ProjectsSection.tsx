'use client';
import SistemaUnifiedAnimated from '@/molecules/SistemaUnifiedAnimated';
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/atoms/ui/pagination';
import { useState } from 'react';
import { SanityPreviewProjectsType } from '@/types/sanity';

interface ProjectsSectionProps {
  listOfProjects: SanityPreviewProjectsType;
}

export default function ProjectsSection({
  listOfProjects,
}: ProjectsSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = listOfProjects.length;
  const currentProject = listOfProjects[currentPage - 1];
  const middleTechIndex = Math.ceil(currentProject.techStack.length / 2);
  const leftTechStack = currentProject.techStack.slice(0, middleTechIndex);
  const rightTechStack = currentProject.techStack.slice(middleTechIndex);

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
    <section className="relative overflow-hidden bg-background 2xl:flex 2xl:gap-6">
      <div className="xl:min-w-xl max-w-2xl">
        <div className="relative z-10 px-4 pt-4">
          <p className="text-caption text-muted-foreground/70 md:text-lg">
            ~/Portfolio/Projects
          </p>

          <h2 id="project-section" className="mt-6">
            <span className="block drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">
              <span className="font-bold text-section bg-gradient-to-r from-white to-neon bg-clip-text text-transparent md:text-5xl xl:text-5xl 2xl:text-7xl">
                Featured Projects
              </span>
            </span>
          </h2>
        </div>

        <div className="px-4 mt-4 xl:mt-8 mx-auto">
          <div className="w-full mb-8 md:mb-4">
            <p className="text-body text-muted-foreground/80 leading-relaxed md:text-lg xl:text-lg">
              I believe the best applications are built with a{' '}
              <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
                solid foundation{' '}
              </span>
              , an intuitive interface, and just enough{' '}
              <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
                music
              </span>
              . This section features some of my builds, showcasing everything
              from custom{' '}
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
        </div>
      </div>

      <div className="grow grid grid-rows-[1fr_auto_100px] pb-8">
        <div className="relative overflow-visible flex justify-center items-center">
          <SistemaUnifiedAnimated
            className="w-full aspect-[968/824] xl:max-w-3xl 2xl:max-w-4xl overflow-visible"
            projectTitle={currentProject?.title}
            leftTechStack={leftTechStack}
            rightTechStack={rightTechStack}
            slug={currentProject?.slug?.current}
            previewImageUrl={currentProject?.previewImageUrl}
            previewImageAlt={currentProject?.previewImageAlt}
          />
        </div>

        <h3 className="text-center text-step-title text-foreground mt-4 px-4 relative z-10">
          {currentProject?.title || 'Select a project'}
        </h3>

        <div className="flex items-center justify-center mt-4">
          <Pagination className="flex items-center gap-2">
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
