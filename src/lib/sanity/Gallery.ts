import { client } from "~/sanity/lib/client";
import { groq } from "next-sanity";

export interface GalleryImage {
  _key?: string;
  asset: {
    _ref: string;
    _type: "reference";
  };
  url?: string;
  alt?: string;
  dimensions?: {
    width: number;
    height: number;
    aspectRatio: number;
  };
}

export interface GalleryProject {
  _id: string;
  _type: "Gallery";
  projectGallery: {
    title: string;
    slug: string;
    tags?: string[];
    shortDescription: string;
    mainImage?: {
      url: string;
      alt?: string;
      dimensions?: {
        width: number;
        height: number;
        aspectRatio: number;
      };
    };
    image?: GalleryImage[];
  };
}

export interface GalleriesResponse {
  galleries: GalleryProject[];
}

export interface GalleryBySlugResponse {
  gallery: GalleryProject | null;
}

// Fetch all galleries
export async function getAllGalleries(): Promise<GalleryProject[]> {
  const query = groq`*[_type == "Gallery"] | order(projectGallery.title asc) {
    _id,
    _type,
    "projectGallery": {
      title,
      "slug": projectGallery.slug.current,
      tags,
      shortDescription,
      "mainImage": {
        "url": projectGallery.mainImage.asset->url,
        "alt": projectGallery.mainImage.alt,
        "dimensions": projectGallery.mainImage.asset->metadata.dimensions
      },
      "image": projectGallery.image[] {
        _key,
        "url": asset->url,
        "alt": alt,
        "dimensions": asset->metadata.dimensions
      }
    }
  }`;

  return client.fetch(query);
}

// Fetch gallery by slug
export async function getGalleryBySlug(slug: string): Promise<GalleryProject | null> {
  const query = groq`*[_type == "Gallery" && projectGallery.slug.current == $slug][0] {
    _id,
    _type,
    "projectGallery": {
      title,
      "slug": projectGallery.slug.current,
      tags,
      shortDescription,
      "mainImage": {
        "url": projectGallery.mainImage.asset->url,
        "alt": projectGallery.mainImage.alt,
        "dimensions": projectGallery.mainImage.asset->metadata.dimensions
      },
      "image": projectGallery.image[] {
        _key,
        "url": asset->url,
        "alt": alt,
        "dimensions": asset->metadata.dimensions
      }
    }
  }`;

  return client.fetch(query, { slug });
}

// Fetch gallery slugs for static generation
export async function getAllGallerySlugs(): Promise<{ slug: string }[]> {
  const query = groq`*[_type == "Gallery"] {
    "slug": projectGallery.slug.current
  }`;

  return client.fetch(query);
}

