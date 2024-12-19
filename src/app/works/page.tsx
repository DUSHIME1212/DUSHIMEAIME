import { ArrowUpRight } from "@geist-ui/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SplitType from "split-type";
import { Button } from "~/components/ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactMarkdown from "react-markdown";
import axios from "axios";
gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  created: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  link: string;
  githuburl: string;
  bannerimage?: BannerImage[];
}

interface BannerImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: ImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: ProviderMetadata;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ImageFormats {
  large: ImageFormat;
  small: ImageFormat;
  medium: ImageFormat;
  thumbnail: ImageFormat;
}

interface ImageFormat {
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
  provider_metadata: ProviderMetadata;
}

interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

const page = async () => {
  const project = {
    title: "Project Title",
    description:
      "Enhanced the discoverability of AI capabilities within Adobe Experience Platform, making it easier for users to understand and utilize the full potential of the AI assistant, ultimately driving greater efficiency and innovation for leading brands like Coca-Cola, Hilton, BMW, and ServiceNow.",
    img: "https://cdn.dribbble.com/userupload/17615473/file/original-ee26568cc4e76795a16f70aed8ab3320.png?resize=1200x900&vertical=center",
    link: "https://www.adobe.com/experience-platform/ai.html",
    category: "AI Assistant, Discoverability",
  };

  const res = await fetch("https://portfoliostrapicms.onrender.com/api/projects?populate=*");
  const data = await res.json();
  const projects = data.data;
  

  return (
    <div className="p-8 md:px-16 lg:px-32">
      <div className="flex flex-col gap-2">
        <h1 className="text-blue-700">Work</h1>
        <h3 className="font-indie">Product Design</h3>
        <h6 className="target1 w-2/3 min-w-96 font-normal tracking-normal">
          I'm humbled to have had the opportunity to contribute to impactful projects at companies like Meta, Google, Smoothie King, bru technologies, and Adobe, where my distinctive approach has been widely acclaimed.
        </h6>
      </div>
      <div className="mt-8 grid grid-cols-1 relative gap-4">
        {projects.slice(0,4).map((item:Project) => (
          <div
            key={item.id}
            className="group flex min-h-[512px] sticky top-12 flex-col gap-2 rounded-3xl duration-500 bg-white hover:bg-blue-100 md:flex-row"
          >
            <div className="relative z-0 h-[512px] w-full group-hover:skew-x-3 scale-90 overflow-clip rounded-xl duration-500 max-md:scale-100 max-md:shadow-none md:w-1/2 group-hover:md:shadow-[0px_52px_92px_#3300FFA0]">
              <Image
                src={`${item.bannerimage[0].url}`}
                alt=""
                className="scale-125 object-cover duration-500 group-hover:scale-100"
                fill
              />
            </div>
            <div className="flex w-full flex-col justify-center gap-4 md:p-4 lg:px-16 max-md:px-0 md:w-1/2">
              <h2>
                {item.title}
              </h2>
              <h5 className="font-indie italic duration-500 group-hover:text-blue-700">
                {project.category}
              </h5>
              <ReactMarkdown className="target1">
                {project.description}
                
              </ReactMarkdown>
              <div className="grid grid-cols-2 gap-8 pr-16">
                <Button
                  variant={"gooeyLeft"}
                  size={"lg"}
                  className="group gap-4 py-6 rounded-full from-blue-300 group-hover:bg-blue-800"
                  asChild
                >
                  <Link href={`/works/${item.slug}`} className="flex items-center gap-2">
                    Case study
                    <ArrowUpRight className="duration-300 group-hover:rotate-45" />
                  </Link>
                </Button>
                <Button
                  variant={"ghost"}
                  size={"lg"}
                  className="group-hover:bg-black-800 py-6 group gap-4 rounded-full from-blue-300"
                  asChild
                >
                  <Link href={item.link}>View project</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects?.slice(4,8).map((item, i) => (
          <div
            key={i}
            className="flex min-h-96 flex-col items-start gap-2 md:flex-row"
          >
            <div className="relative h-56 w-full overflow-clip rounded-xl md:w-1/2">
              <Image src={project.img} alt="" className="object-cover" priority fill />
            </div>
            <div className="flex w-full flex-col justify-start gap-4 p-0 md:p-4 md:w-1/2">
              <h2 className="">{item.title}</h2>
              <p className="leading-6">
                I worked on the Monetization Payments team at Meta, specifically
                optimizing for a brand new WhatsApp Fintech experience. I built
                robust interactive prototypes, met with and presented to key
                stakeholders like Will Cathcart, Alicia Dougherty, and Mark
                Zuckerberg.
              </p>
              <Button
                variant={"outline"}
                size={"lg"}
                className="group w-fit gap-4 rounded-full"
              >
                Case study
                <ArrowUpRight className="duration-700 group-hover:rotate-45" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between p-8">
        <div className="flex flex-col gap-2">
          <h2>My process at its core</h2>
          <p>
            I design products that put people first, blending beautiful
            interfaces with functionality.
          </p>
        </div>
        <Button
          variant={"outline"}
          className="rounded-full border-2 border-black"
          asChild
        >
          <Link href={""} className="flex flex-row items-center gap-4">
            About
            <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default page;

