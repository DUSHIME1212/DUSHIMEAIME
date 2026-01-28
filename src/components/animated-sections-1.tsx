'use client';

import { useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { useGSAP } from '@gsap/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

gsap.registerPlugin(Observer);

const AnimatedSections = ({ sections = [] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indexState, setIndexState] = useState(0);
  const currentIndexRef = useRef(0);
  const animatingRef = useRef(false);
  const router = useRouter();

  // Refs for specific layers
  const sectionRefs = useRef<HTMLAnchorElement[]>([]);
  const bgRefs = useRef<HTMLDivElement[]>([]);
  const imageRefs = useRef<HTMLImageElement[]>([]);
  const titleRefs = useRef<HTMLHeadingElement[]>([]);
  const counterRef = useRef<HTMLDivElement>(null);

  const gotoSection = useCallback((index: number, direction: number) => {
    if (animatingRef.current || sections.length === 0) return;

    const total = sections.length;
    const nextIndex = gsap.utils.wrap(0, total, index);
    if (nextIndex === currentIndexRef.current) return;

    animatingRef.current = true;
    const isDown = direction > 0;
    const prevIndex = currentIndexRef.current;
    
    currentIndexRef.current = nextIndex;
    setIndexState(nextIndex);

    const tl = gsap.timeline({
      defaults: { duration: 1.5, ease: "expo.inOut" },
      onComplete: () => {
        animatingRef.current = false;
        gsap.set(sectionRefs.current[prevIndex], { autoAlpha: 0 });
      }
    });

    const nextSlide = sectionRefs.current[nextIndex];

    // 1. Prepare Next Slide State
    gsap.set(nextSlide, { autoAlpha: 1, zIndex: 2 });
    gsap.set(sectionRefs.current[prevIndex], { zIndex: 1 });

    // 2. Odometer Animation (Numbers)
    if (counterRef.current) {
        tl.to(counterRef.current, {
            y: -nextIndex * 100 + "%",
            duration: 1.2,
            ease: "expo.inOut"
        }, 0);
    }

    // 3. The "Reveal" Animation
    tl.fromTo(nextSlide, 
      { clipPath: isDown ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)" }, 0
    )
    .fromTo(bgRefs.current[nextIndex], 
      { scale: 1.4, filter: "blur(30px) brightness(0.2)" },
      { scale: 1.1, filter: "blur(10px) brightness(0.5)", duration: 2 }, 0
    )
    .fromTo(imageRefs.current[nextIndex], 
      { y: isDown ? "30%" : "-30%", scale: 1.2 },
      { y: "0%", scale: 1, duration: 1.8 }, 0.1
    )
    .fromTo(titleRefs.current[nextIndex],
      { y: 100, opacity: 0, skewY: 7 },
      { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: "power4.out" }, 0.4
    );

  }, [sections]);

  useGSAP(() => {
    if (!Observer) return;
    const obs = Observer.create({
      type: "wheel,touch,pointer",
      onUp: () => gotoSection(currentIndexRef.current + 1, 1),
      onDown: () => gotoSection(currentIndexRef.current - 1, -1),
      tolerance: 10,
    });
    gsap.set(sectionRefs.current[0], { autoAlpha: 1, zIndex: 2 });
    return () => {
      if (obs) obs.kill();
    };
  }, { scope: containerRef, dependencies: [sections, gotoSection] });

  return (
    <div ref={containerRef} className="relative h-screen w-screen overflow-hidden bg-white font-dmsans">
      
      {/* GLOBAL ODOMETER (Top Left) */}
      <div className="fixed left-12 top-12 z-[60] flex items-center gap-4 mix-blend-difference">
        <div className="h-8 overflow-hidden text-2xl font-bold text-blue-700">
          <div ref={counterRef} className="flex flex-col transition-none">
            {sections.map((_, i) => (
              <span key={i} className="flex h-8 items-center">
                {(i + 1).toString().padStart(2, '0')}
              </span>
            ))}
          </div>
        </div>
        <div className="h-[1px] w-12 bg-white/30" />
        <span className="text-xs tracking-widest text-white/40 uppercase">
          {sections.length.toString().padStart(2, '0')}
        </span>
      </div>

      {/* SECTIONS */}
      {sections.map((section, i) => (
        <Link
        href={`/gallery/${section.slug}`}
          key={i}
          ref={(el) => { if (el) sectionRefs.current[i] = el; }}
          className="invisible absolute inset-0 h-full w-full overflow-hidden"
        >
          {/* BLURRED DYNAMIC BG */}
          <div 
            ref={(el) => { if (el) bgRefs.current[i] = el; }}
            className="absolute inset-0 h-full w-full bg-cover bg-center transition-transform duration-[3s] ease-out"
            style={{ backgroundImage: `url("${section.img}")` }}
          />

          <div className="relative flex h-full w-full flex-col items-center justify-center">
            {/* HERO IMAGE CONTAINER */}
            <div className="group relative z-10 h-[65vh] aspect-[3/4] overflow-hidden rounded-sm shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
               <img 
                ref={(el) => { if (el) imageRefs.current[i] = el; }}
                src={section.img} 
                alt="" 
                className="h-full w-full object-cover scale-110" 
               />
               <div className="absolute inset-0 border-[20px] border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* FLOATING TEXT */}
            <div className="absolute bottom-16 text-center z-20">
              <h2 
                ref={(el) => { if (el) titleRefs.current[i] = el; }}
                className="text-[12vw] font-bold tracking-tighter text-white leading-none uppercase italic"
              >
                {section.title}
              </h2>
              <div className="mt-4 flex justify-center gap-4">
                {section.tags?.map((tag: string, j: number) => (
                  <span key={j} className="text-[10px] uppercase tracking-[0.3em] text-white border border-white px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      ))}

      {/* NAVIGATION BAR (Bottom) */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex gap-3">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => gotoSection(i, i > currentIndexRef.current ? 1 : -1)}
            className={`h-2 rounded-full transition-all duration-700 ${indexState === i ? 'w-12 bg-white' : 'w-2 bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedSections;