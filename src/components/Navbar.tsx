"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { links } from "~/lib/utils";
import { usePathname } from "next/navigation";
import { AlignJustify, X } from "lucide-react";

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
        className={`flex ${!open ? "hidden w-fit z-50" : "block py-12 w-full"} ${pathname === "/testimonials" && "!bg-blue-700"} bg-white top-20 gap-2 md:block z-50 left-0 max-md:absolute max-md:flex-col ${pathname === "/testimonials" && "text-white"}`}
      >
        {links.map((it, i) => (
          <Button
            key={i}
            asChild
            className="h-fit w-fit rounded-none"
            variant={"link"}
          >
            <Link
              href={it.href}
              className={`flex gap-2 ${pathname === "/testimonials" && "text-white"}`}
            >
              {it.title}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
