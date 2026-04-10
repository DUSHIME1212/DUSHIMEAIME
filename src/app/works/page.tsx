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

    // CRITICAL: Kill all leftover ScrollTrigger instances when page first mounts
    // This prevents a ghost "pinned" state from a previous visit
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  useGSAP(() => {
    if (projects.length > 0 && scrollRef.current) {
      const sections = gsap.utils.toArray(".project-card");

      // Ensure element is at x=0 before calculating
      gsap.set(scrollRef.current, { x: 0 });

      const scrollWidth = (scrollRef.current as HTMLElement).scrollWidth;
      const amountToScroll = scrollWidth - window.innerWidth;

      // Horizontal Scroll Animation
      const hScroll = gsap.to(scrollRef.current, {
        x: () => -amountToScroll,
        ease: "none",
        id: "horizontalScroll",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${amountToScroll}`,
          invalidateOnRefresh: true,
          onLeaveBack: () => {
            // Reset position when user scrolls back above the section
            gsap.set(scrollRef.current, { x: 0 });
          },
        },
      });

      // Image parallax within cards
      sections.forEach((section: any) => {
        const img = section.querySelector(".project-visual");
        if (!img) return;
        gsap.fromTo(
          img,
          { scale: 1.1 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              containerAnimation: hScroll,
              start: "left right",
              end: "right left",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      ScrollTrigger.refresh();
    }
  }, [projects]);

  return (
    <div className="bg-background font-notion text-foreground transition-colors duration-500">
      {/* HEADER SECTION */}
      <section className="px-8 pt-32 pb-20 md:px-16 lg:px-32">
        <div className="max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-notion-badge text-notion-blue">+ Selected Works</span>
          <h1 className="mt-6 text-6xl md:text-8xl font-medium tracking-notion-display leading-[0.9]">
            Digital experiences <br />
            <span className="text-notion-blue">with purpose.</span>
          </h1>
          <p className="mt-16 text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-2xl">
            I specialize in bridging the gap between complex system architecture and human-centric interface design.
          </p>
        </div>
      </section>

      {/* HORIZONTAL WORK SECTION */}
      <div ref={containerRef} className="overflow-hidden bg-background py-20">
        <div 
          ref={scrollRef} 
          className="flex flex-row items-center h-[70vh] gap-0 px-[10vw]"
        >
          {projects.slice(0, 5).map((item, i) => (
            <div
              key={item._id}
              className="project-card relative flex h-full w-[85vw] md:w-[70vw] lg:w-[60vw] flex-shrink-0 flex-col justify-center px-12 md:px-20"
            >
              <div className="group relative w-full overflow-hidden rounded-lg aspect-video bg-muted whisper-border notion-shadow transition-all duration-700 hover:notion-shadow-deep">
                {/* Visual Layer */}
                <div className="project-visual relative h-full w-full">
                  {item.video ? (
                    <video
                      src={item.video?.url}
                      autoPlay loop muted playsInline
                      className="h-full w-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                    />
                  ) : (
                    <img
                      src={item.projectImage?.url ? `${item.projectImage.url}?w=1600&q=75` : ""}
                      alt={item.title}
                      className="h-full w-full object-cover grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700"
                    />
                  )}
                </div>
                
                {/* Overlay Link */}
                <Link 
                   href={`/works/${item.slug}`}
                   className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5"
                >
                    <div className="h-20 w-20 rounded-pill bg-white text-notion-blue flex items-center justify-center text-[10px] uppercase font-semibold tracking-notion-badge notion-shadow border border-white/50">
                        View
                    </div>
                </Link>
              </div>

              {/* Card Footer Info */}
              <div className="mt-8 flex justify-between items-start text-foreground">
                <div>
                  <h2 className="text-3xl font-medium tracking-notion-subheading uppercase group-hover:text-notion-blue transition-colors duration-500">{item.title}</h2>
                  <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-notion-badge font-semibold">{item.projectType}</p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-notion-badge font-semibold">Context</p>
                    <p className="text-sm mt-1 font-medium">{item.technologies?.[0]} / {item.technologies?.[1]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MORE PROJECTS (GRID SECTION) */}
      <section className="px-8 py-32 md:px-16 lg:px-32">
        <div className="flex items-end justify-between border-b whisper-border pb-8">
          <h2 className="text-[40px] font-medium tracking-notion-heading">Archive & <span className="text-muted-foreground">More</span></h2>
          <span className="text-[10px] uppercase tracking-notion-badge text-muted-foreground font-semibold">004 — 008</span>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-24 md:grid-cols-2">
          {projects.slice(5, 9).map((item, i) => (
            <Link href={`/works/${item.slug}`} key={i} className="group cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted whisper-border notion-shadow transition-all duration-700 hover:notion-shadow-deep">
                <Image
                  src={item.projectImage?.url ? `${item.projectImage.url}?w=1200&q=75` : ""}
                  alt={item.title}
                  fill
                  className="object-cover grayscale-[0.1] group-hover:grayscale-0 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium tracking-notion-subheading uppercase group-hover:text-notion-blue transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1 font-medium">{item.description}</p>
                </div>
                <ArrowUpRight className="text-muted-foreground opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <footer className="px-8 py-32 text-center bg-card border-t whisper-border">
         <h2 className="text-5xl md:text-7xl font-medium tracking-notion-display">Ready to start?</h2>
         <Link href="/contact" className="mt-10 inline-block text-2xl border-b-2 border-notion-blue/20 pb-2 hover:text-notion-blue hover:border-notion-blue transition-all font-semibold">
            Let's talk design.
         </Link>
      </footer>
    </div>
  );
};

export default Page;