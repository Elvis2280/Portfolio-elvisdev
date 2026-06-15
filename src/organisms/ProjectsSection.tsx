export default function ProjectsSection() {
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
            solid foundation
          </span>
          , an intuitive interface, and just enough{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            music
          </span>
          . This section features some of my builds, showcasing everything from
          custom{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            API architectures
          </span>{' '}
          to interactive user{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            interfaces
          </span>
          .
        </p>
      </div>
    </section>
  );
}
