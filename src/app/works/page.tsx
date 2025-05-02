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
import { projects } from "~/lib/projects";
import { Badge } from "~/components/ui/badge";
gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  created: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  link: string;
  githuburl: string;
  bannerimage?: BannerImage[];
}

interface BannerImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: ImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: ProviderMetadata;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ImageFormats {
  large: ImageFormat;
  small: ImageFormat;
  medium: ImageFormat;
  thumbnail: ImageFormat;
}

interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  provider_metadata: ProviderMetadata;
}

interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

const Page = () => {
  const containerRef = useRef(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [Projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setProjects(projects);
      const res = await fetch(
        "https://portfoliostrapicms.onrender.com/api/projects?populate=*",
        { next: { revalidate: 3600 } },
      );
      const data = await res.json();
      // setProjects(data.data);
    };

    fetchData();
  }, []);
  useGSAP(() => {
    if (containerRef.current && sectionRefs.current.length > 0) {
      const sections = sectionRefs.current.filter((ref) => ref !== null);
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
            snap: {
              snapTo: 1 / (sections.length - 1),
              duration: { min: 0.1, max: 0.1 },
            },
          },
        },
      );
    } else {
      console.error("containerRef or sections are invalid");
    }
  }, [projects]);

  return (
    <div className="p-8 md:px-16 lg:px-32">
      <div className="flex flex-col gap-2 lg:px-40">
        <h1 className="text-blue-700">Work</h1>
        <h3 className="text-yellow-500">Product Design</h3>
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
        {projects.map((item, i: number) => (
          <div
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
            key={item.id}
            className="group sticky top-12 flex h-full min-h-[512px] w-full flex-shrink-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl duration-500 md:flex-row"
          >
            <div className="group-h:shadow-[0px_52px_92px_#3300FFA0] relative z-0 size-fit w-full scale-90 overflow-clip rounded-xl duration-500 max-md:scale-100 max-md:shadow-none md:w-1/2">
              {item.video && (
                <video
                  src={item.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="pointer-events-none mx-auto h-[512px] w-full object-cover object-top" // needed because random black line at bottom of video
                />
              )}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[512px] w-full overflow-hidden object-cover object-top"
                />
              )}
            </div>
            <div className="flex w-full flex-col justify-center gap-4 max-md:px-0 md:w-1/2 md:p-4 lg:px-16">
              <h2 className="text-3xl uppercase">{item.title}</h2>
              <h5 className="capitalize text-yellow-500 duration-500">
                {item.type}
              </h5>
              <h5>
                {item.technologies.map((tag, i) => (
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
                  size={"lg"}
                  className="group gap-4 rounded-full bg-blue-500 from-blue-300 py-6 group-hover:bg-blue-800"
                  asChild
                >
                  <Link
                    href={`/works/${item.id}`}
                    className="flex items-center gap-2"
                  >
                    Case study
                    <ArrowUpRight className="duration-300 group-hover:rotate-45" />
                  </Link>
                </Button>
                <Button
                  variant={"ghost"}
                  size={"lg"}
                  className="gap-4 rounded-full bg-yellow-500 py-6 text-white"
                  asChild
                >
                  <Link href={item.link}>View project</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects?.slice(4, 8).map((item, i) => (
          <div
            key={i}
            className="flex min-h-96 flex-col items-center gap-2 md:flex-row"
          >
            <div className="relative h-56 w-full overflow-clip rounded-xl md:w-1/2">
              {item.video && (
                <video
                  src={item.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="pointer-events-none mx-auto h-56 w-full object-cover object-top" // needed because random black line at bottom of video
                />
              )}
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={300}
                  className="h-56 w-full overflow-hidden object-cover object-top"
                />
              )}
            </div>
            <div className="flex w-full flex-col justify-start gap-4 p-0 md:w-1/2 md:p-4">
              <h2 className="text-lg">{item.title}</h2>
              <p className="line-clamp-3">{item.description}</p>
              {item.links && item.links.length > 0 &&
                item.links.map((link, idx) => (
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    asChild
                    key={idx}
                    className="gap-4 py-6 rounded-full bg-blue-500 from-blue-300 text-white group-hover:bg-blue-800"
                  >
                    <Link href={link?.href} target="_blank">
                    View project
                      <ArrowUpRight className="duration-700 group-hover:rotate-45" />
                    </Link>
                  </Button>
                ))}
              <Button
                variant={"ghost"}
                size={"sm"}
                className="gap-4 rounded-full bg-yellow-500 py-6 text-white"
                asChild
              >
                <Link href={`/works/${item.id}`}>View Case study</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
