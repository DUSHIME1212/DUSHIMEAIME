import Image from "next/image";
import React from "react";
import HeroSection from "~/components/hero-section";
import { TextAnimate } from "~/components/magicui/text-animate";
import { Button } from "~/components/ui/button";
import { AnimateParagraph } from "~/lib/Animation";

const page = () => {
  const profileimage = "/image.png";
  return (
    <>
      <div className="mt-16">
        <HeroSection />
      </div>
      <section className="mb-32 px-8 md:px-36">
        {/* topsection */}
        <div className="flex min-h-96 flex-col gap-16 md:flex-row">
          <div className="flex w-full flex-col justify-center gap-4 md:w-1/2">
            <h3>About</h3>
            <h1 className="group tracking-tighter">
              Hello world, I am{" "}
              <span className="relative text-blue-700">
                DUSHIME AIME
                <svg
                  className="absolute hidden -bottom-6 left-0 w-full"
                  viewBox="0 0 906 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.50357 55.5206C3.92016 55.6543 2.45389 56.4123 1.42721 57.6265C0.400546 58.8409 -0.102425 60.4121 0.0290536 61.9957C0.160532 63.5794 0.915721 65.0461 2.12859 66.0745C3.34146 67.1029 4.91266 67.6087 6.49643 67.4794C6.49643 67.4794 6.49643 67.4794 6.49643 67.4794C22.3656 66.1833 37.9786 64.9128 53.3385 63.6679C278.433 46.0674 505.474 25.6802 731.184 18.7693C780.451 18.4165 845.649 19.5029 876.582 36.7654C876.571 36.8387 876.443 36.8318 876.166 36.548C875.902 36.2796 875.557 35.7783 875.304 35.1702C874.737 33.9041 874.824 32.3926 874.782 32.2187C874.762 31.896 874.464 32.3935 873.915 33C873.361 33.6469 872.443 34.6337 871.544 35.4678C867.391 39.4044 861.923 43.2704 855.661 47.3806C851.774 49.9277 849.147 53.8742 848.44 58.4643C847.729 63.0478 848.996 67.8992 851.881 71.8388C854.765 75.7785 859.008 78.4513 863.592 79.157C868.181 79.8693 872.737 78.5564 876.339 75.6194C876.339 75.6194 876.339 75.6194 876.339 75.6194C883.218 70.0005 889.198 64.9039 895.814 56.8976C897.252 55.0944 899.021 52.7211 900.537 50.1371C901.312 48.8107 901.917 47.665 902.669 45.9989C903.441 44.2787 904.1 42.4521 904.579 40.4963C905.518 37.0327 905.859 30.9707 904.113 26.1989C902.596 21.4595 899.021 17.194 896.553 15.1776C831.268 -11.1356 784.758 6.67289 730.864 4.77301C504.22 12.5136 277.51 33.3755 52.3426 51.5828C36.9835 52.8691 21.3716 54.1817 5.50357 55.5206Z"
                    fill="blue"
                  />
                </svg>
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
            <div className="lg:scale-9 relative size-full min-h-[512px] scale-100 overflow-clip grayscale">
              <Image
                src={profileimage}
                alt=""
                className="object-cover object-top"
                fill
              />
            </div>
          </div>
        </div>
        {/* topsection */}
        <div className="mt-8 flex flex-col gap-8">
          <div className="w-2/3">
            <h2 className="mb-8 tracking-tighter text-foreground">
              Where empathy meets impact
            </h2>
            <TextAnimate className="w-2/3">
              Im intrigued by how people interact with technology and the small
              details that shape their experiences. My design process revolves
              around understanding users' needs, motivations, and challenges,
              and translating that understanding into intuitive and impactful
              solutions.
            </TextAnimate>
          </div>
          <div className="">
            <h2 className="mb-8  tracking-tighter text-foreground max-md:font-medium">
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
              <h4 className="w-full md:w-1/3">Me in 3 words</h4>
              <p className="w-2/3 cursor-pointer font-medium">
                Curious, Adaptive, Collaborative,
                <span className="duration-500 hover:text-blue-700">
                  forever growing
                </span>
                 also a critical thinker Monday-Friday
              </p>
            </div>
            <div className="my-4 mt-16 flex flex-col gap-4 text-xl md:flex-row">
              <h4 className="w-full text-foreground md:w-1/3">
                My Approach to Problem-Solving
              </h4>
              <TextAnimate className="w-full cursor-pointer md:w-2/3">
                As a junior designer, I focus on being flexible and resourceful
                when tackling challenges. I enjoy collaborating with others to
                find creative, effective solutions that align with both user
                needs and business goals. My goal is to make every project a
                step toward creating meaningful, user-friendly designs.
              </TextAnimate>
            </div>
          </div>
        </div>
        <div className="my-4 mt-16 flex w-full flex-col gap-8">
          <h1 className="tracking-tighter text-foreground max-md:font-medium">
            Who are you as a designer?
          </h1>
          <TextAnimate className="w-full text-xl opacity-80 md:w-2/3">
            For me, design isn’t just about solving problems – it’s about
            telling a story. Each project is a chance to create something that
            resonates with users and makes their lives a little easier. Let me
            know if you'd like any adjustments! 😊
          </TextAnimate>
          <Button
            variant={"gooeyRight"}
            size={"lg"}
            className="w-fit rounded-full bg-foreground text-xl"
          >
            What people say about me
          </Button>
        </div>
        <div className="mt-8 flex w-2/3 flex-col gap-2">
          <h4 className="mb-4  tracking-tighter text-foreground">
            Teamwork Makes the Difference
          </h4>
          <p className="text-xl opacity-80 max-md:font-medium">
            I thrive in cross-functional teams where I can learn from engineers,
            product managers, and other designers. I value feedback and see
            every project as an opportunity to grow, improve, and contribute to
            something impactful.
          </p>
        </div>
      </section>
    </>
  );
};

export default page;
