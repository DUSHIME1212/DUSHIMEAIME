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
    <section className="mb-32 font-notion bg-background">
      {/* topsection */}
      <div className="flex min-h-96 flex-col bg-foreground text-background sm:px-8 md:flex-row md:rounded-b-[64px] md:px-16 lg:px-72">
        <div className="flex w-full flex-col justify-center gap-6 md:w-1/2 py-20 px-8">
          <h3 className="text-[12px] font-medium uppercase tracking-notion-badge text-notion-blue">+ Testimonials</h3>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-notion-display leading-[1.1]">
            I've had the pleasure of designing many spaces and meeting
            incredible people
          </h1>
          <p className="text-lg text-background font-medium leading-relaxed">
            I've had the pleasure of working with numerous individuals and
            teams, and I'm grateful for the kind words they've shared about my
            design expertise, leadership abilities, and collaborative approach.
          </p>
        </div>
        <div className="w-full p-0 md:w-1/2 md:p-8 flex items-center justify-center">
          <div className="relative h-[400px] w-full max-w-[400px] overflow-hidden rounded-lg border whisper-border grayscale notion-shadow-deep">
            <Image src={profileimage} alt="" className="object-cover" fill />
          </div>
        </div>
      </div>
      
      <div className="mt-24 min-h-screen -z-0 w-full px-8 md:px-16 lg:px-32">
        <div className="mb-12">
            <h2 className="text-[40px] font-medium tracking-notion-heading text-foreground">Kind words from <span className="text-notion-blue">incredible collaborators</span></h2>
        </div>
        
        <div className="min-h-[600px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bound gap-8">
          {data.map((testimonial: Testimonial) => (
            <DragCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;

function DragCard({ testimonial, className }: { testimonial: Testimonial, className?: string }) {
  const [zIndex, setZIndex] = useState(0);

  function handleZIndex() {
    const els = document.querySelectorAll(".draggable");
    let maxIndex = -Infinity;
    els.forEach((el) => {
      const index = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index") || "0",
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
  });

  return (
    <div
      key={testimonial.id}
      onMouseDown={handleZIndex}
      className={cn(
        "draggable group size-fit min-w-[340px] max-w-[400px] p-6 overflow-hidden rounded-lg bg-card whisper-border notion-shadow transition-all duration-300 hover:notion-shadow-deep",
        className
      )}
      style={{ zIndex }}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-muted mb-6">
        <Image 
          src={testimonial.Picture.url} 
          alt={testimonial.Name} 
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
          fill
        />
      </div>
      <div className="space-y-4">
          <div>
            <h6 className="text-[18px] font-medium tracking-notion-body-large text-foreground leading-tight">{testimonial.Name}</h6>
            <p className="text-[12px] font-medium uppercase tracking-notion-badge text-notion-blue mt-1">{testimonial.work}</p>
          </div>
          <p className="text-[15px] text-muted-foreground font-medium italic leading-relaxed">
            "{testimonial.testimonial}"
          </p>
          <div className="pt-4 border-t whisper-border">
              <Link href={testimonial.linkedin} target="_blank" className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-notion-badge text-foreground hover:text-notion-blue transition-colors">
                  <Linkedin size={14} />
                  View on LinkedIn
              </Link>
          </div>
      </div>
    </div>
  );
}
