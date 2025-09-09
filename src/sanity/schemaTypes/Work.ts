import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const WorkProjects = defineType({
  name: "Projects",
  title: "Projects",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    // image
    defineField({
      name: "ProjectImage",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    // project type (eg. web, mobile, etc)
    defineField({
      name: "projectType",
        type: "string",
        options: {
          list: [
            { title: "Web", value: "web" },
            { title: "Mobile", value: "mobile" },
            { title: "Desktop", value: "desktop" },
            { title: "UX/UI Design", value: "ux" },
            { title: "Graphic Design", value: "graphic" },
            { title: "Game dev", value: "game" },
            ],
            layout: "radio",
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
    //url link
    defineField({
      name: "link",
      type: "url",
      description: "Link to the project",
    }),
    // advanced description
    defineField({
      name: "advancedDescription",
      type: "object",
      title: "Advanced Description",
      fields: [
        defineField({ name: "services", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "technologies", type: "array", of: [{ type: "string" }] }),
        defineField({
          name: "client",
          type: "string",
          title: "Client",
        }),
        defineField({
          name: "role",
          type: "string",
          title: "Role",
        }),
      ],
    }),
    // Objective
    defineField({
      name: "objective",
      type: "document",
      title: "Objective",
      fields: [
        { name: "title", type: "text", title: "Title" },
        { name: "description", type: "text", title: "Description" },
      ],
    }),
    // video
    defineField({
      name: "video",
        type: "file",
        title: "Project Video",
        description: "Upload a video file for the project",
        options: {
          accept: "video/*",
        },
    }),
    // main technologies used
    defineField({
      name: "technologies",
      type: "array",
        of: [{ type: "string" }],
        title: "Technologies",
        description: "Main technologies used in the project",
    }),
      defineField({
      name: 'detailedDescription',
      title: "Detailed Description",
      description: "Detailed explanation of the project in markdown format",
      type: 'blockContent',
    }),
  ],
});
