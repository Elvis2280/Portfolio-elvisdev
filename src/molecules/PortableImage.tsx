import { SanityImage } from '@/atoms/SanityImage';

interface PortableImageProps {
  value: {
    alt?: string;
    caption?: string;
    asset: {
      _ref: string;
      metadata?: {
        dimensions?: { width: number; height: number };
        lqip?: string;
      };
    };
    hotspot?: Record<string, number>;
    crop?: Record<string, number>;
  };
}

export function PortableImage({ value }: PortableImageProps) {
  return (
    <figure className="my-8">
      <SanityImage image={value} className="rounded-lg" />
      {value.caption && (
        <figcaption className="text-caption text-muted-foreground mt-2 text-center italic">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}
