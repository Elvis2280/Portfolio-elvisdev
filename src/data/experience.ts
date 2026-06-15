export interface Experience {
  id: string;
  title: string;
  subtitle: string;
  text: string;
}

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Software Engineer',
    subtitle: 'Enon · 2024 - Present',
    text: 'Architected AI Agent skills using OpenClaw and Ollama, leading an event-driven RAG backend that orchestrated file conversion, OCR, embedding, and data vectorization. Engineered secure, high-performance private server and NAS environments using Docker and Linux, utilizing a Python, Node.js, React, and Astro stack.',
  },
  {
    id: '2',
    title: 'Full-Stack Developer',
    subtitle: 'Biomy Inc · 2024 - 2026',
    text: 'Developed a Deep Learning frontend via React and Leaflet for automated cancer cell detection and research visualization. Optimized performance via memoization and Vite migration, cutting re-renders by 60% and reducing API overhead, while establishing a high-reliability Vitest suite in a Dockerized Python/Ruby environment.',
  },
  {
    id: '3',
    title: 'Software Engineer',
    subtitle: 'ControlRisk · 2023 - 2024',
    text: 'Developed high-risk safety audit systems using .NET and React, refactoring legacy components with SOLID principles and custom hooks to maximize global code reusability. Led Azure DevOps CI/CD automation, constructing rigorous unit tests and streamlining deployment pipelines for high-compliance projects utilizing Storybook and SQL Server.',
  },
];
