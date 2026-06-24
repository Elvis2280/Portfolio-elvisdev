import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/atoms/ui/card';
import { Badge } from '@/atoms/ui/badge';
import { Button } from '@/atoms/ui/button';
import type { previewSanityProject } from '@/types/sanity';

interface ProjectCardProps {
  project: previewSanityProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, subtitle, slug, techStack, previewImageUrl, previewImageAlt } =
    project;

  return (
    <Card className="h-[400px] p-0 gap-0 flex flex-col group">
      <div className="relative flex-[7] overflow-hidden">
        {previewImageUrl ? (
          <Image
            src={previewImageUrl}
            alt={previewImageAlt || title}
            fill
            className="object-cover group-hover:scale-110 ease-in-out duration-200"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-800" />
        )}
        {techStack && techStack.length > 0 && (
          <div
            className="flex flex-col gap-2 absolute left-0 top-0 bottom-0 p-2 overflow-hidden"
            style={{
              maskImage:
                'linear-gradient(to bottom, black 50%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, black 50%, transparent 100%)',
            }}
          >
            {techStack.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="flex-[3] p-4 flex flex-col gap-2 min-h-0">
        <div className="flex gap-2 flex-1 min-h-0">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-sm font-medium truncate">
              {title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        <Button className="w-full" asChild>
          <Link href={`/projects/${slug.current}`}>View project</Link>
        </Button>
      </div>
    </Card>
  );
}
