"use client";
import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  
  // CRITICAL: We store the "visible" content in state 
  // to prevent it from changing before we're ready
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useGSAP(() => {
    // If the content is already what's requested, or first load, don't re-animate
    // However, on first load, we don't want a flash.
    if (displayChildren === children) return;

    setIsTransitioning(true);

    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
      }
    });

    // 1. Reset position of the SVG curtain
    tl.set(curtainRef.current, { yPercent: 0, autoAlpha: 1 });
    tl.set(pathRef.current, { attr: { d: flat } });

    // 2. THE OUT-ANIMATION (Covering the old page)
    tl.to(pathRef.current, {
      duration: 0.8,
      attr: { d: curve },
      ease: "power4.in",
    })
    .to(pathRef.current, {
      duration: 0.4, // Brief duration to fully "fill" the screen
      attr: { d: "M0 1000S175 1000 500 1000s500 0 500 0V0H0Z" },
      ease: "power2.out",
      onComplete: () => {
        // AT THIS EXACT MOMENT: The screen is fully covered. 
        // We swap the content behind the curtain.
        setDisplayChildren(children);
        window.scrollTo(0, 0); // Reset scroll seamlessly
      }
    })
    
    // 3. THE IN-ANIMATION (Revealing the new page)
    .to(curtainRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "expo.inOut"
    })
    // Simultaneously flatten the curve back to start for next transition
    .to(pathRef.current, {
      duration: 0.8,
      attr: { d: flat },
      ease: "power4.out",
    }, "<")
    .set(curtainRef.current, { autoAlpha: 0 }); // Hide it once done

  }, [pathname]);

  return (
    <>
      <div 
        ref={curtainRef}
        className="fixed top-0 left-0 w-full h-[calc(100vh+600px)] pointer-events-none z-[999] invisible"
      >
        <svg 
          ref={svgRef}
          viewBox="0 0 1000 1000" 
          preserveAspectRatio="none"
          className="absolute w-full h-full fill-[#080808]"
        >
          <path ref={pathRef} d="M0 2S175 1 500 1s500 1 500 1V0H0Z"></path>
        </svg>
      </div>
      
      {/* We render 'displayChildren' instead of 'children'.
          This ensures the OLD page stays mounted until the curtain is closed.
      */}
      <main className="page-main min-h-screen">
        {displayChildren}
      </main>
    </>
  );
}