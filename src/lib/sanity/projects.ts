import { SanityPreviewProjectsType, SanityProject } from '@/types/sanity';
import { sanityClient } from './client';

// get individual project by slug
export const getProject = async (slug: string) => {
  try {
    const project: SanityProject = await sanityClient.fetch(
      `*[_type == "project" && slug.current == $slug][0] {
        _id,
        title,
        subtitle,
        slug,
        status,
        techStack,
        projectLink,
        "previewImageUrl": previewImage.asset->url,
        "previewImageAlt": previewImage.alt,
        "heroImageUrl": heroImage.asset->url,
        "heroImageAlt": heroImage.alt,
        content
      }`,
      { slug },
    );
    return project;
  } catch (error) {
    console.error(error);
  }
};

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
