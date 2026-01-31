"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function FancyLoader() {
  const container = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    // We create a simple object to hold our count
    const counter = { value: 0 };
    const tl = gsap.timeline({
      defaults: { ease: "expo.inOut" }
    });

    // 1. Initial State
    gsap.set(wordRef.current, { yPercent: 100 });

    tl.to(counter, {
      value: 100,
      duration: 3, // How long the count takes
      ease: "power2.inOut",
      onUpdate: () => {
        // Direct DOM manipulation for maximum performance
        if (numberRef.current) {
          numberRef.current.innerText = Math.round(counter.value).toString();
        }
      },
    })
    // 2. Reveal the main text once the count hits 100
    .to(wordRef.current, {
      yPercent: 0,
      duration: 1,
      ease: "expo.out",
    }, "-=0.3")
    // 3. Slide the loader up and fade the elements
    .to(container.current, {
      yPercent: -100,
      duration: 1.2,
      delay: 0.2,
    })
    // Exit parallax for the text
    .to([textRef.current, numberRef.current], {
      y: -100,
      opacity: 0,
    }, "<");

  }, { scope: container });

  return (
    <div 
      ref={container} 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white text-yellow-700 font-black"
    >
      {/* Percentage Display */}
      <div className="absolute bottom-10 right-10 overflow-hidden">
        <span className="text-8xl md:text-[12rem] font-instrumentserif italic leading-none opacity-20">
          <span ref={numberRef}>0</span>
        </span>
      </div>

      {/* Main Brand Text */}
      <div className="overflow-hidden">
        <h1 ref={textRef} className="text-6xl md:text-8xl uppercase tracking-tighter">
          <span ref={wordRef} className="inline-block italic font-instrumentserif">
            Creative Mind
          </span>
        </h1>
      </div>
    </div>
  );
}