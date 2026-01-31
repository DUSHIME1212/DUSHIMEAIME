"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "~/lib/utils";
import gsap from "gsap";

const testimonials = [

  {

    tempId: 0,

    testimonial: "What truly sets Aime apart is his remarkable reliability and efficiency. He consistently delivers high-quality work, bringing technical precision and creativity to every project. During our collaborative work, he exceeded expectations and offered strategic and impactful innovative solutions.",

    by: "Ayomide agbaje, CEO at Afresearch",

    imgSrc: "https://media.licdn.com/dms/image/v2/D4D03AQGTAQ6txJYS-A/profile-displayphoto-shrink_200_200/B4DZRHWykLGkAY-/0/1736363945646?e=1770249600&v=beta&t=ixH_XODLXRu6U_MtwECqOvYCtJe4jhe_1cnOdNO_3ZU"

  },

  {

    tempId: 1,

    testimonial: "Aime is outstanding ability to translate complex goals into compelling visual narratives as a designer. His design work communicates core messages with remarkable clarity and vision. And on top of that, he brings a rare combination of infectious enthusiasm and commitment to excellence that inspires those around him.",

    by: "SUGIRA Herve, Software Engineer",

    imgSrc: "https://media.licdn.com/dms/image/v2/D4D03AQEuqMqFT514rA/profile-displayphoto-scale_400_400/B4DZrkmmdmIAAg-/0/1764771918171?e=1770854400&v=beta&t=8nxb9pQwV5W4KmKSEBPWWq0bJ-3cGx9ctQKz0W2EouI"

  },

  {

    tempId: 2,

    testimonial: "Lee don Aime is a highly talented designer who consistently brings ideas to life with clarity and originality. HE is great at turning rough ideas into clean, functional, and beautiful designs. Their ability to listen, adapt, and improve makes them a valuable collaborator.",

    by: "Igor NTWARI, Senior Developer at Evolve",

    imgSrc: "https://media.licdn.com/dms/image/v2/D4D03AQFkPeb0UiMPKQ/profile-displayphoto-shrink_200_200/B4DZb7gowsGYAY-/0/1747976362224?e=1770249600&v=beta&t=q4TAs08rAmCQyK9e3PBMbiMCe7_QlnwXyFSzb-11nCA"

  },

  {

    tempId: 4,

    testimonial: "We have truly enjoyed working with DUSHIME and would absolutely welcome the opportunity to collaborate again in the future",

    by: "Fiona hayes, CEO at Viewpoint simulations",

    imgSrc: "https://ca.slack-edge.com/T086V2ZDM7F-U086HC1Q6BZ-14c7121b00d5-512"

  },

  {

    tempId: 5,

    testimonial: "DUSHIME Aime is reliable, innovative, and easy to work with. They consistently delivered high-quality designs on time and were always open to feedback. I would confidently recommend them to anyone looking for a skilled and dependable designer.",

    by: "Kevin NTWARI, C0O at Codes empowerment",

    imgSrc: "https://media.licdn.com/dms/image/v2/D4D03AQFghERCy4Iuuw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731397267213?e=1770249600&v=beta&t=VObB10gcj57WUZ7DwilE37Rs2Vvi6sUO-x0SwI0aVP4"

  },

  {

    tempId: 6,

    testimonial: "I had the opportunity to work closely with Aime Don, and their design skills are exceptional. He combines creativity with practicality, ensuring designs are not only attractive but also user-friendly. Their work ethic and commitment to quality really stand out.",

    by: "Ornella NDAHIRO, CEO at Codes empowerment",

    imgSrc: "https://media.licdn.com/dms/image/v2/D4D03AQH4z0gE6OA6CQ/profile-displayphoto-shrink_800_800/B4DZavkaVBHEAc-/0/1746702285137?e=1770249600&v=beta&t=mbexX-DPFBF45ziy-K2Z4UHMgPjm3JPaCLAZNYJQOGs"

  },

];



export const StaggerTestimonials = () => {
  const [active, setActive] = useState(0);
  const cardsRef = useRef<HTMLDivElement>(null);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Animation logic for high-end feel
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".testimonial-content", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }, cardsRef);
    return () => ctx.revert();
  }, [active]);

  return (
    <section className="relative px-8 md:px-16 lg:px-32 w-full py-24 bg-[#fafafa] overflow-hidden" ref={cardsRef}>
      {/* BACKGROUND DECOR (Senior UX Touch) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <span className="text-[20vw] font-black uppercase tracking-tighter">Testimonials</span>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT: CONTENT */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 text-yellow-600 border border-yellow-100">
              <span className="flex h-2 w-2 rounded-full bg-yellow-600 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Worked with</span>
            </div>
            
            <div className="testimonial-content min-h-[300px]">
              <Quote className="h-12 w-12 text-yellow-600/20 mb-6" />
              <h4 className=" tracking-tight font-instrumentserif italic leading-[1.1] text-neutral-900">
                "{testimonials[active].testimonial}"
              </h4>
              
              <div className="mt-10 flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white shadow-lg">
                  <img src={testimonials[active].imgSrc} alt="" className="object-cover h-full w-full" />
                </div>
                <div>
                  <p className="font-bold text-lg text-neutral-900">{testimonials[active].by}</p>
                </div>
              </div>
            </div>

            {/* NAV CONTROLS */}
            <div className="flex gap-4 pt-8">
              <button onClick={prev} className="h-12 w-12 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                <ChevronLeft size={20} />
              </button>
              <button onClick={next} className="h-12 w-12 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* RIGHT: VISUAL STACK */}
          <div className="lg:col-span-7 relative h-[500px] flex items-center justify-center">
            {testimonials.map((t, i) => {
              const isStack = i !== active;
              const offset = (i - active + testimonials.length) % testimonials.length;
              
              return (
                <div
                  key={t.tempId}
                  className={cn(
                    "absolute group w-full max-w-[400px] aspect-[4/5] rounded-2xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-2xl",
                    active === i ? "z-30 scale-100 opacity-100 translate-x-0" : "z-10 scale-90 opacity-40 translate-x-20 grayscale"
                  )}
                  style={{
                    transform: `translateX(${offset * 40}px) scale(${1 - offset * 0.05})`,
                    zIndex: testimonials.length - offset
                  }}
                >
                  <img src={t.imgSrc} className="h-full w-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 text-white">
                    <p className="text-xs uppercase tracking-widest opacity-60">Verified Partner</p>
                    <p className="text-xl font-medium">{t.by}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};