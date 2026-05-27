export interface Experience {
  id: string;
  title: string;
  subtitle: string;
  text: string;
}

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    subtitle: 'TechCorp · 2023 - Present',
    text: 'Led the migration of a legacy dashboard to Next.js 14 with Server Components, reducing page load time by 40%. Architected a shared component library used across 4 teams and mentored 3 junior developers.',
  },
  {
    id: '2',
    title: 'Full-Stack Developer',
    subtitle: 'StartupXYZ · 2021 - 2023',
    text: 'Built and shipped a real-time collaborative editor from scratch using React and WebSockets. Designed the database schema, implemented CI/CD pipelines, and owned the product from MVP to 10k users.',
  },
  {
    id: '3',
    title: 'Junior Developer',
    subtitle: 'AgencyLab · 2019 - 2021',
    text: 'Developed responsive landing pages and e-commerce storefronts for 15+ clients. Picked up TypeScript and testing practices, reducing regression bugs by 30% across ongoing projects.',
  },
];
