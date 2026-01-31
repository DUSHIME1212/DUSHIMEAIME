"use client";

import { ArrowUpRight } from "@geist-ui/icons";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fetchWorks, Project } from "~/lib/sanity/work";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchWorks();
      setProjects(res);
    };
    fetchData();
  }, []);

  useGSAP(() => {
    if (projects.length > 0 && scrollRef.current) {
      const sections = gsap.utils.toArray(".project-card");
      
      // Horizontal Scroll Animation
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          // End based on width for better UX
          end: () => `+=${scrollRef.current?.offsetWidth}`,
        },
      });

      // Subtle Image Parallax/Scale within the cards
      sections.forEach((section: any) => {
        const img = section.querySelector(".project-visual");
        gsap.fromTo(img, 
          { scale: 1.2 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              containerAnimation: gsap.getById("horizontalScroll"), // If using complex timelines
              start: "left right",
              end: "right left",
              scrub: true
            }
          }
        );
      });
    }
  }, [projects]);

  return (
    <div className="bg-[#f5f5f3] text-black transition-colors duration-500">
      {/* HEADER SECTION */}
      <section className="px-8 pt-32 pb-20 md:px-16 lg:px-32">
        <div className="max-w-4xl">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-600">+ Selected Works</span>
          <h1 className="mt-6 text-6xl md:text-8xl font-medium tracking-tighter leading-[0.9]">
            Digital experiences <br />
            <span className="text-yellow-700 italic font-instrumentserif font-light">with purpose.</span>
          </h1>
          <p className="mt-16 text-xl md:text-2xl text-neutral-600 font-light leading-relaxed max-w-2xl">
            I specialize in bridging the gap between complex system architecture and human-centric interface design.
          </p>
        </div>
      </section>

      {/* HORIZONTAL WORK SECTION */}
      <div ref={containerRef} className="overflow-hidden bg-white py-20">
        <div 
          ref={scrollRef} 
          className="flex flex-row items-center h-[70vh] gap-0 px-[10vw]"
        >
          {projects.slice(0, 5).map((item, i) => (
            <div
              key={item._id}
              className="project-card relative flex h-full w-[85vw] md:w-[70vw] lg:w-[60vw] flex-shrink-0 flex-col justify-center px-12 md:px-20"
            >
              <div className="group relative w-full overflow-hidden rounded-sm aspect-video bg-neutral-900">
                {/* Visual Layer */}
                <div className="project-visual relative h-full w-full">
                  {item.video ? (
                    <video
                      src={item.video?.url}
                      autoPlay loop muted playsInline
                      className="h-full w-full object-cover  transition-all duration-700"
                    />
                  ) : (
                    <img
                      src={item.projectImage?.url}
                      alt={item.title}
                      className="h-full w-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                    />
                  )}
                </div>
                
                {/* Overlay Link */}
                <Link 
                   href={`/works/${item.slug}`}
                   className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40"
                >
                    <div className="h-24 w-24 rounded-full bg-white text-black flex items-center justify-center text-xs uppercase font-bold tracking-widest">
                        View
                    </div>
                </Link>
              </div>

              {/* Card Footer Info */}
              <div className="mt-8 flex justify-between items-start text-black">
                <div>
                  <h2 className="text-3xl font-medium tracking-tight font-instrumentserif italic uppercase">{item.title}</h2>
                  <p className="text-xs text-neutral-500 mt-2 uppercase tracking-widest">{item.projectType}</p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-xs text-neutral-500 uppercase tracking-widest">Context</p>
                    <p className="text-sm mt-1">{item.technologies?.[0]} / {item.technologies?.[1]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MORE PROJECTS (GRID SECTION) */}
      <section className="px-8 py-32 md:px-16 lg:px-32">
        <div className="flex items-end justify-between border-b font-instrumentserif border-neutral-200 pb-8">
          <h2 className="text-4xl font-light tracking-tight">Archive & <span className="italic">More</span></h2>
          <span className="text-xs uppercase tracking-widest text-neutral-400">004 — 008</span>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-24 md:grid-cols-2">
          {projects.slice(5, 9).map((item, i) => (
            <Link href={`/works/${item.slug}`} key={i} className="group cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-neutral-100">
                <Image
                  src={item.projectImage?.url || ""}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium uppercase tracking-tight">{item.title}</h3>
                  <p className="text-sm text-neutral-500 mt-1 line-clamp-1">{item.description}</p>
                </div>
                <ArrowUpRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <footer className="px-8 py-32 text-center bg-white">
         <h2 className="text-5xl md:text-7xl font-medium tracking-tighter">Ready to start?</h2>
         <Link href="/contact" className="mt-10 inline-block text-2xl border-b-2 border-black pb-2 hover:text-neutral-500 hover:border-neutral-500 transition-all">
            Let's talk design.
         </Link>
      </footer>
    </div>
  );
};

export default Page;