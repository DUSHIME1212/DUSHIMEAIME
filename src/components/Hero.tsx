"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect/dist/core";
import { easeInOut, motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowDownRight, ArrowUpRight } from "@geist-ui/icons";

const Hero = () => {
  const typewriterRef = useRef(null);

  return (
    <div className="mt-8 flex flex-col gap-8">
      <h2 className="group leading-10 text-gray-700">
        <span className="relative text-blue-800">
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
              stroke="#FFFF00FF"
              stroke-width="9"
              stroke-linecap="round"
            />
          </svg>
        </span>{" "}
        is a human-focused designer scaling products and businesses through
        niche, meaningful, and intuitive experiences.
      </h2>
      <BlockinText
        tag={"/support"}
        examples={[
          "I design apps, and websites that blow your mind",
          "I am a UX/UI Designer based in RWANDA",
          "I am a Developer based in RWANDA",
          "My favourite Gerne is Afrobeats",
        ]}
      />
      <div className="">
        <p className="text-sm opacity-60">Currently</p>
        <Button variant={"link"} className="px-0">
          <Link href="" className="flex items-center gap-2 text-xl">
            Product Designer at{" "}
            <span className="font-indie">Code empowerment</span>
            <ArrowUpRight />
          </Link>
        </Button>
      </div>
      <div className="flex flex-col items-start">
        <p className="text-sm opacity-60">previous roles</p>
        <h1 className="group px-0">
          <Link href="" className="flex items-center gap-2 text-xl">
            Creative Designer at{" "}
            <span className="font-indie group-hover:underline">
              Founders Society
            </span>
            <ArrowUpRight />
          </Link>
        </h1>
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
        className="w-fit gap-2 rounded-full"
      >
        View all my work <ArrowUpRight />
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
            className="font-indie text-3xl"
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
            className="absolute bottom-[3px] left-[1px] right-0 top-[3px] bg-black"
          />
        </motion.span>
      ))}
    </h6>
  );
}
