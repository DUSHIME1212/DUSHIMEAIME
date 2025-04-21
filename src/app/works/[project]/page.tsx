"use client";

import { Tag } from "@geist-ui/icons";
import { Tags } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Safari } from "~/components/Safari";
import { Badge } from "~/components/ui/badge";
import { SmoothCursor } from "~/components/ui/smooth-cursor";
import { AnimateParagraph } from "~/lib/Animation";
import { filterproject } from "~/lib/projects";

async function getProjectData(slug: string) {
  const res = await fetch(
    `https://portfoliostrapicms.onrender.com/api/projects?filters[slug][$eq]=${slug}&populate=*`,
    { next: { revalidate: 3600 } },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch project data");
  }
  const data = await res.json();
  return data.data[0];
}

export default function Page({ params }) {
  const { project } = useParams();

  const projectData = filterproject(Number(project));

  if (!projectData) {
    return (
      <section className="grid min-h-[512px] place-items-center font-indie text-7xl">
        404 Page not found
      </section>
    );
  }

  return (
    <div className="flex w-full flex-col justify-center overflow-hidden px-8 font-dmsans tracking-tighter md:px-16 lg:px-32">
      <div>
        <h1 className="text-4xl font-bold">{projectData.title}</h1>
        <div className="flex flex-wrap gap-2 py-4">
          {projectData.tags.map((tag, index) => (
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
      <div className="grid grid-cols-1 md:grid-cols-3">
        <Safari
          imageSrc={projectData.image}
          className="col-span-2 mx-auto shadow-2xl shadow-black size-full object-cover"
        />
      </div>
      <div>
        <h2 className="py-4 text-2xl font-bold">Project Overview</h2>
        <div className="flex flex-wrap gap-2 py-4 lg:w-2/3">
          {projectData.description}
        </div>
      </div>
      <div className="py-8 leading-tight">
        <div className="grid  w-full grid-cols-4">
          <div className="space-y-2 p-4">
            <p>Category</p>
            <h2 className="text-2xl font-bold">{projectData.category}</h2>
          </div>
          <div className="space-y-2 p-4">
            <p>Client</p>
            <h2 className="text-2xl font-bold">
              {
                projectData.ClientTestimonial ? (
                  <p
                  >
                    {projectData.ClientTestimonial.name}
                  </p>
                ) : (
                  "N/A"
                )
              }
            </h2>
          </div>
          <div className="space-y-2 p-4">
            <p>Timeframe</p>
            <h2 className="text-2xl font-bold">{projectData.Timeframe}</h2>
          </div>
          <div className="space-y-2 p-4">
            <p>Role</p>
            <h2 className="text-2xl font-bold">{projectData.role}</h2>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="p-8">
          <h2 className="text-2xl font-bold">Goals</h2>
          <ul className="space-y-2">
            {projectData.Goals.map((goal, index) => (
              <li key={index} className="my-2 py-2">
                {goal}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-6 p-8">
          Hele
        </div>
      </div>
      <div className="size-fit my-8">
        <h2 className="text-2xl font-bold mb-4">How I Grew</h2>
        <ReactMarkdown className="prose w-full">
          {projectData.Howigrown}
        </ReactMarkdown>
      </div>
      <div className="size-fit my-8">
        <h2 className="text-2xl font-bold mb-4">Challenges</h2>
        <ReactMarkdown className="prose w-full">
          {projectData.Challenge}
        </ReactMarkdown>

      </div>
      <div className="size-fit my-8">
        <h2 className="text-2xl font-bold mb-4">Solution</h2>
        <ReactMarkdown className="prose w-full">
          {projectData.Solution}
        </ReactMarkdown>
      </div>
      <div className="size-fit my-8">
        <h2 className="text-2xl font-bold mb-4">Results</h2>
        <ReactMarkdown className="prose w-full">
          {projectData.Results}
        </ReactMarkdown>
      </div>
      <SmoothCursor/> 
    </div>
  );
}
