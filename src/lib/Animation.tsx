"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

export function AnimateParagraph({children, className}: {children: string; className?: string}) {
    const ref = useRef<HTMLParagraphElement>(null);
    useGSAP(() => {

        if (ref.current) {
            const words = ref.current.querySelectorAll('span'); 
            gsap.from(words, {
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 60%",
                    end: "bottom center", 
                    scrub: true, 
                    markers: false,
                },
                opacity: 0, 
                y: 30,
                filter: "blur(25px)", 
                stagger: 0.1, 
                duration: 2.4,
                onComplete: () => {
                    gsap.set(words, { filter: "blur(0)" });
                },
            });
        }
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <p className={className} ref={ref}>
            {children.split(" ").map((word, i) => (
                <span className="text-2xl" key={i}>{word}{" "}</span>
            ))}
        </p>
    );
}
