import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowUpRight } from '@geist-ui/icons'


const Footer = () => {
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
    <div className="min-h-96 bg-black p-16 text-white">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex min-h-32 w-full md:w-1/3 flex-col justify-between gap-16">
          <div className="relative h-16 w-48">
            <Image
              src={"/DUSHIME Aime.png"}
              alt=""
              className="object-contain"
              fill
            />
          </div>
          <Button
            size={"lg"}
            variant={"gooeyRight"}
            className="w-fit rounded-full"
          >
            Let talk
          </Button>
        </div>
        <div className="flex flex-col md:flex-row gap-16 min-h-32 w-2/3 justify-end">
          <div className="flex flex-col min-w-56 gap-2">
            {links1.map((item, i) => (
              <Button key={i} variant={"link"} className="w-fit text-white" asChild>
                <Link href={item.href}>{item.title}</Link>
              </Button>
            ))}
          </div>
          <div  className="flex flex-col min-w-56 gap-2">
          {links2.map((item, i) => (
              <Button key={i} variant={"link"} className="w-full justify-between group text-white" asChild>
                <Link href={item.href}>{item.title}
                <ArrowUpRight className="group-hover:rotate-45 duration-300"/>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="my-8 opacity-50 tracking-tight">
        <span>© 2024. All Rights Reserved to Dushime aime. Built with Nextjs and Me <span className="opacity-100">😉</span> in Kigali, Rwanda.</span>

      </div>
    </div>
  );
};

export default Footer;
