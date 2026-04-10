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
    return null
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
    <main className="min-h-screen bg-background font-notion selection:bg-notion-blue/20 selection:text-notion-blue">
      
      {/* 1. IMMERSIVE HERO */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-muted">
        <div className="absolute inset-0 z-10 bg-black/40" />
        <Image
          src={mainImage?.url ? `${mainImage.url}?w=2040&q=75` : ""}
          alt={title || "Gallery project image"}
          fill
          className="object-cover transition-transform duration-3000 hover:scale-110"
          priority
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-20 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          <BlurFade delay={0.2} direction="up">
            <Link href="/gallery" className="mb-8 inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors group">
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" /> 
              <span className="text-sm font-medium uppercase tracking-notion-badge">Explore All Projects</span>
            </Link>
            <h1 className="text-6xl md:text-[10vw] font-medium tracking-notion-display text-white uppercase leading-[0.8]">
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
              <div className="h-px w-12 bg-notion-blue" />
              <p className="text-2xl leading-relaxed text-foreground font-medium">
                {shortDescription}
              </p>
            </div>

            <div className="space-y-4">
               <p className="text-[10px] uppercase tracking-notion-badge text-muted-foreground font-semibold">Disciplines</p>
               <div className="flex flex-wrap gap-2">
                {tags?.map((tag) => (
                    <span key={tag} className="px-4 py-1.5 rounded-pill border whisper-border text-[10px] uppercase tracking-notion-badge text-muted-foreground bg-notion-warm-white/50 dark:bg-notion-warm-dark/50 shadow-sm">
                    {tag}
                    </span>
                ))}
               </div>
            </div>

            <div className="pt-10 border-t  flex flex-col gap-4">
               <button className="flex w-full items-center justify-between rounded-pill bg-foreground px-8 py-4 text-background transition-all hover:bg-notion-blue">
                  <span className="text-sm font-medium uppercase tracking-notion-badge">Share Project</span>
                  <Expand size={18} />
               </button>
            </div>
          </aside>

          {/* DYNAMIC IMAGE MASONRY */}
          <div className="lg:col-span-8 space-y-16">
            {images && images.length > 0 ? (
              images.map((image, index) => (
                <BlurFade key={image._key || index} delay={0.1 * index} inView>
                  <figure className="group relative overflow-hidden rounded-lg bg-muted whisper-border notion-shadow transition-all duration-700 hover:notion-shadow-deep">
                    <Image
                      src={image.url ? `${image.url}?w=1600&q=75` : ""}
                      alt={image.alt || `Gallery image ${index + 1}`}
                      width={1600}
                      height={1000}
                      className="w-full object-cover grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]"
                    />
                    {image.alt && (
                      <figcaption className="absolute bottom-6 left-6 rounded-lg bg-white/90 dark:bg-notion-warm-dark/90 px-4 py-2 text-xs font-medium backdrop-blur-md opacity-0 transition-opacity group-hover:opacity-100 border whisper-border text-foreground">
                        {image.alt}
                      </figcaption>
                    )}
                  </figure>
                </BlurFade>
              ))
            ) : (
              <p className="text-muted-foreground italic font-medium">No additional images in this gallery.</p>
            )}
          </div>
        </div>
      </section>

      {/* 3. NEXT PROJECT FOOTER (The Bridge) */}
      <footer className="bg-foreground py-40 text-center relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
         
         <Link href="/gallery" className="group relative z-10 inline-flex flex-col items-center">
            <span className="mb-4 text-notion-blue text-[10px] uppercase tracking-notion-badge font-medium">Next Project</span>
            <h2 className="text-5xl md:text-8xl font-medium text-background tracking-notion-display transition-all duration-700 hover:text-notion-blue">
                VIEW MORE <ArrowRight className="inline-block ml-4 transition-transform group-hover:translate-x-6" size={48} />
            </h2>
         </Link>
      </footer>
    </main>
  );
}