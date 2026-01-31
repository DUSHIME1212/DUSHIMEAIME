"use client";

import { getGalleryBySlug, GalleryProject } from "~/sanity/schemaTypes/Gallery";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Expand, Loader2 } from "lucide-react";
import { BlurFade } from "~/components/magicui/blur-fade";
import { useEffect, useState } from "react";

export default function GalleryPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<GalleryProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getGalleryBySlug(slug as string);
        setProject(data);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchData();
  }, [slug]);

  // 1. Loading State (Senior UX: Use a centered, minimal loader)
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#fafafa]">
        <Loader2 className="animate-spin text-yellow-600" size={32} />
      </div>
    );
  }

  // 2. 404 State
  if (!project) {
    return (
      <div className="flex h-screen flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Link href="/gallery" className="text-yellow-600 underline">Return to Gallery</Link>
      </div>
    );
  }

  // Destructure for cleaner access
  const { title, shortDescription, tags, mainImage, gallery: images } = project.projectGallery;

  return (
    <main className="min-h-screen bg-[#fafafa] font-dmsans selection:bg-yellow-100 selection:text-yellow-700">
      
      {/* 1. IMMERSIVE HERO */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 z-10 bg-black/30" />
        <Image
          src={mainImage?.url || ""}
          alt={title || "Gallery project image"}
          fill
          className="object-cover transition-transform duration-[3s] hover:scale-110"
          priority
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-20 bg-gradient-to-t from-neutral-900 via-transparent to-transparent">
          <BlurFade delay={0.2} direction="up">
            <Link href="/gallery" className="mb-8 inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" /> 
              <span className="text-sm font-medium uppercase tracking-widest">Explore All Projects</span>
            </Link>
            <h1 className="text-6xl md:text-[10vw] font-bold tracking-tighter text-white uppercase leading-[0.8]">
              {title}
            </h1>
          </BlurFade>
        </div>
      </section>

      {/* 2. CONTENT GRID */}
      <section className="px-6 py-24 md:px-20 lg:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* STICKY INFO PANEL */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-12">
            <div className="space-y-6">
              <div className="h-px w-12 bg-yellow-600" />
              <p className="text-2xl leading-relaxed text-neutral-800 font-medium">
                {shortDescription}
              </p>
            </div>

            <div className="space-y-4">
               <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">Disciplines</p>
               <div className="flex flex-wrap gap-2">
                {tags?.map((tag) => (
                    <span key={tag} className="px-4 py-1.5 rounded-full border border-neutral-200 text-[10px] uppercase tracking-widest text-neutral-600 bg-white shadow-sm">
                    {tag}
                    </span>
                ))}
               </div>
            </div>

            <div className="pt-10 border-t border-neutral-200 flex flex-col gap-4">
               <button className="flex w-full items-center justify-between rounded-full bg-neutral-900 px-8 py-4 text-white transition-all hover:bg-yellow-700">
                  <span className="text-sm font-bold uppercase tracking-widest">Share Project</span>
                  <Expand size={18} />
               </button>
            </div>
          </aside>

          {/* DYNAMIC IMAGE MASONRY */}
          <div className="lg:col-span-8 space-y-16">
            {images && images.length > 0 ? (
              images.map((image, index) => (
                <BlurFade key={image._key || index} delay={0.1 * index} inView>
                  <figure className="group relative overflow-hidden rounded-2xl bg-neutral-200">
                    <Image
                      src={image.url || ""}
                      alt={image.alt || `Gallery image ${index + 1}`}
                      width={image.dimensions?.width || 1200}
                      height={image.dimensions?.height || 800}
                      className="w-full object-cover transition-all duration-700 group-hover:scale-[1.03]"
                    />
                    {image.alt && (
                      <figcaption className="absolute bottom-6 left-6 rounded-lg bg-white/80 px-4 py-2 text-xs font-medium backdrop-blur-md opacity-0 transition-opacity group-hover:opacity-100">
                        {image.alt}
                      </figcaption>
                    )}
                  </figure>
                </BlurFade>
              ))
            ) : (
              <p className="text-neutral-400 italic">No additional images in this gallery.</p>
            )}
          </div>
        </div>
      </section>

      {/* 3. NEXT PROJECT FOOTER (The Bridge) */}
      <footer className="bg-neutral-900 py-40 text-center relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
         
         <Link href="/gallery" className="group relative z-10 inline-flex flex-col items-center">
            <span className="mb-4 text-yellow-400 text-[10px] uppercase tracking-[0.8em]">Next Project</span>
            <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter transition-all duration-700 group-hover:italic group-hover:tracking-normal">
                VIEW MORE <ArrowRight className="inline-block ml-4 transition-transform group-hover:translate-x-6" size={48} />
            </h2>
         </Link>
      </footer>
    </main>
  );
}