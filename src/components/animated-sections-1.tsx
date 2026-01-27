'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(Observer);

const AnimatedSections = ({ sections = [], className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indexState, setIndexState] = useState(0); // For UI/Dots
  const currentIndexRef = useRef(0); // For Logic/Animation
  const animatingRef = useRef(false);
  
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const bgRefs = useRef<HTMLDivElement[]>([]);
  const insetRefs = useRef<HTMLDivElement[]>([]);
  const contentRefs = useRef<HTMLDivElement[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);

  // 1. MAGNETIC CURSOR
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: "power3.out"
      });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // 2. CORE NAVIGATION LOGIC
  const gotoSection = (index: number, direction: number) => {
    if (animatingRef.current) return;

    const total = sections.length;
    const wrap = gsap.utils.wrap(0, total);
    const nextIndex = wrap(index);
    
    // Prevent animating to the same section
    if (nextIndex === currentIndexRef.current) return;

    animatingRef.current = true;
    const isDown = direction > 0;
    const prevIndex = currentIndexRef.current;

    // Update Refs and State
    currentIndexRef.current = nextIndex;
    setIndexState(nextIndex);

    const tl = gsap.timeline({
      defaults: { duration: 1.2, ease: "expo.inOut" },
      onComplete: () => {
        animatingRef.current = false;
        // Hide previous section completely after transition
        gsap.set(sectionRefs.current[prevIndex], { autoAlpha: 0 });
      }
    });

    const currentSlide = sectionRefs.current[prevIndex];
    const nextSlide = sectionRefs.current[nextIndex];

    // Prepare Next Slide
    gsap.set(nextSlide, { autoAlpha: 1, zIndex: 2 });
    gsap.set(currentSlide, { zIndex: 1 });

    tl.fromTo(nextSlide, 
      { clipPath: isDown ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4 }, 
      0
    )
    .fromTo(bgRefs.current[nextIndex], 
      { y: isDown ? "20%" : "-20%", scale: 1.3 },
      { y: "0%", scale: 1.1, duration: 1.6 }, 
      0
    )
    .fromTo(insetRefs.current[nextIndex],
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.4, ease: "power4.out" },
      0.2
    )
    .fromTo(contentRefs.current[nextIndex],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      0.7
    );
  };

  // 3. SCROLL OBSERVER
  useGSAP(() => {
    const obs = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      onUp: () => gotoSection(currentIndexRef.current + 1, 1),
      onDown: () => gotoSection(currentIndexRef.current - 1, -1),
      tolerance: 10,
      preventDefault: true
    });
    
    // Set initial state
    gsap.set(sectionRefs.current[0], { autoAlpha: 1, zIndex: 2 });
    
    return () => obs.kill();
  }, [sections]); // Only re-run if sections change

  return (
    <div ref={containerRef} className={`relative h-screen w-screen overflow-hidden bg-[#0a0a0a] cursor-none ${className}`}>
      
      {/* CUSTOM CURSOR */}
      <div ref={cursorRef} className="pointer-events-none fixed left-0 top-0 z-[100] flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-transform active:scale-90">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">View</span>
      </div>

      {sections.map((section, i) => (
        <div
          key={i}
          ref={(el) => { if (el) sectionRefs.current[i] = el; }}
          className="invisible absolute inset-0 h-full w-full overflow-hidden"
        >
          {/* BLURRED BACKGROUND */}
          <div 
            ref={(el) => { if (el) bgRefs.current[i] = el; }}
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url("${section.img}")`,
              filter: 'brightness(0.9) blur(1px)',
            }}
          />

          {/* MAIN CONTENT */}
          <div className="relative flex h-full w-full items-center justify-center p-20">
            
            {/* CENTRAL IMAGE BOX */}
            <div 
              ref={(el) => { if (el) insetRefs.current[i] = el; }}
              className="relative z-10 aspect-[4/5] h-[60vh] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
            >
               <img src={section.img} alt={section.title} className="h-full w-full object-cover" />
            </div>

            {/* TEXT CONTENT */}
            <div 
              ref={(el) => { if (el) contentRefs.current[i] = el; }}
              className="absolute bottom-20 left-20 z-20"
            >
              <h2 className="text-[8vw] font-medium leading-[0.8] tracking-tighter text-white">
                {section.title}
              </h2>
              <p className="mt-6 text-[10px] uppercase tracking-[0.5em] text-white/40">
                {section.subtitle || "Seamless Photographic Journey"}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* PAGINATION */}
      <div className="fixed right-12 top-1/2 z-50 flex -translate-y-1/2 flex-col items-end gap-8">
        {sections.map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className={`text-[10px] font-mono transition-opacity duration-500 ${indexState === i ? 'text-white' : 'text-white/20'}`}>
              {(i + 1).toString().padStart(2, '0')}
            </span>
            <div className={`h-[1px] transition-all duration-700 ${indexState === i ? 'w-12 bg-white' : 'w-4 bg-white/20'}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedSections;