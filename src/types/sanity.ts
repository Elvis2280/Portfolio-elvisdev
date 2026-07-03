import { PortableTextBlock } from 'next-sanity';

export interface SanitySlug {
  _type: 'slug';
  current: string;
}

export interface SanityHotspot {
  x: number;
  y: number;
  height: number;
  width: number;
}

export interface SanityCrop {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  hotspot?: SanityHotspot;
  crop?: SanityCrop;
}

export interface PortableTextImage {
  _type: 'image';
  alt?: string;
  caption?: string;
  hotspot?: SanityHotspot;
  crop?: SanityCrop;
  asset: {
    _ref: string;
    url: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
      };
      lqip?: string;
    };
  };
}

export interface SanityProject {
  _id: string;
  title: string;
  subtitle?: string;
  slug: SanitySlug;
  status: 'unfinished' | 'finished';
  techStack?: string[];
  projectLink?: string;
  previewImage?: SanityImage;
  previewImageUrl?: string;
  previewImageAlt: string;
  heroImage?: SanityImage;
  heroImageUrl?: string;
  heroImageAlt: string;
  content?: (PortableTextBlock | PortableTextImage)[];
}

export interface previewSanityProject {
  _id: string;
  title: string;
  subtitle: string;
  slug: SanitySlug;
  techStack: string[];
  previewImageUrl: string;
  previewImageAlt: string;
}

export type SanityProjects = SanityProject[];
export type SanityPreviewProjectsType = previewSanityProject[];
