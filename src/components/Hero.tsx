"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import Link from "next/link";
import { LinkPreview } from "./ui/link-preview";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Image from "next/image";
import { fetchExperience } from "~/lib/sanity/experience";

const Hero = () => {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    fetchExperience().then(setExperience);
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col justify-between overflow-hidden pb-12 pt-20 font-notion">
      {/* 1. BRUTALIST HEADER */}
      <div className="">
        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[14vw] font-medium uppercase  leading-[0.8] tracking-notion-display text-foreground"
        >
          Don Aime
        </motion.h1>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* 2. SUB-BIO */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-7"
          >
            <h2 className="group text-foreground">
              <span className="text-2xl leading-relaxed">
                I am a{" "}
                <LinkPreview
                  url="/about"
                  imageSrc="/image.png"
                  isStatic
                  className="-offset-4 font-semibold decoration-border decoration-2 transition-colors hover:text-notion-blue"
                >
                  designer enthusiast based in RWANDA
                </LinkPreview>
                , I craft human centered experiences and scalable systems where{" "}
                <span className="font-semibold text-notion-blue italic font-instrumentserif">
                  design meets logic
                </span>
                , and emotion meets code. From pixel to product, I merge
                aesthetics with functionality to grow brands and simplify lives.
                I am enthusiastic about joining a dynamic team to{" "}
                <LinkPreview
                  url="https://coursera.org/share/45d02afe3a482586006b893d291be290"
                  className="-offset-4 font-semibold decoration-border decoration-2 transition-colors hover:text-notion-blue"
                >
                  learn UX best practices
                </LinkPreview>
                , collaborate cross functionally, and contribute to innovative
                tech projects
              </span>
            </h2>

            <div className="mt-10 flex flex-wrap gap-3">
              {["React", "TypeScript", "Python", "Go", "Docker"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-pill border border-border bg-notion-warm-white/50 px-3 py-1 text-[12px] font-medium tracking-notion-badge text-muted-foreground transition-all hover:bg-notion-blue-badge hover:text-notion-blue-badge-text"
                  >
                    {skill}
                  </span>
                ),
              )}
            </div>
          </motion.div>

          {/* 3. TYPEWRITER BOX */}
          <div className="flex items-end lg:col-span-5">
            <div className="whisper-border w-full rounded-lg bg-card p-6 shadow-sm notion-shadow">
              <p className="mb-2 text-[12px] font-semibold uppercase tracking-notion-badge text-muted-foreground">
                Focus
              </p>
              <BlockinText
                examples={[
                  "Crafting Mind-blowing Apps",
                  "UX Design in Rwanda",
                  "Scalable Systems",
                  "Listening to Afrobeats",
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. CAREER TIMELINE (Currently & Previous) */}
      <div className="mt-32">
        {/* HEADER SECTION */}
        <div className="mb-20 flex max-w-4xl flex-col gap-6">
          <span className="block text-[12px] font-semibold uppercase tracking-notion-badge text-notion-blue">
            + My experience
          </span>
          <h2 className="font-medium leading-[1.0] tracking-notion-heading text-foreground">
            A journey of building products <br />
            <span className="font-medium text-muted-foreground">
              that solve real problems.
            </span>
          </h2>
        </div>
        <div className="pt-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {experience.map((item, index) => (
              <ExperienceRow key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceRow = ({ item }) => (
  <Link
    href="/"
    aria-label={`View experience at ${item.company}`}
    className="r group -mx-4 flex w-full items-center justify-between rounded-lg px-4 py-6 transition-all hover:bg-notion-blue-badge/30"
  >
    <div className="flex items-center gap-6">
      <div className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted bg-notion-warm-white border whisper-border">
        {item.companyLogo?.url ? (
          <Image
            src={item.companyLogo?.url}
            fill
            sizes="56px"
            className="object-cover grayscale transition-all group-hover:grayscale-0"
            alt={item.company || "Company logo"}
          />
        ) : (
          <span className="text-[10px] font-medium text-muted-foreground">
            LOGO
          </span>
        )}
      </div>
      <div>
        <h3 className="text-lg font-medium uppercase tracking-notion-subheading text-foreground transition-colors group-hover:text-notion-blue">
          {item.title}
        </h3>
        <p className="text-sm font-medium tracking-notion-body-large text-muted-foreground">
          {item.company}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      {item.isCurrentlyWorkingHere && <span className="badge">Present</span>}
      <ArrowUpRight
        className="text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-notion-blue"
        size={20}
        strokeWidth={2}
      />
    </div>
  </Link>
);

// REFINED TYPEWRITER
export function BlockinText({ examples }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((p) => (p + 1) % examples.length),
      4000,
    );
    return () => clearInterval(interval);
  }, [examples]);

  return (
    <div className="h-8 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="text-lg font-semibold text-notion-blue"
        >
          {examples[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default Hero;
