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
      },
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
        },
      });
    });
  }, [projects]);

  return (
    <div className="bg-background py-32 font-notion" ref={containerRef}>
      {/* HEADER SECTION */}
      <div className="mb-24 flex max-w-4xl flex-col gap-6">
        <span className="block text-[12px] font-semibold uppercase tracking-notion-badge text-notion-blue">
          + Selected Works
        </span>
        <h2 className="font-medium leading-[1.0] tracking-notion-heading text-foreground">
          Bridging the gap between <br />
          <span className="-offset-8 font-medium text-muted-foreground decoration-notion-blue/20 decoration-4">
            beauty & results.
          </span>
        </h2>
      </div>

      {/* WORKS GRID */}
      <div className="works-grid grid grid-cols-1 gap-x-12 gap-y-32 lg:grid-cols-2">
        {projects?.map((item, i) => (
          <Link
            href={"/works/" + item.slug}
            key={item._id || i}
            className="work-card group relative flex w-full cursor-none flex-col gap-8"
          >
            {/* MEDIA CONTAINER */}
            <div className="whisper-border notion-shadow ease-[cubic-bezier(0.2,1,0.3,1)] group-hover:notion-shadow-deep relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-card transition-all duration-700">
              {/* Parallax Wrapper */}
              <div className="inner-media relative -top-[10%] h-[120%] w-full">
                {item.video ? (
                  <video
                    src={item.video?.url || item.video?.asset?.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover grayscale-[0.1] transition-all duration-700 group-hover:grayscale-0"
                  />
                ) : (
                  <Image
                    src={item.projectImage?.url ? `${item.projectImage.url}?w=1600&q=75` : ""}
                    alt={item.title}
                    fill
                    className="object-cover grayscale-[0.1] transition-all duration-700 group-hover:grayscale-0"
                  />
                )}
              </div>

              {/* OVERLAY LINK REVEAL */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="notion-shadow-deep flex h-20 w-20 scale-50 items-center justify-center rounded-pill border border-white/50 bg-white/90 text-notion-blue backdrop-blur-sm transition-transform duration-500 group-hover:scale-100">
                  <ArrowUpRight size={32} strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* METADATA */}
            <div className="flex flex-col gap-6 px-2">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <h2 className="text-3xl font-medium uppercase tracking-notion-subheading transition-colors duration-500 group-hover:text-notion-blue md:text-[32px]">
                  {item.title}
                </h2>
                <div className="flex gap-2 flex-wrap">
                  {item.advancedDescription.technologies
                    ?.slice(0, 2)
                    .map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="rounded-pill size-fit border border-border bg-notion-warm-white/50 px-3 py-1 text-[12px] font-medium tracking-notion-badge text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 border-t pt-6 text-[15px] font-medium text-muted-foreground">
                {item.advancedDescription.services.map(
                  (service: string, n: number) => (
                    <span key={n} className="flex items-center gap-2">
                      {n !== 0 && (
                        <span className="h-1 w-1 rounded-pill bg-notion-blue/20" />
                      )}
                      {service}
                    </span>
                  ),
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Works;
