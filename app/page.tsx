import HeroSection from '@/organisms/HeroSection';
import ExperienceSection from '@/organisms/ExperienceSection';
import ProjectsSection from '@/organisms/ProjectsSection';

export default function Home() {
  return (
    <main className="h-full">
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
    </main>
  );
}
