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
    <div className="bg-background font-notion selection:bg-notion-blue/20 selection:text-notion-blue">
      <div className="mt-16">
        <HeroSection />
      </div>

      <section className="px-6 md:px-20 lg:px-32 pb-40" ref={containerRef}>
        
        {/* SECTION 1: IDENTITY */}
        <div className="flex flex-col lg:flex-row gap-20 items-start py-20">
          <div className="w-full space-y-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-notion-blue-badge text-notion-blue-badge-text border whisper-border">
              <Sparkles size={14} />
              <span className="text-[10px] font-medium uppercase tracking-notion-badge">The Designer</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-medium tracking-notion-display leading-[0.85] text-foreground">
              Hello world, <br />
              I am <span className="relative inline-block text-notion-blue">
                DUSHIME AIME
              </span>
            </h1>

            <div className="max-w-md">
                <TextAnimate className="text-xl md:text-2xl text-foreground font-medium leading-relaxed" animation="blurInUp" by="word">
                I craft user-centered experiences that bridge the gap between human emotion and scalable logic.
                </TextAnimate>
            </div>
          </div>

          {/* PROFILE IMAGE WITH PARALLAX */}

        </div>

        {/* SECTION 2: THE "WHY" (Grid with depth) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border whisper-border mt-20 rounded-lg overflow-hidden notion-shadow">
           <div className="bg-card p-12 md:p-20 space-y-6">
              <h2 className="text-3xl font-medium tracking-notion-heading">Where empathy meets impact</h2>
              <p className="text-lg text-foreground leading-relaxed font-medium">
                "I’m intrigued by how people interact with technology and the small details that shape their experiences."
              </p>
           </div>
           <div className="bg-card p-12 md:p-20 space-y-6">
              <h2 className="text-3xl font-medium tracking-notion-heading text-notion-blue">Why I prioritize SMBs</h2>
              <p className="text-lg text-foreground leading-relaxed font-medium">
                I believe that great design can level the playing field. Small businesses are the heart of communities, and I use design to help their dreams grow into realities.
              </p>
           </div>
        </div>

        {/* SECTION 3: PERSONALITY LIST */}
        <div className="py-32 space-y-24">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 pb-12">
                <span className="text-xs font-medium uppercase tracking-notion-badge text-muted-foreground">01 / Traits</span>
                <div className="md:w-2/3">
                    <h3 className="text-4xl md:text-6xl font-medium tracking-notion-display flex flex-wrap gap-4 text-foreground">
                        Curious, <span className="text-notion-blue">Adaptive</span>, Collaborative, <span className="text-muted-foreground font-medium underline decoration-notion-blue/20 decoration-2 underline-offset-8">forever growing.</span>
                    </h3>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-8  pb-12">
                <span className="text-xs font-medium uppercase tracking-notion-badge text-muted-foreground">02 / Approach</span>
                <div className="md:w-2/3">
                    <p className="text-2xl md:text-4xl text-foreground font-medium leading-tight tracking-notion-subheading">
                        I focus on being <span className="underline decoration-notion-blue/20 underline-offset-8">flexible and resourceful</span>. I enjoy finding creative solutions that align with both user needs and business goals.
                    </p>
                </div>
            </div>
        </div>

        {/* SECTION 4: CALL TO ACTION */}
        <div className="bg-foreground p-12 md:p-32 text-center text-background relative overflow-hidden rounded-lg">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
            
            <h2 className="text-4xl md:text-7xl font-medium tracking-notion-display mb-12 text-background">
                Every project is a chance <br /> to <span className="text-notion-blue font-medium decoration-notion-blue/30 decoration-4 underline-offset-8">tell a new story.</span>
            </h2>
            
            <div className="flex flex-col md:flex-row justify-center gap-6">
                <Button variant="outline" className="rounded-pill h-16 px-10 border-white/20 text-foreground bg-background transition-all hover:bg-notion-warm-white">
                    What people say
                </Button>
                <Button className="rounded-pill h-16 px-10 bg-notion-blue hover:bg-notion-blue-focus transition-all flex items-center gap-2 font-medium">
                    Let's collaborate <ArrowDownRight size={20} />
                </Button>
            </div>
        </div>

      </section>
    </div>
  );
};

export default AboutPage;