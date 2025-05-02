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

const Hero = () => {
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
    <div className="mt-8 flex flex-col gap-8">
      <h2 className="group text-gray-700">
        <span className="relative max-md:text-2xl text-blue-800">
          Dushime Aime
          <svg
            className="-bottom-18 absolute left-4 -translate-x-2 scale-110"
            viewBox="0 0 218 56"
            strokeWidth={2}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{
                duration: 1.25,
              }}
              d="M1.51172 11.0845C23.2893 7.41922 37.3034 6.14753 64.331 4.23815C91.3586 2.32877 146.422 0.190756 211.293 6.631"
              stroke="#FFFB00FF"
              stroke-width="9"
              stroke-linecap="round"
            />
          </svg>
        </span>{" "}
        <TextAnimate className=" max-md:text-xl leading-none">
          I craft human-centered experiences and scalable systems where design
          meets logic, and emotion meets code. From pixel to product, I merge
          aesthetics with functionality to grow brands and simplify lives
        </TextAnimate>
      </h2>
      <BlockinText
        tag={"/support"}
        examples={[
          "I design apps, and websites that blow your mind",
          "I am a UX/UI Designer based in RWANDA 🇷🇼",
          "I am a Developer based in RWANDA 🇷🇼",
          "My favourite Gerne is Afrobeats 🪘",
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
                  className="bg-yellow-500 duration-500 hover:bg-blue-700"
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
        <p className="m-0 text-sm opacity-60">Currently</p>
        <div className="group m-0 h-fit w-fit px-0 no-underline">
          {jobs.map((item, index) => (
            <div key={index} className="group flex flex-col gap-2">
              <Link
                href={item.link}
                className="items-cente capitalizer flex gap-2 text-xl"
              >
                <img src={item.img} alt="" className="size-16 object-cover" />
                {item.title}{" "}
                <span className="font-indie group-hover:text-blue-700 group-hover:underline">
                  {item.company}
                </span>
                <ArrowUpRight />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start">
        <p className="text-sm opacity-60">previous roles</p>

        <h1 className="group px-0 no-underline">
          <Link href="" className="flex items-center gap-2 text-xl">
            Digital Marketing intern at{" "}
            <span className="font-indie group-hover:underline">Extern</span>
            <ArrowUpRight />
          </Link>
        </h1>
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
            className="font-dmsans text-3xl text-yellow-500"
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
            className="bg-700 absolute bottom-[3px] left-[1px] right-0 top-[3px]"
          />
        </motion.span>
      ))}
    </h6>
  );
}
