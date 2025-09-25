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
