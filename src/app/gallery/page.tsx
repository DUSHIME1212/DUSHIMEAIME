"use client";

import React, { useEffect } from "react";
import AnimatedSections from "~/components/animated-sections-1";
import { getAllGalleries } from "~/sanity/schemaTypes/Gallery";

const Page = () => {
  const [galleries, setGalleries] = React.useState<any[]>([]);
  
  useEffect(() => {
    async function fetchGalleries() {
      try {
        const res = await getAllGalleries();
        console.log("Fetched galleries:", res);
        setGalleries(res);
      } catch (error) {
        console.error("Error fetching galleries:", error);
      }
    }

    fetchGalleries();
  }, []);

  // Check if there's data and log the structure
  useEffect(() => {
    if (galleries.length > 0) {
      console.log("First gallery structure:", galleries[0]);
      console.log("First gallery mainImage:", galleries[0].projectGallery.mainImage?.url);
    }
  }, [galleries]);

  return (
    <div className="h-screen w-screen">
      <AnimatedSections
        className="h-screen relative w-screen"
        sections={galleries
          .filter((item) => 
            item.projectGallery?.mainImage?.url && 
            item.projectGallery?.slug
          )
          .map((item) => ({
            text: item.projectGallery.title || item.projectGallery.shortDescription || "",
            img: item.projectGallery.mainImage.url, // Changed from mainImage?.asset.url
            slug: item.projectGallery.slug,
            title: item.projectGallery.title || "", 
            tags: item.projectGallery.tags || [], 
          }))}
      />
    </div>
  );
};

export default Page;