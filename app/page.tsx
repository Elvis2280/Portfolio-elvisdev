import HeroSection from '@/organisms/HeroSection';
import AboutMeSection from '@/organisms/AboutMeSection';
import ContactSection from '@/organisms/ContactSection';
import ExperienceSection from '@/organisms/ExperienceSection';
import ProjectsSection from '@/organisms/ProjectsSection';
import { getAmountOfProjectByOrder } from '@/lib/sanity/projects';

export default async function Home() {
  const latestProjects = await getAmountOfProjectByOrder(3, 'desc');

  return (
    <main className="h-full">
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection listOfProjects={latestProjects || []} />
      <AboutMeSection />
      <ContactSection />
    </main>
  );
}
