"use client";

import { ArrowUpRight } from "@geist-ui/icons";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Safari } from "~/components/Safari";
import { Badge } from "~/components/ui/badge";
import { fetchWorks, Project } from "~/lib/sanity/work";
gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const containerRef = useRef(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [Projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchWorks();
      setProjects(res);
      console.log("Fetched projects:", res);
    };

    fetchData();
  }, []);
  useGSAP(() => {
    if (containerRef.current && Projects.length > 0) {
      // Ensure refs array matches Projects length
      const sections = sectionRefs.current
        .slice(0, Projects.length)
        .filter(Boolean);
      gsap.fromTo(
        sections,
        { xPercent: 0 },
        {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "0% 0%",
            end: "+=500",
            pin: true,
            scrub: 1,
            // snap: {
            //   snapTo: 1 / (sections.length - 1),
            //   duration: { min: 0.1, max: 0.1 },
            // },
          },
        },
      );
    } else {
      console.error("containerRef or sections are invalid");
    }
  }, [Projects.length]);

  return (
    <div className="p-8 md:px-16 lg:px-32">
      <div className="flex flex-col gap-2">
        <h1 className="text-blue-700">Work</h1>
        <h3 className="">Product Design</h3>
        <h6 className="target1 w-2/3 min-w-96 font-normal tracking-normal">
          I'm excited to collaborate with a talented team at companies where I
          can apply my skills and knowledge to contribute to impactful projects
          and learn from experienced professionals.
        </h6>
      </div>
      <div
        ref={containerRef}
        className="w-full-container relative mt-8 flex h-screen flex-row gap-4 overflow-hidden"
      >
        {Projects.slice(0, 4).map((item, i: number) => (
          <div
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
            key={item._id}
            className="group relative flex h-full min-h-[512px] w-full flex-shrink-0 cursor-pointer flex-col items-center justify-center gap-2 duration-500 md:flex-row"
          >
            <div className="group-h:shadow-[0px_52px_92px_#3300FFA0] overflow- relative z-0 size-fit w-full scale-90 rounded-xl duration-500 max-md:scale-100 max-md:shadow-none md:w-1/2">
              {item.video ? (
                <video
                  src={item.video?.url || item.video?.asset?.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-[512px] w-full object-contain object-center"
                />
              ) : (
                <img
                  src={item.projectImage?.url}
                  alt={item.title}
                  className="h-[512px] w-full overflow-hidden object-contain object-center"
                />
              )}
            </div>
            <div className="flex w-full flex-col justify-center gap-2 max-md:px-0 md:w-1/2 md:p-4">
              <h2 className="text-3xl uppercase">{item.title}</h2>
              <h5 className="capitalize text-yellow-500 duration-500">
                {item.projectType}
              </h5>
              <h5>
                {Array.isArray(item.technologies) &&
                  item.technologies.map((tag, i) => (
                    <span
                      key={i}
                      className="mr-2 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700"
                    >
                      {tag}
                    </span>
                  ))}
              </h5>
              <p>{item.description}</p>
              <div className="grid grid-cols-2 gap-8 pr-16">
                <Button
                  variant={"gooeyLeft"}
                  size={"sm"}
                  className="group gap-4 rounded-full bg-blue-500 from-blue-300 group-hover:bg-blue-800"
                  asChild
                >
                  <Link
                    href={`/works/${item.slug}`}
                    className="flex items-center gap-2"
                  >
                    Case study
                    <ArrowUpRight className="duration-300 group-hover:rotate-45" />
                  </Link>
                </Button>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className="gap-4 rounded-full bg-yellow-500 text-white"
                  asChild
                >
                  <Link href={item.link}>View project</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* second row */}
      <div className="my-16 flex w-full flex-col">
        <h2 className="mt-16 text-2xl font-bold">More Projects</h2>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {Projects?.slice(4, 8).map((item, i) => (
            <div
              key={i}
              className="justify- flex min-h-96 w-full flex-col items-center gap-2"
            >
              <div className="relative h-96 w-full overflow-clip rounded-xl">
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
                  item.projectImage?.url && (
                    <Image
                      src={item.projectImage?.url}
                      alt={item.title}
                      width={500}
                      height={300}
                      className="h-full w-full overflow-hidden object-contain object-center"
                    />
                  )
                )}
              </div>
              <div className="flex w-full flex-col justify-start gap-4 p-0 md:p-4">
                <h2 className="text-lg">{item.title}</h2>
                <p className="line-clamp-3">{item.description}</p>
                {item.link && (
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    asChild
                    className="gap-4 rounded-full bg-blue-500 from-blue-300 text-white group-hover:bg-blue-800"
                  >
                    <Link href={item.link} target="_blank">
                      View project
                      <ArrowUpRight className="duration-700 group-hover:rotate-45" />
                    </Link>
                  </Button>
                )}
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className="gap-4 rounded-full bg-yellow-500 text-white"
                  asChild
                >
                  <Link href={`/works/${item.slug}`}>View Case study</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
