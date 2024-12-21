import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowUpRight } from "@geist-ui/icons";

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
    <div className="min-h-96 bg-blue-700 p-16 text-white">
      <div className="flex flex-col justify-between md:flex-row">
        <div className="flex min-h-32 w-full flex-col justify-between gap-16 md:w-1/3">
          <div className="relative h-16 w-48">
            <Image
              src={"/DUSHIME Aime.png"}
              alt=""
              className="object-contain"
              fill
            />
          </div>
          <Button
            asChild
            size={"lg"}
            variant={"gooeyRight"}
            className="mb-4 w-fit rounded-full bg-blue-700 from-blue-500"
          >
            <Link href={"contact"}>Let talk</Link>
          </Button>
        </div>
        <div className="flex min-h-32 w-2/3 flex-col justify-end gap-16 md:flex-row">
          <div className="flex min-w-56 flex-col gap-2">
            {links1.map((item, i) => (
              <Button
                key={i}
                variant={"link"}
                className="w-fit text-white"
                asChild
              >
                <Link href={item.href}>{item.title}</Link>
              </Button>
            ))}
          </div>
          <div className="flex min-w-56 flex-col gap-2">
            {links2.map((item, i) => (
              <Button
                key={i}
                variant={"link"}
                className="group w-full justify-between text-white"
                asChild
              >
                <Link href={item.href}>
                  {item.title}
                  <ArrowUpRight className="duration-300 group-hover:rotate-45" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="my-8 tracking-tight opacity-50">
        <span>
          © 2024. All Rights Reserved to Dushime aime. Built with Nextjs and Me{" "}
          <span className="opacity-100">😉</span> in Kigali, Rwanda.
        </span>
      </div>
    </div>
  );
};

export default Footer;
