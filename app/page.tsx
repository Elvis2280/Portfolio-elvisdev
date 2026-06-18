import HeroSection from '@/organisms/HeroSection';
import AboutMeSection from '@/organisms/AboutMeSection';
import ExperienceSection from '@/organisms/ExperienceSection';
import ProjectsSection from '@/organisms/ProjectsSection';

export default function Home() {
  return (
    <main className="h-full">
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <AboutMeSection />
    </main>
  );
}
