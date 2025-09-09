"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { links } from "~/lib/utils";
import { usePathname } from "next/navigation";
import { AlignJustify, X } from "lucide-react";
import { motion } from "motion/react";
import { FlipLink } from "./ui/FlipLink";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  function closeMenu() {
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  }

  useGSAP(() => {
    gsap.from(".links", {
      opacity: 0,
      x: "-100px",
      duration: 1,
      ease: "power2.inOut",
      filter: "blur(10px)",
      stagger: 0.2,
    });
  });

  useEffect(() => {
    const handleScroll = () => {
      const nav = navRef.current;
      const currentScrollY = window.scrollY;

      if (!nav) return;

      if (currentScrollY <= 50) {
        gsap.to(nav, {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      } else if (currentScrollY > lastScrollY.current) {
        gsap.to(nav, {
          y: "-100%",
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(nav, {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`flex fixed z-50 top-0 w-full flex-row items-center justify-between ${pathname === "/testimonials" && "!bg-blue-700 !text-white"} px-8 py-4 md:px-32`}
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
      <button onClick={handleOpen} className="md:hidden">
        {!open ? <AlignJustify size={32} /> : <X size={32} />}
      </button>
      <div
        className={`links flex px-8 flex-col justify-center md:flex-row
          ${open ? "flex" : "hidden"} md:flex
          ${pathname === "/about" ? " text-white" : ""}
          left-0 top-20 z-30 w-full gap-4 p-4 md:static md:w-auto text-5xl md:p-0 h-full duration-700
          ${open ? "absolute" : "md:static"}
        `}
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
    </nav>
  );
};

export default Navbar;
