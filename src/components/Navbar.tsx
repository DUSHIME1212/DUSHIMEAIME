"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { links } from "~/lib/utils";
import { usePathname } from "next/navigation";
import { AlignJustify, X } from "lucide-react";
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
          backgroundColor: "white",
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
      className={`flex fixed z-50 top-0 w-full flex-row items-center justify-between bg-white transition-colors ${pathname === "/testimonials" && "!bg-blue-700 !text-white"} px-4 py-4 md:px-32 shadow-sm`}
    >
      <div className="relative h-10 w-24 md:h-12 md:w-32">
        <Image
          src={
            pathname === "/testimonials"
              ? "/DUSHIME Aime.png"
              : "/DUSHIlogopng.png"
          }
          className="object-contain"
          alt="Logo"
          fill
        />
      </div>
      <button onClick={handleOpen} className="md:hidden z-40">
        {!open ? <AlignJustify size={24} /> : <X size={24} />}
      </button>
      <div
        className={`links flex flex-col justify-start md:flex-row
          ${open ? "flex" : "hidden"} md:flex
          ${pathname === "/about" ? "md:text-black" : ""}
          fixed md:static  top-16 left-0 w-full md:w-auto
          bg-white md:bg-transparent
          gap-6 md:gap-4 p-6 md:p-0 
          max-h-[calc(100vh-64px)] md:max-h-none
          overflow-y-auto md:overflow-visible
          text-lg md:text-base
          shadow-lg md:shadow-none
          ${pathname === "/testimonials" && "md:!bg-transparent"}
        `}
      >
        {links.map((it, i) => (
          <FlipLink
            key={i}
            href={it.href}
            className={pathname === "/testimonials" ? "text-blue-700 md:text-white" : ""}
          >
            <span onClick={closeMenu}>{it.title}</span>
          </FlipLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
