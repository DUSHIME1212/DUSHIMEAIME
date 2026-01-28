"use client";

import React, { useEffect, useState } from "react";
import AnimatedSections from "~/components/animated-sections-1";
import { getAllGalleries } from "~/sanity/schemaTypes/Gallery";

const Page = () => {
  const [galleries, setGalleries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchGalleries() {
      try {
        const res = await getAllGalleries();
        setGalleries(res);
      } catch (error) {
        console.error("Error fetching galleries:", error);
      } finally {
        // Adding a slight delay for a smoother transition from loader to content
        setTimeout(() => setIsLoading(false), 800);
      }
    }
    fetchGalleries();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]">
        <div className="relative h-[1px] w-40 overflow-hidden bg-white/10">
          <div className="animate-loading-bar h-full bg-white"></div>
        </div>
        <span className="mt-4 text-[10px] uppercase tracking-[0.5em] text-white/40">Loading Portfolio</span>
      </div>
    );
  }

  const mappedSections = galleries
    .filter((item) => item.projectGallery?.mainImage?.url && item.projectGallery?.slug)
    .map((item) => ({
      img: item.projectGallery.mainImage.url,
      slug: item.projectGallery.slug,
      title: item.projectGallery.title || "",
      subtitle: item.projectGallery.shortDescription || "",
      tags: item.projectGallery.tags || [],
    }));

  return (
    <main className="h-screen w-screen overflow-hidden">
      <AnimatedSections sections={mappedSections} />
    </main>
  );
};

export default Page;