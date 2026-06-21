import HeroSection from '@/organisms/HeroSection';
import AboutMeSection from '@/organisms/AboutMeSection';
import ContactSection from '@/organisms/ContactSection';
import ExperienceSection from '@/organisms/ExperienceSection';
import ProjectsSection from '@/organisms/ProjectsSection';

export default function Home() {
  return (
    <main className="h-full">
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <AboutMeSection />
      <ContactSection />
    </main>
  );
}
