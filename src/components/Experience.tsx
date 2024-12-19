"use client";
import React from "react";
import { motion } from "motion/react";

const Experience = () => {
  const experience = {
    title: "Software Engineer",
    company: "ABC Corporation",
    location: "New York, NY",
    dates: "2020-2022",
    description:
      "I lead a cross-functional team of 20+ people, including design, user experience research (UXR), and product strategy. I oversee the development of our design system and manage both the team and product to ensure alignment with our cloud-based software suite. I leverage APIs, LLMs (OpenAI), and NLP to build interfaces that automate backend business tasks and organization-wide processes. I deploy design strategies throughout the organization, prioritizing user-centricity and business needs in the creation of PRDs to deliver modern enterprise solutions.",
  };
  return (
    <div className="my-8">
      <div>
        <h1 className="mb-4 text-3xl font-bold">
          I understand designing at scale.
        </h1>
        <p>My experience</p>
      </div>
      <div>
        {[1, 2, 3].map((item, i) => (
          <div key={i} className="group my-4 flex flex-col gap-4">
            <h2 className="text-lg font-light group-hover:font-indie group-hover:text-xl group-hover:underline">
              {experience.title}
            </h2>
            <h3 className="text-sm font-light">{experience.company}</h3>
            <div className="mt-8 grid grid-cols-5 justify-items-end">
              <p className="col-span-4 opacity-70">
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
