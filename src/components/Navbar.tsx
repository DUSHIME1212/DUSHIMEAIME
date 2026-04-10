"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import SplitType from "split-type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

// Only real pages that exist in this project
const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Works", href: "/works" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  // 1. Initialize Smooth Scroll (Lenis)
  useEffect(() => {
    const scroll = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    setLenis(scroll);

    function raf(time: number) {
      scroll.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => scroll.destroy();
  }, []);

  // 2. Setup SplitText and initial states
  useGSAP(
    () => {
      try {
        CustomEase.create("hop", "0.87, 0, 0.13, 1");
      } catch (e) {
        // fallback
      }

      const textElements = document.querySelectorAll(
        ".menu-link, .menu-sub-link, .menu-info p",
      );

      textElements.forEach((el) => {
        const split = new SplitType(el as HTMLElement, { types: "lines" });
        split.lines?.forEach((line) => {
          const wrapper = document.createElement("div");
          wrapper.className = "overflow-hidden inline-block w-full align-bottom";
          line.parentNode?.insertBefore(wrapper, line);
          wrapper.appendChild(line);
          gsap.set(line, { y: "-110%" });
        });
      });

      gsap.set(menuContentRef.current, { yPercent: -50 });
    },
    { scope: navRef },
  );

  // 3. Toggle Animation Logic
  const toggleMenu = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    const ease = gsap.parseEase("hop") ? "hop" : "power4.inOut";

    if (!isMenuOpen) {
      lenis?.stop();

      tl.to(labelRef.current, { y: "-110%", duration: 1, ease }, 0)
        .to(
          menuOverlayRef.current,
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1, ease },
          0,
        )
        .to(menuContentRef.current, { yPercent: 0, duration: 1, ease }, 0)
        .to(mediaRef.current, { opacity: 1, duration: 0.75, ease: "power2.out" }, 0.5);

      const allLines = menuOverlayRef.current?.querySelectorAll(".line");
      if (allLines) {
        tl.to(allLines, { y: "0%", duration: 2, ease, stagger: -0.075 }, 0.15);
      }

      setIsMenuOpen(true);
    } else {
      tl.to(menuOverlayRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        ease,
      })
        .to(menuContentRef.current, { yPercent: -50, duration: 1, ease }, "<")
        .to(labelRef.current, { y: "0%", duration: 1, ease }, "<")
        .to(".menu-col", { opacity: 0.25, duration: 1, ease }, "<");

      tl.add(() => {
        const allLines = menuOverlayRef.current?.querySelectorAll(".line");
        if (allLines) gsap.set(allLines, { y: "-110%" });
        gsap.set(".menu-col", { opacity: 1 });
        gsap.set(mediaRef.current, { opacity: 0 });
        lenis?.start();
        setIsMenuOpen(false);
      });
    }
  }, [isAnimating, isMenuOpen, lenis]);

  // Close menu on route change
  const lastPathname = useRef(pathname);
  useEffect(() => {
    if (isMenuOpen && pathname !== lastPathname.current) {
      // Force-close menu instantly on navigation without animation
      setIsMenuOpen(false);
      setIsAnimating(false);
      if (menuOverlayRef.current) {
        gsap.set(menuOverlayRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        });
      }
      if (menuContentRef.current) {
        gsap.set(menuContentRef.current, { yPercent: -50 });
      }
      if (labelRef.current) {
        gsap.set(labelRef.current, { y: "0%" });
      }
      if (mediaRef.current) {
        gsap.set(mediaRef.current, { opacity: 0 });
      }
      gsap.set(".menu-col", { opacity: 1 });
      lenis?.start();
    }
    lastPathname.current = pathname;
  }, [pathname, isMenuOpen, lenis]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full h-screen pointer-events-none z-[100] overflow-hidden font-notion"
    >
      {/* Top Bar */}
      <div className="fixed top-0 left-0 w-full px-6 py-5 md:px-16 lg:px-32 flex justify-between items-center pointer-events-auto z-[102]">
        <Link href="/" className="translate-y-0 will-change-transform">
          <Image
            src="/DUSHIlogopng.png"
            alt="Dushime Aime"
            width={140}
            height={48}
            style={{ height: "2.75rem", width: "auto" }}
            className="object-contain"
          />
        </Link>

        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={toggleMenu}
        >
          <div className="overflow-hidden">
            <p
              ref={labelRef}
              className="text-[10px] tracking-widest uppercase text-white/60 translate-y-0 will-change-transform group-hover:text-white transition-colors"
            >
              {isMenuOpen ? "Close" : "Menu"}
            </p>
          </div>
          <div className="relative w-11 h-11 flex flex-col justify-center items-center border border-white/10 rounded-full bg-black/30 backdrop-blur-md hover:bg-white/5 transition-all">
            <span
              className={`absolute w-[14px] h-px bg-white transition-all duration-700 ease-hop ${
                isMenuOpen
                  ? "translate-y-0 rotate-45"
                  : "-translate-y-[3px] group-hover:-translate-y-[4px]"
              }`}
            />
            <span
              className={`absolute w-[14px] h-px bg-white transition-all duration-700 ease-hop ${
                isMenuOpen
                  ? "translate-y-0 -rotate-45"
                  : "translate-y-[3px] group-hover:translate-y-[4px]"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Menu Overlay */}
      <div
        ref={menuOverlayRef}
        className="fixed top-0 left-0 w-full h-screen bg-[#080808] z-[101] will-change-[clip-path]"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
      >
        <div
          ref={menuContentRef}
          className="flex w-full h-full will-change-transform pointer-events-auto"
        >
          {/* Left: Photo */}
          <div
            ref={mediaRef}
            className="hidden lg:block flex-[2] opacity-0 will-change-opacity border-r border-white/[0.04]"
          >
            <div className="w-full h-full relative">
              <Image
                src="/hero-no-suit (1).png"
                alt="Dushime Aime"
                fill
                sizes="40vw"
                className="object-cover grayscale opacity-25 object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#080808]" />
              {/* Brand watermark */}
              <div className="absolute bottom-12 left-12">
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-medium">
                  Dushime Aime · Portfolio 2025
                </p>
              </div>
            </div>
          </div>

          {/* Right: Links */}
          <div className="flex-[3] relative flex flex-col justify-between py-28 px-8 md:px-16 lg:px-20">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
              {/* Primary Nav */}
              <div className="menu-col flex-[3] flex flex-col gap-1">
                <p className="text-[9px] tracking-[0.4em] uppercase text-white/30 mb-6 font-medium">
                  Navigation
                </p>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="menu-link group text-[clamp(2.5rem,5vw,4.5rem)] uppercase font-medium tracking-notion-display text-white hover:text-notion-blue transition-colors duration-300 inline-flex items-center gap-3 leading-[1.05]"
                  >
                    {item.name}
                    <span className="text-[10px] text-white/20 group-hover:text-notion-blue/60 transition-colors self-start mt-3">
                      {navigation.indexOf(item) < 9
                        ? `0${navigation.indexOf(item) + 1}`
                        : navigation.indexOf(item) + 1}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Sidebar Info */}
              <div className="menu-col flex-[2] flex flex-col gap-4 pt-0 lg:pt-16">
                <p className="text-[9px] tracking-[0.4em] uppercase text-white/30 mb-2 font-medium">
                  Skills
                </p>
                {[
                  "UX / UI Design",
                  "Frontend Dev",
                  "Brand Strategy",
                  "Motion Design",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="menu-sub-link text-sm font-medium tracking-widest uppercase text-white/40 hover:text-white transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Info */}
            <div className="flex flex-col lg:flex-row gap-8 text-white/30 menu-info border-t border-white/[0.06] pt-10">
              <div className="menu-col flex-1 space-y-1">
                <p className="text-[9px] tracking-[0.4em] uppercase text-white/20 mb-2 font-medium">
                  Location
                </p>
                <p className="text-sm text-white/70 font-medium">Kigali, Rwanda</p>
                <p className="text-sm">KN 2 Rd, Nyarugenge</p>
              </div>
              <div className="menu-col flex-1 space-y-1">
                <p className="text-[9px] tracking-[0.4em] uppercase text-white/20 mb-2 font-medium">
                  Contact
                </p>
                <p className="text-sm text-white/70 font-medium">+250 798 840 568</p>
                <p className="text-sm">mdonavan33@gmail.com</p>
              </div>
              <div className="menu-col flex-1 flex items-end pt-2 lg:pt-0">
                <Link href="/contact">
                  <Button className="rounded-pill bg-notion-blue text-white hover:bg-notion-blue/80 tracking-[0.2em] uppercase text-[10px] px-8 h-12 font-medium">
                    Work With Me
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}