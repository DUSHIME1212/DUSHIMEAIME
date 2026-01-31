"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { links } from "~/lib/utils";
import { usePathname } from "next/navigation";
import { AlignRight, Menu, X } from "lucide-react";
import { FlipLink } from "./ui/FlipLink";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "~/lib/utils";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // UX Logic: Determine if we are on a "Dark Scene" (Gallery or Testimonials)
  // startsWith handles /gallery and /gallery/[slug]
  const isWhiteTextScene = pathname.startsWith("/gallery") || pathname === "/testimonials";

  const toggleMenu = () => {
    setOpen(!open);
    if (!open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  // 1. SCROLL ANIMATION: Visibility & Background Glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      const nav = navRef.current;
      const currentScrollY = window.scrollY;
      if (!nav) return;

      // Handle Background & Padding on Scroll
      if (currentScrollY > 50) {
        gsap.to(nav, {
          py: "1rem",
          backgroundColor: isWhiteTextScene 
            ? "rgba(0, 0, 0, 0.3)" 
            : "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: isWhiteTextScene 
            ? "1px solid rgba(255,255,255,0.1)" 
            : "1px solid rgba(0,0,0,0.05)",
          duration: 0,
          ease: "power2.out"
        });
      } else {
        gsap.to(nav, {
          py: "1.5rem",
          backgroundColor: "rgba(255, 255, 255, 0)",
          backdropFilter: "blur(0px)",
          borderBottom: "1px solid rgba(0,0,0,0)",
          duration: 0.4,
          ease: "power2.out"
        });
      }

      // Hide/Show Logic
      if (currentScrollY > lastScrollY.current && currentScrollY > 300) {
        gsap.to(nav, { y: "-100%", duration: 0, ease: "power2.inOut" });
      } else {
        gsap.to(nav, { y: 0, duration: 0.3, ease: "power2.out" });
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isWhiteTextScene]); // Re-run if scene type changes

  // 2. MOBILE MENU ANIMATION
  useGSAP(() => {
    if (open) {
      gsap.to(menuRef.current, { 
        x: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "expo.out" 
      });
      gsap.fromTo(".mobile-link", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3, ease: "power3.out" }
      );
    } else {
      gsap.to(menuRef.current, { 
        x: "100%", 
        opacity: 0, 
        duration: 0.6, 
        ease: "expo.in" 
      });
    }
  }, [open]);

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-0 z-[60] flex w-full flex-row items-center justify-between px-6 md:px-20 lg:px-32 py-6 transition-colors duration-500",
          isWhiteTextScene ? "text-white" : "text-black"
        )}
      >
        {/* LOGO */}
        <div className="relative z-[70] h-8 w-28 md:h-10 md:w-36 transition-transform hover:scale-105 active:scale-95">
          <Image
            src={isWhiteTextScene ? "/DUSHIME Aime.png" : "/DUSHIlogopng.png"}
            className="object-contain"
            alt="Logo"
            fill
            priority
          />
        </div>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-10 md:flex">
          {links.map((it, i) => {
            const isActive = pathname === it.href;
            return (
              <div key={i} className="relative group">
                <FlipLink 
                  href={it.href} 
                  className={cn(
                    "text-sm font-instrumentserif italic uppercase",
                    isWhiteTextScene ? "text-white " : "text-black"
                  )}
                >
                  {it.title}
                </FlipLink>
                
                {isActive && (
                  <motion.div 
                    layoutId="nav-dot"
                    className={cn(
                      "absolute -bottom-3 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full",
                      isWhiteTextScene ? "bg-white" : "bg-yellow-600"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* MOBILE TRIGGER */}
        <button 
          onClick={toggleMenu} 
          className="relative z-[70] p-2 md:hidden"
          aria-label="Toggle Menu"
        >
          {open ? (
            <X size={28} className="text-black" /> 
          ) : (
            <div className="flex flex-row-reverse items-center gap-4">
              <Menu size={24} className={isWhiteTextScene ? "text-white" : "text-black"} />
              <span className="font-instrumentserif text-xl italic">Menu</span>
            </div>
          )}
        </button>
      </nav>

      {/* MOBILE FULL-SCREEN OVERLAY */}
      <div 
        ref={menuRef}
        className="fixed inset-0 z-[65] flex translate-x-full flex-col bg-white p-10 opacity-0 md:hidden"
      >
        <div className="flex h-full flex-col justify-center gap-12">
            <div className="space-y-2">
               <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-bold">Navigation</p>
               <div className="h-px w-8 bg-yellow-600" />
            </div>
            
            <div className="flex flex-col gap-6">
              {links.map((it, i) => (
                  <div key={i} className="mobile-link overflow-hidden" onClick={toggleMenu}>
                      <Link 
                          href={it.href} 
                          className="text-5xl tracking-tighter text-black uppercase italic"
                      >
                          {it.title}
                      </Link>
                  </div>
              ))}
            </div>
            
            <div className="mt-12 border-t border-neutral-100 pt-10 mobile-link">
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Project Inquiries</p>
                <p className="text-2xl font-medium tracking-tight text-neutral-900">mdonavan33@gmail.com</p>
            </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;