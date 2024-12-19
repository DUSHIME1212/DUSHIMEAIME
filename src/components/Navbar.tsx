"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { links } from "~/lib/utils";
import { usePathname } from "next/navigation";
import { AlignJustify, X } from "lucide-react";
import { motion } from "motion/react";
import { FlipLink } from "./ui/FlipLink";


const Navbar = () => {
  const [open, isopen] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={`flex flex-row items-center justify-between ${pathname === "/testimonials" && "!bg-blue-700 !text-white"} px-8 py-4 md:px-16 lg:px-32`}
    >
      <div className="relative h-12 w-32">
        <Image
          src={
            pathname === "/testimonials"
              ? "/DUSHIME Aime.png"
              : "/DUSHIlogopng.png"
          }
          className="object-contain"
          alt=""
          fill
        />
      </div>
      <button onClick={() => isopen(!open)} className="md:hidden">
        {!open ? <AlignJustify /> : <X />}
      </button>
      <div
            className={`flex flex-col md:flex-row ${
              !open ? "hidden md:flex" : "flex"
            } ${
              pathname === "/testimonials" ? "bg-blue-700 text-white" : "bg-white"
            } left-0 top-20 z-50 w-full gap-4 p-4 md:static md:w-auto md:p-0 absolute`}
          >
            {links.map((it, i) => (
              <FlipLink
                key={i}
                href={it.href}
                className={pathname === "/testimonials" ? "text-white" : ""}
              >
                {it.title}
              </FlipLink>
            ))}
          </div>
    </div>
  );
};

export default Navbar;
