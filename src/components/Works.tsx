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

interface Projects {
  id: string;
}

const Works = async () => {
  const res = await fetch(
    "https://portfoliostrapicms.onrender.com/api/projects?populate=*",
    { next: { revalidate: 3660 } },
  );
  const data = await res.json();
  // const projects = data.data;
  // console.log(projects);

  return (
    <div className="py-0 md:py-8">
      <div className="my-8 flex flex-col gap-4">
        <TextAnimate className="w-full text-3xl font-bold capitalize text-sky-700 md:w-2/3 md:text-5xl">
          what I have been up to lately
        </TextAnimate>
        <TextAnimate
          delay={0.4}
          className="mt-8 w-full text-3xl opacity-70 md:w-2/3"
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
            video={item.video}
            image={item.image}
            tags={item.technologies}
            link={"https://www.instagram.com"}
            description={item.description}
            links={item.links?.map(link => ({ ...link, icon: <Link2 className="size-4" /> }))}
          />
        ))}
      </div>
    </div>
  );
};

export default Works;
