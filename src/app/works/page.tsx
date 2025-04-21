"use client"

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
      setProjects(projects)
      const res = await fetch("https://portfoliostrapicms.onrender.com/api/projects?populate=*",
        { next: { revalidate: 3600 } }
      );
      const data = await res.json();
      // setProjects(data.data);
    };

    fetchData();
  }, []);useGSAP(() => {
    if (containerRef.current && sectionRefs.current.length > 0 ) {
      const sections = sectionRefs.current.filter((ref) => ref !== null); 
      gsap.fromTo(
        sections,
        { xPercent: 0 },
        {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {

            trigger: containerRef.current,
            start: '0% 0%',
            end: "+=500",
            pin: true,
            scrub: 1,
            snap:{
              snapTo: 1/(sections.length - 1),
              duration: {min: 0.1, max: 0.1}
            }
          },
        }
      );
    } else {
      console.error("containerRef or sections are invalid");
    }
  }, [projects]);
  
  

  return (
    <div className="p-8 md:px-16 lg:px-32">
      <div className="flex flex-col gap-2">
        <h1 className="text-blue-700">Work</h1>
        <h3 className="font-indie">Product Design</h3>
        <h6 className="target1 w-2/3 min-w-96 font-normal tracking-normal">
          I'm excited to collaborate with a talented team at companies where I can apply my skills and knowledge to contribute to impactful projects and learn from experienced professionals.
        </h6>
      </div>
      <div ref={containerRef} className="mt-8 flex flex-row  relative overflow-hidden h-screen w-full-container  gap-4">
        {projects.slice(0, 4).map((item, i: number) => (
          <div
            ref={el => { sectionRefs.current[i] = el; }}
            key={item.id}
            className="group cursor-pointer flex-shrink-0 w-full h-full flex min-h-[512px] sticky top-12 flex-col gap-2 justify-center items-center rounded-3xl duration-500  md:flex-row"
          >
            <div className="relative z-0 size-fit group-hover:md:shadow-[0px_52px_92px_#3300FFA0] w-full scale-90 overflow-clip rounded-xl duration-500 max-md:scale-100 max-md:shadow-none md:w-1/2 ">
              <Safari
                imageSrc={`${item.image}`}
                className="size-full object-cover duration-500  group-hover:scale-100"
              />
            </div>
            <div className="flex w-full flex-col justify-center gap-4 md:p-4 lg:px-16 max-md:px-0 md:w-1/2">
              <h2 className="text-6xl uppercase line-clamp-1 font-indie">
                {item.title}
              </h2>
              <h5 className="capitalize duration-500 group-hover:text-blue-700">
                {item.type}
              </h5>
              <div className="grid grid-cols-2 gap-8 pr-16">
                <Button
                  variant={"gooeyLeft"}
                  size={"lg"}
                  className="group gap-4 py-6 rounded-full from-blue-300 group-hover:bg-blue-800"
                  asChild
                >
                  <Link href={`/works/${item.id}`} className="flex items-center gap-2">
                    Case study
                    <ArrowUpRight className="duration-300 group-hover:rotate-45" />
                  </Link>
                </Button>
                <Button
                  variant={"ghost"}
                  size={"lg"}
                  className="group-hover:bg-black-800 py-6 group gap-4 rounded-full from-blue-300"
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
            className="flex min-h-96 flex-col items-start gap-2 md:flex-row"
          >
            <div className="relative h-56 w-full overflow-clip rounded-xl md:w-1/2">
              <Image src={item.image} alt="" className="object-cover" priority fill />
            </div>
            <div className="flex w-full flex-col justify-start gap-4 p-0 md:p-4 md:w-1/2">
              <h2 className="">{item.title}</h2>
              <Button
                variant={"ghost"}
                size={"lg"}
                className="group w-fit gap-4 rounded-full"
              >
                Case study
                <ArrowUpRight className="duration-700 group-hover:rotate-45" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between p-8">
        <div className="flex flex-col gap-2">
          <h2>My process at its core</h2>
          <p>
            I design products that put people first, blending beautiful
            interfaces with functionality.
          </p>
        </div>
        <Button
          variant={"outline"}
          className="rounded-full border-2 border-black"
          asChild
        >
          <Link href={""} className="flex flex-row items-center gap-4">
            About
            <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
