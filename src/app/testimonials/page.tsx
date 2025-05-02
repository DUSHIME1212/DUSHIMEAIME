"use client";

import { Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { cn, testimonials } from "~/lib/utils";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import { cva } from "class-variance-authority";
gsap.registerPlugin(Draggable);

interface PictureFormats {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
}

interface Picture {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    small: PictureFormats;
    thumbnail: PictureFormats;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Testimonial {
  id: number;
  documentId: string;
  Name: string;
  work: string;
  testimonial: string;
  linkedin: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Picture: Picture;
}

async function getTestimonials() {}

const page = () => {
  const [data, setData] = useState<Testimonial[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://portfoliostrapicms.onrender.com/api/testimonials?populate=*",
          { next: { revalidate: 60 } },
        );
        const response = await res.json();
        setData(response.data);
        return response;
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [data]);
  const profileimage =
    "https://media.giphy.com/media/10M8Yr4WKJK63e/giphy.gif?cid=ecf05e47e1sxe98n9urf94glnw7lwws0up8egd7d7mei3c6s&ep=v1_gifs_search&rid=giphy.gif&ct=g";

  return (
    <section className="mb-32">
      {/* topsection */}
      <div className="flex min-h-96 flex-col bg-blue-700 text-white sm:px-8 md:flex-row md:rounded-b-[96px] md:px-16 lg:px-72">
        <div className="flex w-full flex-col justify-center gap-4 md:w-1/2">
          <h3 className="text-4xl">Testimonials</h3>
          <h1 className="text-xl md:text-3xl lg:text-5xl">
            I've had the pleasure of designing many spaces and meeting
            incredible people
          </h1>
          <p>
            I've had the pleasure of working with numerous individuals and
            teams, and I'm grateful for the kind words they've shared about my
            design expertise, leadership abilities, and collaborative approach.
          </p>
        </div>
        <div className="w-full p-0 md:w-1/2 md:p-8">
          <div className="relative min-h-[512px] w-full scale-90 overflow-clip border-4 border-white grayscale md:rounded-[96px]">
            <Image src={profileimage} alt="" className="object-cover" fill />
          </div>
        </div>
      </div>
      <div className="mt-16 min-h-screen -z-0 w-screen px-8 md:px-16 lg:px-32">
        <h2 className="mb-8 text-5xl font-medium">Testimonials</h2>
        <p></p>
        <div className="min-h-[512px] grid grid-cols-1 md:grid-cols-3 bound">
          {data.map((testimonial: Testimonial) => (
            // <Card
            //   key={testimonial.id}
            //   className="min-h-[512px] overflow-hidden rounded-lg bg-white shadow-lg"
            // >
            //   <div className="flex flex-col p-6">
            //       <div className="relative size-32">
            //         <Image
            //         priority
            //           src={testimonial.Picture.url}
            //           alt={testimonial.Name}
            //           fill
            //           className="rounded-full object-cover"
            //         />
            //     </div>
            //     <div className="flex w-full flex-col gap-4 p-0 md:p-8">
            //       <h3 className="text-3xl md:text-5xl font-bold">{testimonial.Name}</h3>
            //       <p className="text-sm text-gray-600">{testimonial.work}</p>
            //       <p className="text-xl text-gray-700">
            //         {testimonial.testimonial}
            //       </p>
            //       <Button asChild variant={"gooeyLeft"} className="w-fit">
            //         <Link href={testimonial.linkedin} className="flex bg-blue-600 from-blue-800 flex-row gap-2">
            //           <Linkedin size={12} />
            //           Linkedin
            //         </Link>
            //       </Button>
            //     </div>
            //   </div>
            // </Card>
            <DragCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;

function DragCard({ testimonial, className }: { testimonial: Testimonial,className?:string }) {
  const [zIndex, setZIndex] = useState(0);
  function handleZIndex() {
    const els = document.querySelectorAll(".draggable");
    let maxIndex = -Infinity;
    els.forEach((el) => {
      const index = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index"),
      );
      if (!isNaN(index) && index > maxIndex) {
        maxIndex = index;
      }
    });
    setZIndex(maxIndex + 1);
  }
  useGSAP(() => {
    Draggable.create(".draggable", {
      type: "x,y",
      edgeResistance: 0.65,
      bounds: document.querySelector(".bound"),
      cursor: "grab",
    });
  })

  return (
    <div
      key={testimonial.id}
      onMouseDown={handleZIndex}
      className={cn("draggable size-fit min-w-96 p-4 overflow-hidden rounded-lg bg-white shadow-lg",className)}
      style={{
        zIndex,
      }}
    >
      <div className="relative min-h-96 w-full">
        <Image src={testimonial.Picture.url} alt="" className="object-cover" fill/>
      </div>
      <h6>{testimonial.Name}</h6>
      <p className="text-sm">{testimonial.testimonial}</p>
    </div>
  );
}
