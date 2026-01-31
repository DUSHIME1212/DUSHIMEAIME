import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowUpRight, Github } from "@geist-ui/icons";
import { BlurFade } from "./magicui/blur-fade";
import { Dribbble, Figma } from "lucide-react";
import { RiBehanceLine, RiDribbbleLine, RiFigmaLine, RiGithubLine, RiHeartFill, RiInstagramLine } from "@remixicon/react";

const Footer = () => {
  const BLUR_FADE_DELAY = 0.04;
  const links1 = [
    { title: "Home", href: "/" },
    { title: "Work", href: "/" },
    { title: "About", href: "/" },
    { title: "Contact", href: "/" },
  ];
  const links2 = [
    { title: "Blog", href: "/" },
    { title: "Book with me", href: "/" },
    { title: "Linkdein", href: "/" },
    { title: "Dribble", href: "/" },
  ];
  return (
    // <div className="min-h-96 bg-sky-700 p-16 md:px-36 lg:px-72 text-white">
    //   <div className="flex flex-col justify-between md:flex-row">
    //     <div className="flex min-h-32 w-full flex-col justify-between gap-16 md:w-1/3">
    //       <div className="relative h-16 w-48">
    //         <Image
    //           src={"/DUSHIME Aime.png"}
    //           alt=""
    //           className="object-contain"
    //           fill
    //         />
    //       </div>
    //       <Button
    //         asChild
    //         size={"lg"}
    //         variant={"gooeyRight"}
    //         className="mb-4 w-fit rounded-full bg-yellow-700 from-yellow-500"
    //       >
    //         <Link href={"contact"}>Let talk</Link>
    //       </Button>
    //     </div>
    //     <div className="flex min-h-32 w-2/3 flex-col justify-end gap-16 md:flex-row">
    //       <div className="flex min-w-56 flex-col gap-2">
    //         {links1.map((item, i) => (
    //           <Button
    //             key={i}
    //             variant={"link"}
    //             className="w-fit text-white"
    //             asChild
    //           >
    //             <Link href={item.href}>{item.title}</Link>
    //           </Button>
    //         ))}
    //       </div>
    //       <div className="flex min-w-56 flex-col gap-2">
    //         {links2.map((item, i) => (
    //           <Button
    //             key={i}
    //             variant={"link"}
    //             className="group w-full justify-between text-white"
    //             asChild
    //           >
    //             <Link href={item.href}>
    //               {item.title}
    //               <ArrowUpRight className="duration-300 group-hover:rotate-45" />
    //             </Link>
    //           </Button>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    //   <div className="my-8 tracking-tight opacity-50">
    //     <span>
    //       © 2024. All Rights Reserved to Dushime aime. Built with Nextjs and Me{" "}
    //       <span className="opacity-100">😉</span> in Kigali, Rwanda.
    //     </span>
    //   </div>
    // </div>
<footer className="bg-background border-t border-muted py-8 w-full">
  <div className=" mx-auto px-8 md:px-36 ">
    <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:justify-between">
      {/* Social Links */}
      <div className="flex gap-6">
        <a
          href="https://github.com/DUSHIME1212"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          aria-label="GitHub Profile"
        >
          <RiGithubLine/>
        </a>
        <a
          href="https://dribbble.com/DMATT250__"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          aria-label="Dribbble Profile"
        >
          <RiDribbbleLine/>
        </a>
        <a
          href="https://behance.net/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          aria-label="Behance Profile"
        >
          <RiBehanceLine/>
        </a>
        <a
          href="https://www.figma.com/@deejaymatttunez"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          aria-label="Figma Profile"
        >
          <RiFigmaLine/>
        </a>
        <a
          href="https://www.instagram.com/__matt360/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          aria-label="Figma Profile"
        >
          <RiInstagramLine/>
        </a>
      </div>
      {/* Copyright */}
      <p className="text-muted-foreground text-sm">
        &copy; {new Date().getFullYear()} DUshime Aime. All rights reserved.
      </p>
    </div>
  </div>
</footer>
  );
};

export default Footer;
