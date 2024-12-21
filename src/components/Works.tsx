import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "motion/react"

interface Projects {
  id: string;
}

const Works = async () => {
  const res = (await fetch("https://portfoliostrapicms.onrender.com/api/projects?populate=*",{next:{revalidate:60}}));
  const data = await res.json();
  const projects = data.data;
  return (
    <div className="py-0 md:py-8">
      <div className="grid md:grid-cols-3 max-md:grid-rows-2 gap-32 items-center content-center">
        <h1 className="col-span-2">what I&apos;ve been up to lately</h1>
        <p className="col-span-1 w-full md:w-2/3 opacity-70 text-3xl">Bridging the gap between beautiful and bottom-line results.</p>
      </div>
      <div className="mt-8 grid max-md:grid-cols-1 grid-cols-2 content-center gap-4">
        {projects?.slice(0,4).map((item,i) => 
          <div
            key={i}
            className="bg- rounded-lg md:p-4 group min-h-[512px] md:border-2 border-black/10 md:shadow-2xl"
          >
            <div className="relative mb-8 h-96 w-full overflow-clip rounded-xl">
              <Image
                src={item.bannerimage[0].url}
                className="object-cover duration-500 group-hover:scale-125"
                alt=""
                fill
                priority
              />
            </div>
            <h3 className="text-3xl font-normal line-clamp-1 w-2/3 mb-2">{item.title}</h3>
            <Button asChild className="w-full bg-blue-700 mt-4 text-xl" size={"lg"} variant="gooeyRight">
              <Link href={"works/"+item.slug} className="text-3xl">Case study</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Works;
