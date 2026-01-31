import { client } from "~/sanity/lib/client";
import { groq } from "next-sanity";
import { defineField, defineType } from "sanity";

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
    gallery?: GalleryImage[]; // Changed from "image" to "gallery"
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
  const query = groq`*[_type == "Gallery"] {
    _id,
    _type,
    "projectGallery": {
      "title": projectGallery.title,
      "slug": projectGallery.slug.current,
      "shortDescription": projectGallery.shortDescription,
      "tags": projectGallery.tags,
      "mainImage": {
        "url": projectGallery.mainImage.asset->url,
        "alt": projectGallery.mainImage.alt,
        "dimensions": projectGallery.mainImage.asset->metadata.dimensions
      },
      "gallery": projectGallery.gallery[] {
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
export async function getGalleryBySlug(
  slug: string,
): Promise<GalleryProject | null> {
  const query = groq`*[_type == "Gallery" && projectGallery.slug.current == $slug][0] {
    _id,
    _type,
    "projectGallery": {
      title,
      "title": projectGallery.title,
      "slug": projectGallery.slug.current,
      "shortDescription": projectGallery.shortDescription,
      "tags": projectGallery.tags,
      "mainImage": {
        "url": projectGallery.mainImage.asset->url,
        "alt": projectGallery.mainImage.alt,
        "dimensions": projectGallery.mainImage.asset->metadata.dimensions
      },
      "gallery": projectGallery.gallery[] {
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

// Optionally, you can add a function to get galleries by tag
export async function getGalleriesByTag(
  tag: string,
): Promise<GalleryProject[]> {
  const query = groq`*[_type == "Gallery" && $tag in projectGallery.tags] | order(projectGallery.title asc) {
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
      "gallery": projectGallery.gallery[] {
        _key,
        "url": asset->url,
        "alt": alt,
        "dimensions": asset->metadata.dimensions
      }
    }
  }`;

  return client.fetch<GalleryProject[]>(query, { tag } as Record<
    string,
    string
  >);
}

// Gallery Schema Type Definition
export const galleryimages = defineType({
  name: "Gallery",
  title: "Gallery",
  type: "document",
  fields: [
    defineField({
      name: "projectGallery",
      title: "Project Gallery",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "slug",
          title: "Slug",
          type: "slug",
          options: {
            source: "projectGallery.title", 
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "tags",
          title: "Tags",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "shortDescription",
          title: "Short Description",
          type: "text",
        }),
        defineField({
          name: "mainImage",
          title: "Main Image",
          type: "image",
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: "gallery",
          title: "Gallery Images",
          type: "array",
          of: [
            {
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                }),
              ],
            },
          ],
        }),
      ],
    }),
  ],
});
