import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Eye, Github } from "lucide-react";
import { Safari } from "./Safari";
import { projects } from "~/lib/projects";
import { TextAnimate } from "./magicui/text-animate";
import { SmoothCursor } from "./ui/smooth-cursor";

interface Projects {
  id: string;
}

const Works = async () => {
  const res = await fetch(
    "https://portfoliostrapicms.onrender.com/api/projects?populate=*",
    { next: { revalidate: 3660 } },
  );
  const data = await res.json();
  // const projects = data.data;
  // console.log(projects);

  return (
    <div className="py-0 md:py-8">
      <div className="flex my-8 gap-4 flex-col ">
        <TextAnimate className=" w-full text-3xl font-bold capitalize text-sky-700 md:w-2/3 md:text-5xl">
          what I have been up to lately
        </TextAnimate>
        <TextAnimate delay={0.4} className="w-full mt-8 text-3xl opacity-70 md:w-2/3">
          Bridging the gap between beautiful and bottom-line results.
        </TextAnimate>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        {projects?.map((item, i) => (
          <div
            key={i}
            className="group relative min-h-96 space-y-4 flex flex-col justify-between items-start"
          >
            <Safari
              imageSrc={item.image}
              className="size-full  object-cover duration-500"
            />
            <div className="my-4">
            <TextAnimate className="text-3xl uppercase font-bold min-h-12 size-fit">{item.title}</TextAnimate>
            <TextAnimate className="line-clamp-2 tracking-tight" delay={0.4}>{item.description}</TextAnimate>
            <div className="mt-4 inline-flex gap-4">
              {
                item.githublink && 
                <Button>
                  <Github />
                  View codes
                </Button>
              }
              <Button asChild variant="outline" className="gap-2">
                <Link href={`${item.link}`}>
                <Eye/>
                View demo
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href={`/works/${item.id}`}>Case study</Link>
              </Button>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;
