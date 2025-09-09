import { client } from "~/sanity/lib/client"
import { sanityFetch } from "~/sanity/lib/live"

const query = `*[_type == "Projects"]{
  _id,
  _type,
  title,
  "projectImage": {
    "url": ProjectImage.asset->url,
    "alt": ProjectImage.alt,
    "dimensions": ProjectImage.asset->metadata.dimensions
  },
  projectType,
  "slug": slug.current,
  description,
  startDate,
  endDate,
  link,
  advancedDescription,
  objective,
  "video": video.asset->{
    url,
    mimeType
  },
  technologies,
  detailedDescription
}`

const queryBySlug = `*[_type == "Projects" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  "projectImage": {
    "url": ProjectImage.asset->url,
    "alt": ProjectImage.alt,
    "dimensions": ProjectImage.asset->metadata.dimensions
  },
  projectType,
  "slug": slug.current,
  description,
  startDate,
  endDate,
  link,
  advancedDescription,
  objective,
  "video": video.asset->{
    url,
    mimeType
  },
  technologies,
  detailedDescription
}`

export interface Project {
  _id: string;
  _type: "Projects";
  title: string;
  projectImage?: {
    url: string;
    alt?: string;
    dimensions?: {
      width: number;
      height: number;
      aspectRatio: number;
    };
  };
  projectType: "web" | "mobile" | "desktop" | "ux" | "graphic" | "game";
  slug: string;
  description: string;
  startDate: string;
  endDate?: string;
  link?: string;
  advancedDescription?: {
    services?: string[];
    technologies?: string[];
    client?: string;
    role?: string;
  };
  objective?: {
    title: string;
    description: string;
  };
  video?: {
    url?: string;
    asset: {
      url: string;
      mimeType: string;
    };
  };
  technologies?: string[];
  detailedDescription?: any; 
}

export interface ProjectsResponse {
  projects: Project[];
}

export interface ProjectBySlugResponse {
  project: Project | null;
}

export async function fetchWorks() {
    const res = await client.fetch(query) as Project[]
    return res
}

export async function fetchWorkBySlug(slug: string) {
    const res = await client.fetch(queryBySlug, { slug }) as Project | null
    return res
}