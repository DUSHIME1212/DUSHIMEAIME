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
  const [opening, isopening] = useState(false);
  const pathname = usePathname();

  function closeMenu() {
    if (window.innerWidth < 768) {  
      isopen(false);
    }
  }

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
        {!open ? <AlignJustify size={48} /> : <X size={48} />}
      </button>
      <div
            className={`flex px-8 flex-col justify-center md:flex-row ${
              !open ? "hidden md:flex" : "flex"
            } ${
              pathname === "/testimonials" ? "bg-blue-700 text-white" : "bg-white"
            } left-0 top-20 z-30 w-full gap-4 p-4 md:static md:w-auto text-5xl md:p-0 h-full duration-700 absolute`}
          >
            {links.map((it, i) => (
              <FlipLink
                key={i}
                href={it.href}
                className={pathname === "/testimonials" ? "text-white" : ""}
              >
                <span onClick={closeMenu}>{it.title}</span>
              </FlipLink>
            ))}
          </div>
    </div>
  );
};

export default Navbar;
