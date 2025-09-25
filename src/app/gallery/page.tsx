"use client";

import React, { useEffect } from "react";
import AnimatedSections from "~/components/animated-sections-1";
import { GalleryProject, getAllGalleries } from "~/lib/sanity/Gallery";

const page = () => {
  const [Gallery, SetGallery] = React.useState<GalleryProject[]>([]);
  
  useEffect(() => {
    async function getGalleries() {
      const res = await getAllGalleries();
      console.log("Raw gallery response:", res); // Check the actual structure
      SetGallery(res);
    }

    getGalleries();
  }, []);

  return (
    <div className="h-screen w-screen">
      <AnimatedSections
        className="h-screen w-screen"
        sections={Gallery.filter(
          (item) => item.projectGallery.mainImage?.url
        ).map((item) => ({
          text: item.projectGallery.shortDescription || "",
          img: item.projectGallery.mainImage?.url || "", 
          slug: item.projectGallery.slug || "",
        }))}
      />
    </div>
  );
};

export default page;