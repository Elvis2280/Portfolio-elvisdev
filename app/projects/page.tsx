import { getAllProjects } from '@/lib/sanity/projects';
import ProjectCard from '@/molecules/ProjectCard';

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-16">
      <header className="mb-12">
        <h1 className="text-section bg-gradient-to-r from-white to-neon bg-clip-text text-transparent">
          All Projects
        </h1>
        <p className="text-body text-muted-foreground/80 mt-4 max-w-2xl">
          A complete collection of my builds, blending robust architecture with
          intuitive interface design.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {projects?.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </main>
  );
}
