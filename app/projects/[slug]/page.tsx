import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PortableText } from 'next-sanity';
import { getProject, getAllProjects } from '@/lib/sanity/projects';
import { PortableImage } from '@/molecules/PortableImage';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return (
    projects?.map((project) => ({
      slug: project.slug.current,
    })) || []
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.title} | Elvis Miranda`,
    description: project.subtitle,
  };
}

const portableComponents = {
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-section text-foreground mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-subtitle text-foreground mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-step-title text-foreground mt-5 mb-2">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-body text-muted-foreground mb-4 leading-relaxed">
        {children}
      </p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-neon pl-4 italic text-muted-foreground my-6">
        {children}
      </blockquote>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="rounded bg-secondary px-1.5 py-0.5 text-sm text-neon">
        {children}
      </code>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href?: string };
    }) => (
      <a
        href={value?.href}
        className="text-neon underline underline-offset-2 hover:text-neon-300 transition-colors"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={
          value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined
        }
      >
        {children}
      </a>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold">{children}</strong>
    ),
  },
  types: {
    image: PortableImage,
  },
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <section className="relative h-[30vh] xl:h-[60vh]">
        {project.heroImageUrl && (
          <Image
            src={project.heroImageUrl}
            alt={project.heroImageAlt || project.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
      </section>

      <section className="p-4 md:p-8 lg:p-16 max-w-7xl mx-auto">
        <h1 className="font-bold text-section md:text-5xl xl:text-5xl 2xl:text-7xl mb-4 xl:mb-8">
          {project.title}
        </h1>
        {project.subtitle && (
          <p className="text-body leading-relaxed md:text-lg xl:text-lg text-muted-foreground/80 mt-2">
            {project.subtitle}
          </p>
        )}
        <div className="w-full h-px bg-border my-2 " />

        {project.status === 'unfinished' ? (
          <>
            {project.content && (
              <div className="animate-content-fade-bottom pb-32">
                <PortableText
                  value={project.content}
                  components={portableComponents}
                />
              </div>
            )}
            <p className="text-white/90 font-bold text-step-title text-center my-12 animate-header-blink">
              Article unfinished, comeback later!
            </p>
          </>
        ) : (
          project.content && (
            <PortableText
              value={project.content}
              components={portableComponents}
            />
          )
        )}
      </section>
    </main>
  );
}
