"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroSection from "~/components/hero-section";
import { TextAnimate } from "~/components/magicui/text-animate";
import { Button } from "~/components/ui/button";
import { ArrowDownRight, Sparkles } from "lucide-react";

const AboutPage = () => {
  const profileImage = "/image.png";
  const containerRef = useRef(null);
  
  // Parallax for the profile image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const yImage = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div className="bg-[#fafafa] font-dmsans selection:bg-yellow-100 selection:text-yellow-700">
      <div className="mt-16">
        <HeroSection />
      </div>

      <section className="px-6 md:px-20 lg:px-32 pb-40" ref={containerRef}>
        
        {/* SECTION 1: IDENTITY */}
        <div className="flex flex-col lg:flex-row gap-20 items-start py-20">
          <div className="w-full lg:w-1/2 space-y-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-100">
              <Sparkles size={14} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">The Designer</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.85] text-neutral-900">
              Hello world, <br />
              I am <span className="relative font-instrumentserif inline-block italic text-yellow-700">
                DUSHIME AIME
              </span>
            </h1>

            <div className="max-w-md">
                <TextAnimate className="text-xl md:text-2xl text-neutral-600 leading-relaxed" animation="blurInUp" by="word">
                I craft user-centered experiences that bridge the gap between human emotion and scalable logic.
                </TextAnimate>
            </div>
          </div>

          {/* PROFILE IMAGE WITH PARALLAX */}
          <div className="w-full lg:w-1/2 h-full relative">
            <div className="relative h-1/2 overflow-hidden rounded-2xl bg-neutral-200">
              <motion.div style={{ y: yImage, scale: 1.1 }} className="absolute inset-0">
                <Image
                  src={profileImage}
                  alt="Dushime Aime"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </motion.div>
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/20">
                 <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Currently based</p>
                 <p className="text-sm font-medium">Kigali, Rwanda 🇷🇼</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: THE "WHY" (Grid with depth) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200 border border-neutral-200 mt-20 rounded-3xl overflow-hidden shadow-sm">
           <div className="bg-white p-12 md:p-20 space-y-6">
              <h2 className="text-3xl font-medium tracking-tight">Where empathy meets impact</h2>
              <p className="text-lg text-neutral-500 leading-relaxed italic font-light">
                "I’m intrigued by how people interact with technology and the small details that shape their experiences."
              </p>
           </div>
           <div className="bg-white p-12 md:p-20 space-y-6">
              <h2 className="text-3xl font-medium tracking-tight text-yellow-700">Why I prioritize SMBs</h2>
              <p className="text-lg text-neutral-500 leading-relaxed">
                I believe that great design can level the playing field. Small businesses are the heart of communities, and I use design to help their dreams grow into realities.
              </p>
           </div>
        </div>

        {/* SECTION 3: PERSONALITY LIST */}
        <div className="py-32 space-y-24">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-neutral-100 pb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">01 / Traits</span>
                <div className="md:w-2/3">
                    <h3 className="text-4xl md:text-6xl font-medium tracking-tighter flex flex-wrap gap-4">
                        Curious, <span className="text-yellow-700">Adaptive</span>, Collaborative, <span className="italic font-instrumentserif font-light text-neutral-400">forever growing.</span>
                    </h3>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-neutral-100 pb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">02 / Approach</span>
                <div className="md:w-2/3">
                    <p className="text-2xl md:text-4xl text-neutral-800 leading-tight">
                        I focus on being <span className="underline decoration-yellow-200 underline-offset-8">flexible and resourceful</span>. I enjoy finding creative solutions that align with both user needs and business goals.
                    </p>
                </div>
            </div>
        </div>

        {/* SECTION 4: CALL TO ACTION */}
        <div className="bg-neutral-900 p-12 md:p-32 text-center text-white relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
            
            <h2 className="text-4xl md:text-7xl font-medium tracking-tighter mb-12">
                Every project is a chance <br /> to <span className="text-yellow-400 font-instrumentserif italic font-light">tell a new story.</span>
            </h2>
            
            <div className="flex flex-col md:flex-row justify-center gap-6">
                <Button variant="outline" className="rounded-full h-16 px-10 border-white/20 text-black transition-all">
                    What people say
                </Button>
                <Button className="rounded-full h-16 px-10 bg-yellow-600 hover:bg-yellow-500 transition-all flex items-center gap-2">
                    Let's collaborate <ArrowDownRight size={20} />
                </Button>
            </div>
        </div>

      </section>
    </div>
  );
};

export default AboutPage;