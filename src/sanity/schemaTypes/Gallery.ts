import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const galleryimages = defineType({
  name: "Gallery",
  title: "Gallery ",
  type: "document",
  fields: [
    defineField({
      name: "projectGallery",
      type: "document",
      fields: [
        //title
        defineField({
          name: "title",
          type: "string",
          title: "Title",
          validation: (Rule) => Rule.required(),
        }),
        // slug
        defineField({
          name: "slug",
          type: "slug",
          title: "Slug",
          options: {
            source: "title",
            maxLength: 96,
          },
          validation: (Rule) => Rule.required(),
        }),
        //tags
        defineField({
          name: "tags",
          type: "array",
          title: "Tags",
          of: [{ type: "string" }],
          options: {
            layout: "tags",
          },
        }),
        //short description
        defineField({
          name: "shortDescription",
          type: "string",
          title: "Short Description",
          validation: (Rule) => Rule.required().max(200),
        }),
        // Main image
        defineField({
          name: "mainImage",
          type: "image",
          title: "Main Image",
          options: {
            hotspot: true,
          },
          validation: (Rule) => Rule.required(),
        }),
        //array image
        defineField({
          name: "image",
          type: "array",
          title: "Image",
          of: [{ type: "image" }],
        }),
      ],
    }),
  ],
});
