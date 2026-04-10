"use client";
import React from "react";
import { motion } from "motion/react";
import { experience } from "~/lib/utils";
import { AnimateParagraph } from "~/lib/Animation";

const Experience = () => {
  
  return (
    <div className="my-16 font-notion">
      <div className="mb-12">
        <h1 className="mb-4 w-full text-[48px] md:text-[64px] font-medium tracking-notion-display leading-[1.0] text-notion-blue">
          I understand designing at scale.
        </h1>
        <p className="caption tracking-notion-badge uppercase font-medium text-muted-foreground">+ My experience</p>
      </div>
      <div className="grid gap-12">
        {experience.map((exp, i) => (
          <div key={i} className="group flex flex-col cursor-pointer gap-6 p-8 rounded-lg whisper-border bg-card notion-shadow transition-all duration-500 hover:notion-shadow-deep">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h4 className="text-[26px] font-medium tracking-notion-subheading text-notion-blue group-hover:translate-x-1 transition-transform">
                {exp.title}
              </h4>
              <p className="caption font-medium bg-notion-blue-badge text-notion-blue-badge-text px-3 py-1 rounded-pill">{exp.dates}</p>
            </div>
            <h3 className="text-[22px] font-medium tracking-notion-card-title text-foreground">{exp.company}</h3>
            <div className="">
              <AnimateParagraph className="w-full text-[16px] leading-[1.5] text-muted-foreground line-clamp-6">
                {exp.description}
              </AnimateParagraph>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
