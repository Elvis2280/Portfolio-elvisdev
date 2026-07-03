import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';

interface ImageSource {
  alt?: string | null;
  caption?: string | null;
  crop?: Record<string, number> | null;
  hotspot?: Record<string, number> | null;
  asset: {
    _ref: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
      };
      lqip?: string;
    };
  };
}

interface SanityImageProps {
  image: ImageSource;
  className?: string;
  priority?: boolean;
}

export function SanityImage({
  image,
  className = '',
  priority = false,
}: SanityImageProps) {
  const src = urlFor(image as unknown as Record<string, unknown>)
    .width(1200)
    .fit('max')
    .auto('format')
    .url();
  const dimensions = image.asset.metadata?.dimensions;
  const lqip = image.asset.metadata?.lqip;

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        aspectRatio: dimensions ? dimensions.width / dimensions.height : 16 / 9,
      }}
    >
      <Image
        src={src}
        alt={image.alt ?? ''}
        fill
        className="object-cover"
        sizes="(min-width: 768px) 768px, 100vw"
        priority={priority}
        placeholder={lqip ? 'blur' : 'empty'}
        blurDataURL={lqip ?? undefined}
      />
    </div>
  );
}
