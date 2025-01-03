import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react";

interface Projects {
  id: string;
}

const Works = async () => {
  const res = (await fetch("https://portfoliostrapicms.onrender.com/api/projects?populate=*",{next:{revalidate:3660}}));
  const data = await res.json();
  const projects = data.data;
  // console.log(projects);
  
  return (
    <div className="py-0 md:py-8">
      <div className="flex flex-col justify-between items-center md:flex-row">
        <h1 className="w-full text-sky-700 my-8 text-3xl md:text-5xl md:w-1/3">what I&apos;ve been up to lately</h1>
        <p className="w-full md:w-1/3 opacity-70 text-3xl">Bridging the gap between beautiful and bottom-line results.</p>
      </div>
      <div className="mt-8 grid max-md:grid-cols-1 grid-cols-2 content-center gap-4">
        {projects?.slice(0,4).map((item,i) => 
          <div
            key={i}
            className="bg- rounded-lg md:p-4 relative group min-h-[512px] md:border-2 flex flex-col justify-between border-black/10 md:shadow-2xl"
          >
            <div className="relative mb-8 h-96 w-full overflow-clip rounded-xl">
              <Image
                src={item.bannerimage[0].formats.medium.url}
                className="object-cover duration-500 group-hover:scale-125"
                alt=""
                fill
                priority
              />
            </div>
            <h3 className="text-3xl font-normal line-clamp-2 w-2/3 mb-2">{item.title}</h3>
            <Button asChild className="w-full absolute bottom-4 right-4 size-fit p-4 bg-sky-700/10 rounded-2xl mt-4  gap-2 text-base" size={"lg"} variant="outline">
              <Link href={"works/"+item.slug} className=" text-black">
              View Case Study
              <ArrowRight/>
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Works;
