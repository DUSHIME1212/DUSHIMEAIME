"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import Link from "next/link";
import { LinkPreview } from "./ui/link-preview";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { fetchExperience } from "~/lib/sanity/experience";

const Hero = () => {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    fetchExperience().then(setExperience);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-hidden pb-12 pt-20 font-dmsans">
      {/* 1. BRUTALIST HEADER */}
      <div className="">
        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[14vw] uppercase leading-[0.8]  tracking-tighter text-neutral-900"
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
            <h2 className="group text-gray-700">
              <span className="text-2xl text-gray-900/60">
                I am a{" "}
                <LinkPreview
                  url=""
                  imageSrc="/image.png"
                  isStatic
                  className="font-medium italic font-instrumentserif underline decoration-neutral-300"
                >
                  designer enthusiast based in RWANDA
                </LinkPreview>
                , I craft human centered experiences and scalable systems where{" "}
                <span className="text-yellow-700 font-instrumentserif italic">design meets logic</span>, and
                emotion meets code. From pixel to product, I merge aesthetics
                with functionality to grow brands and simplify lives. I am
                enthusiastic about joining a dynamic team to{" "}
                <LinkPreview
                  url="https://coursera.org/share/45d02afe3a482586006b893d291be290"
                  className="font-medium font-instrumentserif italic underline decoration-neutral-300"
                >
                  learn UX best practices
                </LinkPreview>
                , collaborate cross functionally, and contribute to innovative
                tech projects
              </span>
            </h2>

            <div className="mt-8 flex flex-wrap gap-2">
              {["React", "TypeScript", "Python", "Go", "Docker"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-neutral-200 px-3 py-1 text-[10px] uppercase tracking-widest text-neutral-500"
                  >
                    {skill}
                  </span>
                ),
              )}
            </div>
          </motion.div>

          {/* 3. TYPEWRITER BOX */}
          <div className="flex items-end lg:col-span-5">
            <div className="w-full   p-6 shadow-sm">
              <p className="mb-2 text-xs uppercase tracking-widest text-neutral-400">
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
      <div className="mt-24">
        {/* HEADER SECTION */}
        <div className="mb-20 flex max-w-4xl flex-col gap-6">
          <span className="block text-xs font-bold uppercase tracking-[0.3em] text-yellow-700">
            + My experience
          </span>
          <h2 className=" font-medium leading-[0.9] tracking-tighter text-neutral-900 ">
            A journey of building products <br />
            <span className="font-light italic font-instrumentserif text-yellow-700">
              that solve real problems.
            </span>
          </h2>
        </div>
        <div className="pt8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {experience.map((item, index) => (
              <ExperienceRow key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ExperienceRow = ({ item }) => (
  <Link
    href="/"
    className="group flex items-center justify-between border-b border-neutral-100 transition-colors hover:border-yellow-700"
  >
    <div className="flex items-center gap-6">
      <div className="relative h-14 w-14 overflow-hidden bg-neutral-100">
        <img
          src={item.companyLogo?.url}
          className="h-full w-full object-cover grayscale transition-all group-hover:grayscale-0"
          alt=""
        />
      </div>
      <div>
        <h3 className="text-xl font-medium  uppercase text-neutral-900 group-hover:text-yellow-700 md:text-2xl">
          {item.title}
        </h3>
        <p className="font-indie text-sm uppercase tracking-widest text-neutral-500">
          {item.company}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      {item.isCurrentlyWorkingHere && (
        <span className="animate-pulse rounded-md bg-green-50 px-2 py-1 text-[10px] font-bold uppercase tracking-tighter text-green-600">
          Present
        </span>
      )}
      <ArrowUpRight
        className="text-neutral-300 transition-colors group-hover:text-yellow-700"
        size={32}
        strokeWidth={1}
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
          className="text-lg font-medium text-yellow-700"
        >
          {examples[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default Hero;
