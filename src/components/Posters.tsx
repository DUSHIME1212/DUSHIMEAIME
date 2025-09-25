"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";

import Floating, { FloatingElement } from "~/components/ui/parallax-floating";
import { Button } from "./ui/button";

const exampleImages = [
  {
    url: "https://images.unsplash.com/photo-1727341554370-80e0fe9ad082?q=80&w=2276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Branislav Rodman",
    link: "https://unsplash.com/photos/a-black-and-white-photo-of-a-woman-brushing-her-teeth-r1SjnJL5tf0",
    title: "A Black and White Photo of a Woman Brushing Her Teeth",
  },
  {
    url: "https://images.unsplash.com/photo-1640680608781-2e4199dd1579?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-painting-of-a-palm-leaf-on-a-multicolored-background-AaNPwrSNOFE",
    title: "Neon Palm",
    author: "Tim Mossholder",
  },
  {
    url: "https://images.unsplash.com/photo-1726083085160-feeb4e1e5b00?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-blurry-photo-of-a-crowd-of-people-UgbxzloNGsc",
    author: "ANDRII SOLOK",
    title: "A blurry photo of a crowd of people",
  },
  {
    url: "https://images.unsplash.com/photo-1562016600-ece13e8ba570?q=80&w=2838&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/rippling-crystal-blue-water-9-OCsKoyQlk",
    author: "Wesley Tingey",
    title: "Rippling Crystal Blue Water",
  },
  {
    url: "https://images.unsplash.com/photo-1624344965199-ed40391d20f2?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/de/fotos/mann-im-schwarzen-hemd-unter-blauem-himmel-m8RDNiuEXro",
    author: "Serhii Tyaglovsky",
    title: "Mann im schwarzen Hemd unter blauem Himmel",
  },
  {
    url: "https://images.unsplash.com/photo-1689553079282-45df1b35741b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-woman-with-a-flower-crown-on-her-head-0S3muIttbsY",
    author: "Vladimir Yelizarov",
    title: "A women with a flower crown on her head",
  },
  {
    url: "https://images.unsplash.com/photo-1721968317938-cf8c60fccd1a?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "A blurry photo of white flowers in a field",
    author: "Eugene Golovesov",
    link: "https://unsplash.com/photos/a-blurry-photo-of-white-flowers-in-a-field-6qbx0lzGPyc",
  },
  {
    url: "https://images.unsplash.com/photo-1677338354108-223e807fb1bd?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Mathilde Langevin",
    link: "https://unsplash.com/photos/a-table-topped-with-two-wine-glasses-and-plates-Ig0gRAHspV0",
    title: "A table topped with two wine glasses and plates",
  },
];

const Posters = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "img",
      { opacity: [0, 1] },
      { duration: 0.5, delay: stagger(0.15) },
    );
  }, []);

  return (
    <div
      className="relative flex h-full min-h-[600px] w-full items-center justify-center "
      ref={scope}
    >
      <motion.div
        className="z-50 flex flex-col items-center space-y-4 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88, delay: 1.5 }}
      >
        <p className=" z-50 text-5xl italic t md:text-7xl">
          Posters.
        </p>
        <Button>View Gallery</Button>
      </motion.div>

      <Floating sensitivity={-1} className="overflow-hidden">
        <FloatingElement depth={0.5} className="left-[11%] top-[8%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[0].url}
            className="h-16 w-16 cursor-pointer object-cover transition-transform duration-200 hover:scale-105 md:h-24 md:w-24"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="left-[32%] top-[10%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[1].url}
            className="h-20 w-20 cursor-pointer object-cover transition-transform duration-200 hover:scale-105 md:h-28 md:w-28"
          />
        </FloatingElement>
        <FloatingElement depth={2} className="left-[53%] top-[2%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[2].url}
            className="h-40 w-28 cursor-pointer object-cover transition-transform duration-200 hover:scale-105 md:h-52 md:w-40"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="left-[83%] top-[0%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[3].url}
            className="h-24 w-24 cursor-pointer object-cover transition-transform duration-200 hover:scale-105 md:h-32 md:w-32"
          />
        </FloatingElement>

        <FloatingElement depth={1} className="left-[2%] top-[40%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[4].url}
            className="h-28 w-28 cursor-pointer object-cover transition-transform duration-200 hover:scale-105 md:h-36 md:w-36"
          />
        </FloatingElement>
        <FloatingElement depth={2} className="left-[77%] top-[70%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[7].url}
            className="h-28 w-28 cursor-pointer object-cover transition-transform duration-200 hover:scale-105 md:h-48 md:w-36"
          />
        </FloatingElement>

        <FloatingElement depth={4} className="left-[15%] top-[73%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[5].url}
            className="h-full w-40 cursor-pointer object-cover transition-transform duration-200 hover:scale-105 md:w-52"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="left-[50%] top-[80%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[6].url}
            className="h-24 w-24 cursor-pointer object-cover transition-transform duration-200 hover:scale-105 md:h-32 md:w-32"
          />
        </FloatingElement>
      </Floating>
    </div>
  );
};

export default Posters;
