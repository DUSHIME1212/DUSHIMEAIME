"use client";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  
  // CRITICAL: We store the "visible" content in state 
  // to prevent it from changing before we're ready
  const [displayChildren, setDisplayChildren] = useState(children);

  useGSAP(() => {
    // If the content is already what's requested, don't re-animate
    if (displayChildren === children) return;

    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

    const tl = gsap.timeline();

    // 1. Reset position of the SVG curtain
    tl.set(svgRef.current, { yPercent: 0 });

    // 2. THE OUT-ANIMATION (Covering the old page)
    tl.to(pathRef.current, {
      duration: 0.8,
      attr: { d: curve },
      ease: "power4.in",
    })
    .to(pathRef.current, {
      duration: 0.2, // Quick hold while we swap the content
      attr: { d: "M0 1000S175 1000 500 1000s500 0 500 0V0H0Z" },
      onComplete: () => {
        // AT THIS EXACT MOMENT: The screen is covered. 
        // We swap the content behind the curtain.
        setDisplayChildren(children);
        window.scrollTo(0, 0); // Reset scroll seamlessly
      }
    })
    
    // 3. THE IN-ANIMATION (Revealing the new page)
    .to(svgRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "expo.inOut"
    })
    // Simultaneously flatten the curve back to start
    .to(pathRef.current, {
      duration: 0.8,
      attr: { d: flat },
      ease: "power4.out",
    }, "<");

  }, [pathname]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[calc(100vh+600px)] pointer-events-none z-[999]">
        <svg 
          ref={svgRef}
          viewBox="0 0 1000 1000" 
          preserveAspectRatio="none"
          className="absolute w-full h-full fill-yellow-700"
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