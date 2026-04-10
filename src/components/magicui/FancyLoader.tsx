"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function FancyLoader() {
  const container = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const counter = { value: 0 };

    const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });

    // Initial State
    gsap.set([nameRef.current, taglineRef.current], { y: 60, opacity: 0 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });

    // 1. Animate line in
    tl.to(lineRef.current, { scaleX: 1, duration: 0.8, ease: "power3.out" }, 0)

    // 2. Count up
    .to(
      counter,
      {
        value: 100,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.innerText = Math.round(counter.value)
              .toString()
              .padStart(2, "0");
          }
          // Drive progress bar width
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${counter.value}%`;
          }
        },
      },
      0.2,
    )

    // 3. Reveal name
    .to(nameRef.current, { y: 0, opacity: 1, duration: 0.9, ease: "expo.out" }, 0.8)

    // 4. Reveal tagline
    .to(taglineRef.current, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 1.1)

    // 5. Slide the loader up
    .to(
      container.current,
      {
        yPercent: -100,
        duration: 1,
        ease: "expo.inOut",
        delay: 0.3,
      },
      ">=2.8",
    );
  }, { scope: container });

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[200] flex flex-col items-start justify-end bg-[#070707] p-8 md:p-16 lg:p-24 font-notion"
    >
      {/* Top bar: Logo + Counter */}
      <div className="absolute top-8 left-8 md:top-16 md:left-16 lg:top-24 lg:left-24 flex items-center justify-between w-[calc(100%-4rem)] md:w-[calc(100%-8rem)] lg:w-[calc(100%-12rem)]">
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-1.5 rounded-full bg-notion-blue animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-medium">
            Loading Portfolio
          </span>
        </div>
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-medium tabular-nums">
          <span ref={numberRef}>00</span>
          <span className="text-white/10">%</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 h-[2px] bg-white/5 w-full">
        <div
          ref={progressBarRef}
          className="h-full bg-notion-blue transition-none"
          style={{ width: "0%" }}
        />
      </div>

      {/* Main content: bottom-left aligned */}
      <div className="space-y-4">
        {/* Accent line */}
        <div ref={lineRef} className="h-px w-16 bg-notion-blue origin-left" />

        {/* Name */}
        <div className="overflow-hidden">
          <h1
            ref={nameRef}
            className="text-[clamp(3.5rem,10vw,9rem)] font-medium tracking-notion-display text-white uppercase leading-[0.88]"
          >
            Dushime
            <span className="text-notion-blue">.</span>
          </h1>
        </div>

        {/* Tagline */}
        <div className="overflow-hidden">
          <p
            ref={taglineRef}
            className="text-sm md:text-base font-medium tracking-[0.2em] uppercase text-white/40"
          >
            Designer · Developer · Creator
          </p>
        </div>
      </div>

      {/* Year bottom-right */}
      
    </div>
  );
}