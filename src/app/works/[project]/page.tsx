"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { PortableText, type SanityDocument } from "next-sanity";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { urlForImage } from "~/lib/sanity/sanity.image";
import { fetchWorkBySlug, Project } from "~/lib/sanity/work";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectPage() {
  const { project } = useParams();
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const slug = Array.isArray(project) ? project[0] : project;
        const data = await fetchWorkBySlug(slug);
        setProjectData(data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [project]);

  // 2. Animations
  useLayoutEffect(() => {
    if (!projectData) return;

    let ctx = gsap.context(() => {
      // Hero Background Parallax
      gsap.to(".hero-image", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text Reveal Animation for Hero
      const tl = gsap.timeline();
      tl.from(".reveal-up", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2,
      }).from(".reveal-slow", {
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
      }, "-=0.5");

      // Scroll-driven scaling for images inside PortableText
      gsap.utils.toArray(".project-img-wrapper").forEach((wrapper: any) => {
        const img = wrapper.querySelector("img");
        gsap.fromTo(img, 
          { scale: 1.2 }, 
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projectData]);

  // 3. Custom PortableText Components
  const components = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) {
          return (
            <div className="project-img-wrapper relative my-20 h-[50vh] md:h-[80vh] w-full overflow-hidden rounded-lg bg-muted whisper-border">
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">Image not available</p>
              </div>
            </div>
          );
        }
        try {
          const imageUrl = urlForImage(value.asset).width(1600).quality(85).url();
          return (
            <div className="project-img-wrapper relative my-20 h-[50vh] md:video-aspect w-full overflow-hidden rounded-xl">
              <Image
                fill
                alt={value.alt || "Project Visual"}
                src={imageUrl}
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          );
        } catch (error) {
          return null;
        }
      },
    },
    block: {
      h1: ({ children }: any) => (
        <h1 className="mt-24 mb-12 text-5xl md:text-8xl font-medium font-instrumentserif italic tracking-tight text-foreground leading-[0.9]">
          {children}
        </h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="mt-20 mb-10 text-4xl md:text-7xl font-medium font-instrumentserif italic tracking-tight text-foreground leading-[1.0]">
          {children}
        </h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="mt-16 mb-8 text-3xl md:text-5xl font-medium font-notion tracking-notion-heading text-foreground">
          {children}
        </h3>
      ),
      h4:( { children }: any) => (
        <h4 className="mt-12 mb-6 text-2xl md:text-3xl font-medium font-notion tracking-notion-subheading text-foreground">
          {children}
        </h4>
      ),
      normal: ({ children }: any) => (
        <p className="mb-8 text-xl md:text-[22px] leading-[1.6] text-muted-foreground font-medium max-w-4xl">
          {children}
        </p>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="my-16 pl-8 border-l-2 border-notion-blue italic text-2xl md:text-4xl font-instrumentserif text-foreground bg-notion-blue/5 py-12 px-12 rounded-r-xl">
           {children}
        </blockquote>
      )
    },
    list: {
      bullet: ({ children }: any) => <ul className="my-12 space-y-4">{children}</ul>,
      number: ({ children }: any) => <ol className="my-12 space-y-4 list-decimal pl-6">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }: any) => (
        <li className="flex items-start gap-4 text-xl md:text-[22px] text-muted-foreground font-medium">
          <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-notion-blue" />
          {children}
        </li>
      ),
      number: ({ children }: any) => (
        <li className="text-xl md:text-[22px] text-muted-foreground font-medium pl-2">
          {children}
        </li>
      ),
    },
  };

  if (!projectData) return null;

  const heroImageUrl = projectData.projectImage?.url;

  return (
    <main ref={containerRef} className="bg-background font-notion selection:bg-notion-blue/20 selection:text-notion-blue">
      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="hero-image absolute inset-0 z-0 h-[120%] w-full">
          {heroImageUrl ? (
            <Image
              src={`${heroImageUrl}?w=1920&q=75`}
              alt={projectData.title}
              fill
              priority
              className="object-cover opacity-60"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-gray-900 to-black opacity-60" />
          )}
        </div>

        <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-12 lg:p-20">
          <div className="overflow-hidden">
            <h1 className="reveal-up text-7xl font-medium leading-[0.9] tracking-notion-display uppercase text-white">
              {projectData.title}
            </h1>
          </div>

          <div className="reveal-slow mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/20 pt-8">
            <MetaItem label="Client" value={projectData.advancedDescription.client} />
            <MetaItem label="Services" values={projectData.advancedDescription.services} />
            <MetaItem label="Industries" values={projectData.advancedDescription.technologies} />
            <div className="flex items-end justify-end">
               <Link 
                href={projectData.link || "#"} 
                target="_blank" 
                className="group flex items-center gap-2 text-sm uppercase tracking-notion-badge font-medium border-b border-white/20 pb-1 hover:border-notion-blue hover:text-notion-blue transition-colors text-white"
              >
                Visit Site <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 lg:py-40">
        <div className="gap-16">
          {/* Left Sidebar (Sticky Role/Objective) */}
          <aside className="lg:col-span-4">
            <div className=" flex flex-col lg:flex-row items-start  w-full top-32 ">
              <div className="w-full p-4">
                <span className="text-[10px] uppercase tracking-notion-badge text-notion-blue block mb-4 font-medium">+ Objective</span>
                <p className="text-lg text-foreground font-medium">
                  {projectData.description}
                </p>
              </div>
              <div className="w-full p-4">
                <span className="text-[10px] uppercase tracking-notion-badge text-notion-blue block mb-4 font-medium">+ Role</span>
                <p className="text-sm font-medium uppercase tracking-notion-badge text-foreground">{projectData.advancedDescription.role}</p>
              </div>
            </div>
          </aside>

          {/* Right Content (Case Study Text & Images) */}
          <article className="lg:col-span-8">
            <PortableText
              value={projectData.detailedDescription as SanityDocument[]}
              components={components}
            />
          </article>
        </div>
      </section>

      {/* --- FOOTER / NEXT PROJECT --- */}
      <footer className="bg-foreground py-40 text-center text-background uppercase">
        <Link href="/works" className="group flex flex-col items-center">
          <p className="text-xs uppercase tracking-notion-badge font-medium text-notion-blue group-hover:opacity-100 transition-opacity">Next Project</p>
          <h2 className="text-5xl md:text-8xl mt-4 font-medium tracking-notion-display group-hover:text-notion-blue transition-colors">Browse All</h2>
        </Link>
      </footer>
    </main>
  );
}

// Sub-component for clean metadata layout
function MetaItem({ label, value, values }: { label: string; value?: string; values?: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] uppercase tracking-notion-badge text-white/80 font-medium">{label}</span>
      {value && <p className="text-sm font-medium text-white">{value}</p>}
      {values && values.map((v, i) => <p key={i} className="text-sm font-medium text-white">{v}</p>)}
    </div>
  );
}