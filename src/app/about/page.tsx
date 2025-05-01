import Image from "next/image";
import React from "react";
import { TextAnimate } from "~/components/magicui/text-animate";
import { Button } from "~/components/ui/button";
import { AnimateParagraph } from "~/lib/Animation";

const page = () => {
  const profileimage =
    "https://media.licdn.com/dms/image/v2/D4D03AQG_xHTiI0XdOg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1730247106432?e=1750291200&v=beta&t=mt_rYq4IYdlys3f-BE0tmSkH4toOPX14OjbN14Wq054";
  return (
    <section className="mb-32 px-8 md:px-36 lg:px-72">
      {/* topsection */}
      <div className="flex min-h-96 flex-col gap-16 md:flex-row">
        <div className="flex w-full flex-col justify-center gap-4 md:w-1/2">
          <h3>About</h3>
          <h1 className="group tracking-tighter">
            Hello world, I am{" "}
            <span className="duration-500 group-hover:text-foreground">
              DUSHIME AIME
            </span>
          </h1>
          <TextAnimate className="text-xl">
            I bet I can guess why youre here. I am pretty sure why, but as a
            designer, I have learned not to assume things.I am a junior UX
            designer passionate about crafting user-centered experiences that
            make a difference.
          </TextAnimate>
        </div>
        <div className="w-full md:w-1/2">
          <div className="relative size-full min-h-[512px] scale-100 overflow-clip  grayscale lg:scale-9">
            <Image src={profileimage} alt="" className="object-cover" fill />
          </div>
        </div>
      </div>
      {/* topsection */}
      <div className="mt-8 flex flex-col gap-8">
        <div className="w-2/3">
          <h2 className="mb-8  tracking-tighter text-foreground font-bold">
            Where empathy meets impact
          </h2>
          <TextAnimate className="w-2/3">
            Im intrigued by how people interact with technology and the small
            details that shape their experiences. My design process revolves
            around understanding users' needs, motivations, and challenges, and
            translating that understanding into intuitive and impactful
            solutions.
          </TextAnimate>
        </div>
        <div className="">
          <h2 className="mb-8 tracking-tighter  text-foreground font-bold max-md:font-medium">
            Why I prioritize SMBs
          </h2>
          <TextAnimate className="w-2/3">
            Growing up, I saw firsthand the hard work and resilience of small
            business owners in my community. Their struggles with limited
            resources and visibility inspired me to use design as a way to
            empower them. I believe that great design can level the playing
            field and help dreams grow into realities.
          </TextAnimate>
          <div className="my-4 mt-16 flex flex-col gap-4 text-xl md:flex-row">
            <h4 className="w-full text-foreground md:w-1/3">Me in 3 words</h4>
            <p className="w-2/3 cursor-pointer font-medium">
              Curious, Adaptive, Collaborative,
              <span className="duration-500 hover:text-blue-700">
                forever growing
              </span>
              , also a critical thinker Monday-Friday
            </p>
          </div>
          <div className="my-4 mt-16 flex flex-col gap-4 text-xl md:flex-row">
            <h4 className="w-full text-foreground md:w-1/3">My Approach to Problem-Solving</h4>
            <TextAnimate className="w-full cursor-pointer opacity-80 max-md:font-medium md:w-2/3">
              As a junior designer, I focus on being flexible and resourceful
              when tackling challenges. I enjoy collaborating with others to
              find creative, effective solutions that align with both user needs
              and business goals. My goal is to make every project a step toward
              creating meaningful, user-friendly designs.
            </TextAnimate>
          </div>
        </div>
      </div>
      <div className="my-4 mt-16 flex w-full flex-col gap-8">
        <h1 className="tracking-tighter text-foreground max-md:font-medium">
          Who are you as a designer?
        </h1>
        <TextAnimate className="w-full text-xl opacity-80 md:w-2/3">
          For me, design isn’t just about solving problems – it’s about telling
          a story. Each project is a chance to create something that resonates
          with users and makes their lives a little easier. Let me know if you'd
          like any adjustments! 😊
        </TextAnimate>
        <Button
          variant={"gooeyRight"}
          size={"lg"}
          className="w-fit bg-foreground rounded-full text-xl"
        >
          What people say about me
        </Button>
      </div>
      <div className="mt-8 flex w-2/3 flex-col gap-2">
        <h4 className="mb-4 tracking-tighter text-6xl text-foreground font-bold">Teamwork Makes the Difference</h4>
        <p className="text-xl opacity-80 max-md:font-medium">
          I thrive in cross-functional teams where I can learn from engineers,
          product managers, and other designers. I value feedback and see every
          project as an opportunity to grow, improve, and contribute to
          something impactful.
        </p>
      </div>
    </section>
  );
};

export default page;
