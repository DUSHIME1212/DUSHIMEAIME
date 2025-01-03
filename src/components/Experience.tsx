"use client";
import React from "react";
import { motion } from "motion/react";
import { experience } from "~/lib/utils";
import { AnimateParagraph } from "~/lib/Animation";

const Experience = () => {
  
  return (
    <div className="my-8">
      <div>
        <h1 className="mb-4 w-full text-3xl md:text-5xl md:w-1/3 text-sky-700 font-bold">
          I understand designing at scale.
        </h1>
        <p>My experience</p>
      </div>
      <div>
        {experience.map((experience, i) => (
          <div key={i} className="group my-4 flex flex-col cursor-pointer gap-4 duration-500">
            <h4 className="text-4xl text-sky-700 font-medium duration-500">
              {experience.title}
            </h4>
            <h3 className="text-3xl font-medium duration-500">{experience.company}</h3>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-5 justify-items-start">
              <AnimateParagraph className="col-span-4 w-2/3 opacity-70 font-normal text-xl line-clamp-6 ">
                {experience.description}
              </AnimateParagraph>
              <p className="group-hover:underline">{experience.dates}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;

function AnimateTexxt({
  children,
  className,
}: {
  children: string;
  className: string;
}) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        delay: 1,
        duration: 1,
        ease: "easeInOut",
        staggerChildren: 0.01,
      }}
      className={className}
    >
      {children.split("").map((l, i) => (
        <motion.span
          initial={{ opacity: 0, filter: "blur(5px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.002 * i }}
          className="inline-bloc"
          key={i}
        >
          {l}
        </motion.span>
      ))}
    </motion.p>
  );
}
