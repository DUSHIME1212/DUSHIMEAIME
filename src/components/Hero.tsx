"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect/dist/core";
import { easeInOut, motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowDownRight, ArrowUpRight } from "@geist-ui/icons";
import { TextAnimate } from "./magicui/text-animate";
import { jobs } from "~/lib/projects";
import { BlurFade } from "./magicui/blur-fade";
import { Badge } from "./ui/badge";
import { fetchExperience } from "~/lib/sanity/experience";
import Imigongo from "./Imigongo";
import Posters from "./Posters";
import { LinkPreview } from "./ui/link-preview";

const Hero = () => {
  const [experience, setExperience] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchExperience();
        setExperience(response);
        console.log("Experience data fetched:", response);
      } catch (error) {
        console.error("Error fetching experience data:", error);
      }
    }
    fetchData();
  }, []);

  const typewriterRef = useRef(null);
  const BLUR_FADE_DELAY = 0.04;

  const skills = [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Python",
    "Go",
    "Postgres",
    "Docker",
    "Kubernetes",
    "Java",
    "C++",
  ];

  return (
    <div className="mt-8 flex flex-col gap-8 overflow-clip">
      <div className="relative flex w-full flex-col gap-4 overflow-hidden">
        <h1 className="text-[10rem]">DON Aime</h1>
        <h2 className="group text-gray-700">
          <span className="text-gray-900/60 text-2xl ">
            I am a{" "}
            <LinkPreview
              url="/"
              imageSrc="/image.png"
              isStatic
              className="font-bold"
            >
            designer enthusiast based in RWANDA 
            </LinkPreview>
            , I craft human centered experiences and scalable systems where
            design meets logic, and emotion meets code. From pixel to product, I
            merge aesthetics with functionality to grow brands and simplify
            lives.I am enthusiastic about joining a dynamic team to{" "}
            <LinkPreview
              url="https://coursera.org/share/45d02afe3a482586006b893d291be290"
              className="font-bold"
            >
              learn UX best practices
            </LinkPreview>
            , collaborate cross-functionally, and contribute to innovative tech
            projects
          </span>
        </h2>
      </div>
      <BlockinText
        tag={"/support"}
        examples={[
          "I design apps, and websites that blow your mind",
          "I am a ux/ui designer based in RWANDA",
          "I am a developer based in RWANDA",
          "My favourite Gerne is afrobeats",
        ]}
      />
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1 lg:w-1/3">
            {skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge
                  className="bg-blue-700 duration-500 hover:bg-blue-500"
                  key={skill}
                >
                  {skill}
                </Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <div className="flex flex-col gap-2">
        <p className="m-0 mb-4 text-sm opacity-60">Currently</p>
        <div className="group m-0 grid h-fit w-full grid-cols-1 gap-x-8 px-0 no-underline lg:grid-cols-2">
          {experience.map(
            (item, index) =>
              item.isCurrentlyWorkingHere === true && (
                <div
                  key={index}
                  className="group flex w-full flex-col justify-between gap-2"
                >
                  <Link
                    href={""}
                    className="uppercase flex w-full items-center justify-between gap-2 text-xl"
                  >
                    <div className="flex items-center gap-8">
                      <img
                        src={item.companyLogo.url}
                        alt=""
                        className="size-16 rounded-2xl overflow-clip  object-cover"
                      />
                      {item.title}{" "}
                    </div>
                    <span className="font-indie group-hover:text-blue-700 group-hover:underline">
                      {item.company}
                    </span>
                    <ArrowUpRight />
                  </Link>
                </div>
              ),
          )}
        </div>
      </div>

      <div className="flex flex-col items-start">
        <p className="mb-4 text-sm opacity-60">previous roles</p>

        <div className="group m-0 grid h-fit w-full grid-cols-1 gap-8 px-0 no-underline lg:grid-cols-2">
          {experience.map(
            (item, index) =>
              item.isCurrentlyWorkingHere == false && (
                <div
                  key={index}
                  className="group w-full flex-col justify-between gap-2"
                >
                  <Link
                    href={""}
                    className="uppercase flex w-full items-center justify-between gap-2 text-xl"
                  >
                    <div className="flex items-center gap-8">
                      <img
                        src={item.companyLogo.url}
                        alt=""
                        className="size-16 rounded-2xl overflow-clip object-cover"
                      />
                      {item.title}{" "}
                    </div>
                    <span className="font-indie group-hover:text-blue-700 group-hover:underline">
                      {item.company}
                    </span>
                    <ArrowUpRight />
                  </Link>
                </div>
              ),
          )}
        </div>
      </div>
      <Button
        variant={"gooeyLeft"}
        size={"lg"}
        className="w-fit gap-2 rounded-full bg-blue-700 from-blue-400"
      >
        <Link href={"works"} className="flex items-center">
          View all my work <ArrowUpRight />
        </Link>
      </Button>
    </div>
  );
};

export default Hero;

export function BlockinText({ tag, examples }) {
  return (
    <>
      <Typewrite examples={examples} />
      <hr />
    </>
  );
}

const letterDelays = 0.025;
const Box_fade = 0.125;
const fadedelays = 5;
const Mainfadedelays = 0.25;

const swapdelayms = 5500;

export function Typewrite({ examples }) {
  const [exampleindex, setexampleindex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setexampleindex((pv) => (pv + 1) % examples.length);
    }, swapdelayms);
    return () => clearInterval(intervalId);
  }, [swapdelayms]);
  return (
    <h6>
      {examples[exampleindex].split("").map((l, i) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={`${exampleindex}-${i}`}
          className="relative"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: i * letterDelays,
              duration: Box_fade,
              ease: easeInOut,
            }}
            className="font-dmsans -z-10 text-3xl text-yellow-500"
          >
            {l}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              times: [0, 0.1, 1],
              delay: i * letterDelays,
              duration: Box_fade,
              ease: easeInOut,
            }}
            className="bg-700 absolute  bottom-[3px] left-[1px] right-0 top-[3px]"
          />
        </motion.span>
      ))}
    </h6>
  );
}
