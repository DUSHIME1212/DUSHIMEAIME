"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Typewriter from "typewriter-effect/dist/core";
import { Button } from "./ui/button";
import { ArrowDownRight, ArrowUpRight } from "@geist-ui/icons";

const Hero = () => {
  const typewriterRef = useRef(null);

  useEffect(() => {
    const typewriter = new Typewriter(typewriterRef.current, {
      delay: 75,
      cursor: "|",
      loop: true,
    });

    typewriter
      .typeString("I design apps, and websites that blow your mind")
      .pauseFor(1000)
      .deleteAll()
      .typeString("I am a UX/UI Designer based in RWANDA")
      .start()
      .deleteAll()
      .typeString("I am a Developer based in RWANDA")
      .start()
      .deleteAll()
      .typeString("My favourite Gerne is Afrobeats")
      .start();

    return () => {
      //   typewriter.stop();
    };
  }, []);

  return (
    <div className="mt-8 flex flex-col gap-8">
      <h2 className="leading-10 group text-gray-700">
        <span className="cursor-pointer font-indie text-7xl duration-700 group-hover:text-blue-700">
          Dushime Aime
        </span>{" "}
        is a human-focused designer scaling products and businesses through
        niche, meaningful, and intuitive experiences.
      </h2>
      <h1
        className="cursor-pointer font-thin font-indie text-3xl duration-500"
        ref={typewriterRef}
      ></h1>
      <div className="mt-8">
        <p className="text-sm opacity-60">Currently</p>
        <Button variant={"link"} className="px-0">
          <Link href="" className="flex gap-2 text-xl items-center">
            Product Designer at <span className="font-indie">Code empowerment</span>
            <ArrowUpRight />
          </Link>
        </Button>
      </div>
      <div className="flex flex-col items-start">
        <p className="text-sm opacity-60">previous roles</p>
        <h1 className="px-0 group">
          <Link href="" className="flex gap-2 text-xl items-center">
            Creative Designer at <span className="font-indie group-hover:underline">Founders Society</span>
            <ArrowUpRight />
          </Link>
        </h1>
        <h1 className="px-0 group no-underline">
          <Link href="" className="flex gap-2 text-xl items-center">
            Digital Marketing intern at <span className="font-indie group-hover:underline">Extern</span>
            <ArrowUpRight />
          </Link>
        </h1>
      </div>
      <Button variant={"gooeyLeft"} size={"lg"} className="rounded-full w-fit gap-2">View all my work <ArrowUpRight/></Button>

    </div>
  );
};

export default Hero;
