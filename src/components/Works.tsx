"use client";

import React from "react";
import gsap from "gsap";

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
import Image from "next/image";
import { useGSAP } from "@gsap/react";

function Works() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);

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
  }, []);

  useGSAP(() => {
    console.log("Projects updated:", projects);
  });

  function Hovercard(containerDivRef: React.RefObject<HTMLDivElement | null>) {
    if (containerDivRef.current) {
      gsap.to(containerDivRef.current, {
        rotate: 5,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }

  function ResetHovercard(containerDivRef: React.RefObject<HTMLDivElement | null>) {
    if (containerDivRef.current) {
      gsap.to(containerDivRef.current, {
        skewY: 0,
        rotate: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }

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
        {projects?.map((item, i) => {
          const containerDivRef = React.createRef<HTMLDivElement>();
          return (
            <Link href={"/works/"+item.slug} key={i} className="relative flex min-h-96 w-full flex-col gap-2">
              {item.video ? (
                <video
                  src={item.video?.url || item.video?.asset?.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="pointer-events-none mx-auto h-full w-full object-contain object-top" // needed because random black line at bottom of video
                />
              ) : (
                <div
                  ref={containerDivRef}
                  className="shadow-gray-600 relative h-96 scale-75 w-full overflow- rounded-xl p-2 shadow-2xl"
                  onMouseEnter={() => Hovercard(containerDivRef)}
                  onMouseLeave={() => ResetHovercard(containerDivRef)}
                >
                  <Image
                    src={item.projectImage?.url}
                    alt={item.title}
                    width={500}
                    height={100}
                    className="h-full w-full overflow-hidden rounded-xl object-cover object-center"
                  />
                </div>
              )}
              <div className="absolute bottom-0 left-0 flex w-full flex-col items-center justify-center gap-2 bg-white p-0 md:p-4">
                <h2 className="text-lg">{item.title}</h2>
                <p className="line-clamp-3">
                  {item.advancedDescription.services.map(
                    (service: string, n: number) => (
                      <span key={n}>
                        {service}
                        {n < item.advancedDescription.services.length - 1
                          ? ", "
                          : ""}
                      </span>
                    ),
                  )}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Works;
