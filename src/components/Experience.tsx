"use client";
import React from "react";
import { motion } from "motion/react";
import { experience } from "~/lib/utils";

const Experience = () => {
  
  return (
    <div className="my-8">
      <div>
        <h1 className="mb-4 text-3xl font-bold">
          I understand designing at scale.
        </h1>
        <p>My experience</p>
      </div>
      <div>
        {experience.map((experience, i) => (
          <div key={i} className="group my-4 flex flex-col hover:bg-blue-700 rounded-xl hover:text-white cursor-pointer p-4 gap-4 duration-500">
            <h4 className="text-4xl font-light group-hover:text-white">
              {experience.title}
            </h4>
            <h3 className="text-3xl font-indie group-hover:text-white duration-500">{experience.company}</h3>
            <div className="mt-2 grid grid-cols-5 justify-items-start">
              <p className="col-span-4 w-2/3 opacity-70 font-normal text-xl group-hover:text-white">
                {experience.description}
              </p>
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
