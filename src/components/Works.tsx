"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TextAnimate } from "./magicui/text-animate";
import { fetchWorks, Project } from "~/lib/sanity/work";

gsap.registerPlugin(ScrollTrigger);

function Works() {
  const [projects, setProjects] = useState<Project[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    if (projects.length === 0) return;

    // Reveal animation for the whole grid
    gsap.from(".work-card", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".works-grid",
        start: "top 80%",
      }
    });

    // Parallax effect for internal images
    const cards = gsap.utils.toArray(".work-card");
    cards.forEach((card: any) => {
      const img = card.querySelector(".inner-media");
      gsap.to(img, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    });
  }, [projects]);

  return (
    <div className="py-24  font-dmsans bg-[#fcfcfc]" ref={containerRef}>
      {/* HEADER SECTION */}
      <div className="mb-20 flex flex-col gap-6 max-w-4xl">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-700 block">
          + Selected Works
        </span>
        <h2 className=" font-medium tracking-tighter leading-[0.9] text-neutral-900">
          Bridging the gap between <br />
          <span className="text-yellow-700 italic font-instrumentserif font-light">beauty & results.</span>
        </h2>
      </div>

      {/* WORKS GRID */}
      <div className="works-grid grid gap-y-32 grid-cols-1 gap-x-12 lg:grid-cols-2">
        {projects?.map((item, i) => (
          <Link 
            href={"/works/" + item.slug} 
            key={item._id || i} 
            className="work-card w-full group relative flex flex-col gap-6 cursor-none"
          >
            {/* MEDIA CONTAINER */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-neutral-100 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.2,1,0.3,1)] group-hover:shadow-2xl">
              {/* Parallax Wrapper */}
              <div className="inner-media relative h-[120%] w-full -top-[10%]">
                {item.video ? (
                  <video
                    src={item.video?.url || item.video?.asset?.url}
                    autoPlay loop muted playsInline
                    className="h-full w-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                  />
                ) : (
                  <Image
                    src={item.projectImage?.url}
                    alt={item.title}
                    fill
                    className="object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                  />
                )}
              </div>

              {/* OVERLAY LINK REVEAL */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/10">
                <div className="h-20 w-20 rounded-full bg-white text-black flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                  <ArrowUpRight size={32} strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* METADATA */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight uppercase group-hover:translate-x-2 transition-transform duration-500">
                  {item.title}
                </h2>
                <div className="flex gap-2">
                   {item.advancedDescription.technologies?.slice(0, 2).map((tech: string, index: number) => (
                      <span key={index} className="text-[10px] px-3 py-1 border border-neutral-200 rounded-full uppercase tracking-widest text-neutral-500">
                        {tech}
                      </span>
                   ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-500 font-light border-t border-neutral-100 pt-4">
                {item.advancedDescription.services.map((service: string, n: number) => (
                  <span key={n} className="flex items-center gap-2">
                    {n !== 0 && <span className="h-1 w-1 rounded-full bg-neutral-300" />}
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Works;