"use client";

import { Tag } from "@geist-ui/icons";
import { Tags } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { PortableText, type SanityDocument } from "next-sanity";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Safari } from "~/components/Safari";
import { Badge } from "~/components/ui/badge";
import { SmoothCursor } from "~/components/ui/smooth-cursor";
import { AnimateParagraph } from "~/lib/Animation";
import { filterproject } from "~/lib/projects";
import { fetchWorkBySlug, Project } from "~/lib/sanity/work";

const components = {
  types: {
    code: (props) => {
      const { language, code } = props.value;
      return (
        <pre data-language={language}>
          <code>{code}</code>
        </pre>
      );
    },
  },
};

export default function Page({ params }) {
  const { project } = useParams();
  const [projectData, setProjectData] = React.useState<Project | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const slug = Array.isArray(project) ? project[0] : project;
        const data = await fetchWorkBySlug(slug);
        setProjectData(data);
        console.log("Fetched project data:", data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchData();
  }, [project]);

  if (!projectData) return <div>Loading...</div>;

  return (
    <div>
      <div className="relative h-screen w-full">
        <Image
          src={projectData.projectImage?.url}
          alt={projectData.title}
          fill
          className="w-full overflow-hidden object-cover object-top"
        />
      </div>
      <div className="flex w-full flex-col justify-center overflow-hidden px-8 font-dmsans tracking-tighter md:px-36 lg:px-72">
        <div>
          <h1 className="text-4xl font-bold lg:w-2/3">{projectData.title}</h1>
          <div className="flex flex-wrap gap-2 py-4">
            {projectData.technologies?.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-blue-700 text-white"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2 py-4 lg:w-2/3">
            {projectData.description}
          </div>
        </div>
        <div className="py-8 leading-tight w-full"></div>
        <div className="prose px-8 md:px-16 ">
          <PortableText
            value={projectData.detailedDescription as SanityDocument[]}
            components={components}
          />
        </div>
      </div>
    </div>
  );
}
