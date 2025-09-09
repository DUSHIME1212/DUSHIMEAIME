import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const WorkExperience = defineType({
  name: "Experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    // image
    defineField({
      name: "companyLogo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    // dates
    defineField({
      name: "startDate",
      type: "date",
    }),
    defineField({
      name: "endDate",
      type: "date",
    }),
    defineField({
      name: "isCurrentlyWorkingHere",
      type: "boolean",
      description: "Check if you are currently working here",
      initialValue: false,
    }),
  ],
});
