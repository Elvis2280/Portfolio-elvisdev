interface ProjectPlanetProps {
  className?: string;
  onMouseEnter?: () => void;
}

export default function ProjectPlanet({
  className,
  onMouseEnter,
}: ProjectPlanetProps) {
  return (
    <div
      className={`animate-planet-fade-bottom rounded-full bg-gray-800 pointer-events-auto ${className ?? ''}`}
      onMouseEnter={onMouseEnter}
    />
  );
}
