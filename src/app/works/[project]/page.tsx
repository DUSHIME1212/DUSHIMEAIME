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
import { urlForImage } from "~/lib/sanity/sanity.image";
import Link from "next/link";

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
    image: ({ value }) => {
      const imgWidth = value?.imgWidth || 800;
      const imgHeight = value?.imgHeight || 600;
      const imgUrl = urlForImage(value.asset)
        .height(imgHeight)
        .width(imgWidth)
        .url();

      return (
        <Image
          width={imgWidth}
          height={imgHeight}
          alt={value.alt || "Project image"}
          src={imgUrl}
          sizes="100vw"
          priority={false}
          className="object-contain"
        />
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

        const images = data.detailedDescription.filter(
          (block: any) => block._type === "image",
        );
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchData();
  }, [project]);

  if (!projectData) return <div>Loading...</div>;

  return (
    <div>
      <div className="relative h-[200vh] w-full">
        <div className="absolute top-0 -z-[5] size-full bg-black/80" />
        <Image
          src={projectData.projectImage?.url}
          alt={projectData.title}
          fill
          className="-z-10 w-full overflow-hidden object-cover object-top"
        />
        <div className="h-full space-y-8 px-8 md:px-16 lg:px-32 lg:pt-32">
          <div className="flex flex-row items-center justify-between text-white">
            <div className="flex w-2/3 flex-col gap-4">
              <h1 className="">{projectData.title}</h1>
              <p>{projectData.advancedDescription.client}</p>
            </div>
            <Link
              href={projectData.link}
              target="_blank"
              className="w-fit underline"
            >
              View Website
            </Link>
          </div>
          <h4 className="w-full font-normal text-white lg:w-2/3">
            {projectData.description && `${projectData.description}`}
          </h4>
          <div className="grid grid-cols-4 w-2/3 text-white  gap-4">
            <div>
              <h6>Client</h6>
              <p>{projectData.advancedDescription.client}</p>
            </div>
            <div>
              <h6>Services</h6>
              <ul className="list-none">
                {projectData.advancedDescription.services.map((item, i) => {
                  return <li key={i}>{item}</li>;
                })}
              </ul>
            </div>
            <div>
              <h6>Industries</h6>
              <ul className="list-none">
                {projectData.advancedDescription.technologies.map((item, i) => {
                  return <li key={i}>{item}</li>;
                })}
              </ul>
            </div>
            <div>
              <h6>Role</h6>
              <ul className="list-none">
                {projectData.advancedDescription.role}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col justify-center overflow-hidden px-8 font-dmsans tracking-tighter md:px-36">
        
        <div className="w-full py-8 leading-tight"></div>
        <div className="wf prose-lg px-8 md:px-16">
          <PortableText
            value={projectData.detailedDescription as SanityDocument[]}
            components={components}
          />
        </div>
      </div>
    </div>
  );
}
