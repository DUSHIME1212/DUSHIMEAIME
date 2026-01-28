"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { links } from "~/lib/utils";
import { usePathname } from "next/navigation";
import { AlignRight, X } from "lucide-react";
import { FlipLink } from "./ui/FlipLink";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "~/lib/utils";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Toggle state with body-scroll lock for UX
  const toggleMenu = () => {
    setOpen(!open);
    if (!open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  };

  // 1. SCROLL ANIMATION: Elasticity & Visibility
  useEffect(() => {
    const handleScroll = () => {
      const nav = navRef.current;
      const currentScrollY = window.scrollY;
      if (!nav) return;

      // Shrink effect
      if (currentScrollY > 50) {
        gsap.to(nav, { 
            py: "1rem", 
            backgroundColor: "rgba(255, 255, 255, 0.8)", 
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
            duration: 0.4 
        });
      } else {
        gsap.to(nav, { 
            py: "1.5rem", 
            backgroundColor: "rgba(255, 255, 255, 0)", 
            backdropFilter: "blur(0px)",
            borderBottom: "1px solid rgba(0,0,0,0)",
            duration: 0.4 
        });
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        gsap.to(nav, { y: "-100%", duration: 0.3, ease: "power2.inOut" });
      } else {
        gsap.to(nav, { y: 0, duration: 0.3, ease: "power2.out" });
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. MOBILE MENU ANIMATION (GSAP Stagger)
  useGSAP(() => {
    if (open) {
      gsap.to(menuRef.current, { x: 0, opacity: 1, duration: 0.6, ease: "expo.out" });
      gsap.fromTo(".mobile-link", 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2 }
      );
    } else {
      gsap.to(menuRef.current, { x: "100%", opacity: 0, duration: 0.5, ease: "expo.in" });
    }
  }, [open]);

  const isDarkScene = pathname === "/testimonials";

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-0 z-[60] flex w-full flex-row items-center justify-between px-6 transition-all duration-300 md:px-20 lg:px-32 py-6",
          isDarkScene ? "text-white" : "text-black"
        )}
      >
        {/* LOGO AREA */}
        <div className="relative z-[70] h-8 w-28 md:h-10 md:w-36 transition-transform hover:scale-105 active:scale-95">
          <Image
            src={isDarkScene ? "/DUSHIME Aime.png" : "/DUSHIlogopng.png"}
            className="object-contain"
            alt="Logo"
            fill
            priority
          />
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden items-center gap-10 md:flex">
          {links.map((it, i) => (
            <div key={i} className="relative group">
                {
                  pathname === "gallery" && it.href === "/gallery" ?<FlipLink href={it.href} className="text-sm font-medium tracking-wide uppercase">
                {it.title}
                </FlipLink>:
                <FlipLink href={it.href} className="text-sm font-medium text-white tracking-wide uppercase">
                  {it.title}
                </FlipLink>
                
                  
                }
                {pathname === it.href && (
                    <motion.div 
                        layoutId="nav-dot"
                        className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-600" 
                    />
                )}
            </div>
          ))}
        </div>

        {/* MOBILE TRIGGER */}
        <button 
          onClick={toggleMenu} 
          className="relative z-[70] p-2 md:hidden"
          aria-label="Toggle Menu"
        >
          {open ? <X size={28} /> : <AlignRight size={28} className={isDarkScene ? "text-white" : "text-black"} />}
        </button>
      </nav>

      {/* MOBILE FULL-SCREEN OVERLAY */}
      <div 
        ref={menuRef}
        className="fixed inset-0 z-[65] flex translate-x-full flex-col bg-white p-10 opacity-0 md:hidden"
      >
        <div className="flex h-full flex-col justify-center gap-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">Navigation</p>
            {links.map((it, i) => (
                <div key={i} className="mobile-link overflow-hidden" onClick={toggleMenu}>
                    <FlipLink 
                        href={it.href} 
                        className="text-5xl font-bold tracking-tighter text-black"
                    >
                        {it.title}
                    </FlipLink>
                </div>
            ))}
            
            <div className="mt-20 border-t border-neutral-100 pt-10 mobile-link">
                <p className="text-sm text-neutral-500">Get in touch</p>
                <p className="text-xl font-medium text-blue-700">hello@dushime.design</p>
            </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;