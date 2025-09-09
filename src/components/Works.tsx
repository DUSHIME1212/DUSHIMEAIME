"use client"

import React from "react";

import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Eye, Github, Link2 } from "lucide-react";
import { Safari } from "./Safari";
import { projects } from "~/lib/projects";
import { TextAnimate } from "./magicui/text-animate";
import { SmoothCursor } from "./ui/smooth-cursor";
import { ProjectCard } from "./ProjectCard";
import { fetchWorks, Project } from "~/lib/sanity/work";



function Works () {
  const [projects, setProjects] = React.useState<Project[]>([]);

  React.useEffect(() => {}, []);

  React.useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchWorks();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    getProjects();
  }, [])
  

  return (
    <div className="py-0 font-dmsans md:py-8">
      <div className="my-8 flex flex-col gap-4">
        <TextAnimate className="w-full text-2xl font-bold capitalize text-sky-700 md:w-2/3 md:text-5xl">
          what I have been up to lately
        </TextAnimate>
        <TextAnimate
          delay={0.4}
          className="mt-8 w-full text-xl opacity-70 md:w-2/3"
        >
          Bridging the gap between beautiful and bottom-line results.
        </TextAnimate>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        {projects?.map((item, i) => (
          <ProjectCard
            key={i}
            href={item.link}
            title={item.title}
            video={item.video?.asset?.url}
            image={item.projectImage?.url}
            tags={item.technologies}
            link={item.link}
            description={item.description}
           
          />
        ))}
      </div>
    </div>
  );
};

export default Works;
