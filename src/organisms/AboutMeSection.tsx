export default function AboutMeSection() {
  return (
    <section className="relative overflow-hidden bg-background pb-8">
      {/* Content */}
      <div className="relative z-10 px-4 pt-32 max-w-4xl">
        <p className="text-caption text-muted-foreground/70">
          ~/Portfolio/About
        </p>

        <h2 className="mt-6">
          <span className="text-section text-white">Getting to </span>
          <span className="drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">
            <span className="text-section bg-gradient-to-r from-white to-neon bg-clip-text text-transparent">
              Know Me
            </span>
          </span>
        </h2>

        <p className="mt-8 text-body text-muted-foreground/80 leading-relaxed max-w-4xl">
          Concho handled the intro, so let&apos;s look under the hood. I am a{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            full-stack developer
          </span>{' '}
          with years of experience building diverse, international projects
          across different{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            cultures
          </span>
          . Throughout my journey, my{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            Latino
          </span>{' '}
          culture has been my greatest asset&mdash;it gave me a relentless{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            mindset
          </span>{' '}
          where giving up simply isn&apos;t an option. The harder the{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            problem
          </span>
          , the more driven I am to solve it.
        </p>

        <p className="mt-6 text-body text-muted-foreground/80 leading-relaxed max-w-2xl">
          This grit reflects in how I engineer. I specialize in taking{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            projects
          </span>{' '}
          from absolute zero to final{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            deployment
          </span>
          . While my core{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            strengths
          </span>{' '}
          lie in UI/UX design and full-stack development, my knowledge
          doesn&apos;t stop there. I confidently handle architectural decisions
          and DevOps tasks, adapting my skill set to exactly what the project
          needs to{' '}
          <span className="text-neon [text-shadow:_0_0_8px_rgba(34,211,238,0.5)]">
            succeed
          </span>
          .
        </p>
      </div>
    </section>
  );
}
