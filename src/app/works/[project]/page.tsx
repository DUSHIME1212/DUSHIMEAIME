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
        // Check if the asset exists and has the correct structure
        if (!value?.asset?._ref) {
          console.warn("Image asset is missing or has invalid structure:", value);
          return (
            <div className="project-img-wrapper relative my-16 h-[50vh] md:h-[80vh] w-full overflow-hidden rounded-sm bg-neutral-200">
              <div className="flex h-full items-center justify-center">
                <p className="text-neutral-500">Image not available</p>
              </div>
            </div>
          );
        }

        try {
          const imageUrl = urlForImage(value.asset).url();
          
          if (!imageUrl) {
            throw new Error("Could not generate image URL");
          }

          return (
            <div className="project-img-wrapper relative my-16 h-[50vh] md:h-[80vh] w-full overflow-hidden rounded-sm bg-neutral-200">
              <Image
                fill
                alt={value.alt || "Project Visual"}
                src={imageUrl}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          );
        } catch (error) {
          console.error("Error rendering image:", error);
          return (
            <div className="project-img-wrapper relative my-16 h-[50vh] md:h-[80vh] w-full overflow-hidden rounded-sm bg-neutral-200">
              <div className="flex h-full items-center justify-center">
                <p className="text-neutral-500">Failed to load image</p>
              </div>
            </div>
          );
        }
      },
    },
    block: {
      h1: ({ children }: any) => (
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-12">
          {children}
        </h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="mt-20 text-4xl md:text-6xl font-medium tracking-tight mb-8">
          {children}
        </h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="mt-16 text-3xl md:text-4xl font-medium tracking-tight mb-6">
          {children}
        </h3>
      ),
      h4:( { children }: any) => (
        <h4 className="mt-12 text-2xl md:text-3xl font-medium tracking-tight mb-4">
          {children}
        </h4>
      ),
      p: ({ children }: any) => (
        <p className="text-lg md:text-xl leading-relaxed text-neutral-700 mb-6">
          {children}
        </p>
      ),
      normal: ({ children }: any) => (
        <p className="text-xl md:text-2xl leading-relaxed text-neutral-700 mb-6 font-light">
          {children}
        </p>
      ),
      li: ({ children }: any) => (
        <ul className="my-6 ml-6 text-xl md:text-2xl list-disc marker:text-blue-700">
          {children}
        </ul>
      ),
      ul: ({ children }: any) => (
        <li className="mb-2 text-xl md:text-2xl">{children}</li>
      ),
    },
  };

  if (isLoading) return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      <p className="animate-pulse tracking-widest uppercase text-xs">Loading Project...</p>
    </div>
  );

  if (!projectData) return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      <p className="tracking-widest uppercase text-xs">Project not found</p>
    </div>
  );

  // Check for hero image as well
  const heroImageUrl = projectData.projectImage?.url;

  return (
    <main ref={containerRef} className="bg-[#f5f5f3] selection:bg-black selection:text-white">
      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="hero-image absolute inset-0 z-0 h-[120%] w-full">
          {heroImageUrl ? (
            <Image
              src={heroImageUrl}
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
            <h1 className="reveal-up text-7xl font-medium leading-[0.9] tracking-tighter uppercase">
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
                className="group flex items-center gap-2 text-sm uppercase tracking-widest border-b border-white/20 pb-1 hover:border-white transition-colors"
              >
                Visit Site <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Sidebar (Sticky Role/Objective) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-12">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-black block mb-4">+ Objective</span>
                <p className="text-lg text-neutral-600 ">
                  {projectData.description}
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-black block mb-4">+ Role</span>
                <p className="text-sm font-medium uppercase tracking-wider">{projectData.advancedDescription.role}</p>
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
      <footer className="bg-black py-40 text-center text-white">
        <Link href="/work" className="group">
          <p className="text-xs uppercase tracking-[0.3em] opacity-50 group-hover:opacity-100 transition-opacity">Next Project</p>
          <h2 className="text-5xl md:text-8xl font-medium mt-4">Browse All</h2>
        </Link>
      </footer>
    </main>
  );
}

// Sub-component for clean metadata layout
function MetaItem({ label, value, values }: { label: string; value?: string; values?: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] uppercase tracking-widest text-white">{label}</span>
      {value && <p className="text-sm">{value}</p>}
      {values && values.map((v, i) => <p key={i} className="text-sm">{v}</p>)}
    </div>
  );
}