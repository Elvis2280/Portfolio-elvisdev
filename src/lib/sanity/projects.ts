// get individual project by slug

import { SanityPreviewProjectsType } from '@/types/sanity';
import { sanityClient } from './client';

// get all the projects
export const getAllProjects = async () => {
  try {
    const projects: SanityPreviewProjectsType = await sanityClient.fetch(
      `*[_type == "project"] {
      _id,
      title,
      subtitle,
      slug,
      techStack,
      "previewImageUrl": previewImage.asset->url,
      "previewImageAlt": previewImage.alt
      }`,
    );

    return projects;
  } catch (error) {
    console.error(error);
  }
};

// Get latest projects, amount by param
export const getAmountOfProjectByOrder = async (
  amount: number,
  order: 'asc' | 'desc',
) => {
  try {
    const projects: SanityPreviewProjectsType = await sanityClient.fetch(
      `*[_type == "project"] | order(_createdAt ${order}) [0...${amount}] {
        _id,
        title,
        subtitle,
        slug,
        techStack,
        "previewImageUrl": previewImage.asset->url,
        "previewImageAlt": previewImage.alt
      }`,
      { order, amount },
    );

    return projects;
  } catch (error) {
    console.error(error);
  }
};
