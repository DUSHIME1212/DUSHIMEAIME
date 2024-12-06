import Image from "next/image";
import React from "react";
import { Button } from "~/components/ui/button";

const page = () => {
  const profileimage =
    "https://media.licdn.com/dms/image/v2/D4D03AQG_xHTiI0XdOg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730247106450?e=1738800000&v=beta&t=oGaMbDGB4wn92s8uaNeO2kCfxdD_Lvjotnel6vv3u1A";
  return (
    <section className="mb-32 px-8 md:px-16 lg:px-32">
      {/* topsection */}
      <div className="flex min-h-96 flex-col md:flex-row">
        <div className="flex w-full flex-col justify-center gap-4 md:w-1/2">
          <h3>About</h3>
          <h1 className="group font-indie">
            Hello world, I am{" "}
            <span className="duration-500 group-hover:text-blue-700">
              DUSHIME AIME
            </span>
          </h1>
          <p>
            I bet I can guess why youre here. Im pretty sure why, but as a
            designer, Ive learned not to assume things.
          </p>
        </div>
        <div className="w-full p-8 md:w-1/2">
          <div className="relative min-h-[512px] w-full scale-90 overflow-clip rounded-3xl grayscale">
            <Image src={profileimage} alt="" className="object-cover" fill />
          </div>
        </div>
      </div>
      {/* topsection */}
      <div className="flex flex-col gap-8">
        <div className="w-2/3">
          <h2 className="mb-8 text-5xl font-thin">
            Where empathy meets impact
          </h2>
          <p>
            Im fascinated by the subtle nuances of human behavior and how they
            shape interactions with technology. In my design process, I focus on
            understanding the context of use – the unspoken needs, motivations,
            and pain points of the people behind the screen. This deep
            understanding allows me to forge seamless, scalable experiences that
            not only solve problems but genuinely connect with users.
          </p>
        </div>
        <div className="">
          <h2 className="mb-8 text-5xl max-md:font-medium font-thin">Why I prioritize SMBs</h2>
          <p className="w-2/3">
            Growing up, I saw the determination of small business owners in my
            community, the way they poured their hearts into their dreams.
            However, I also witnessed how a lack of resources or visibility
            could limit their reach. My own experience of not always having
            access to the things my peers did instilled a deep desire to level
            the playing field.
          </p>
          <div className="my-4 mt-16 flex flex-col gap-4 md:flex-row text-xl">
            <h4 className="w-1/3">Me in 3 words</h4>
            <p className="w-2/3 cursor-pointer font-thin opacity-60">
              Versatile, multidisciplinary,{" "}
              <span className="duration-500 hover:text-blue-700">
                forever growing
              </span>
              , also a critical thinker Monday-Friday
            </p>
          </div>
          <div className="my-4 mt-16 flex flex-col gap-4 md:flex-row text-xl">
            <h4 className="w-1/3">How I stand out as a designer</h4>
            <p className="w-2/3 cursor-pointer max-md:font-medium font-thin opacity-80">
              What sets me apart is my willingness to adapt and optimize
              solutions for a variety of problems. I ve been told that I have a
              very efficient and unique approach to problem-solving. I love
              adding value to the product I m creating or optimizing. At the end
              of the day, you have to create something outstanding to be the
              best of the best. I understand that.
            </p>
          </div>
        </div>
      </div>
      <div className="my-4 mt-16 flex w-full flex-col gap-8">
        <h1 className="font-thin max-md:font-medium">Who are you as a designer?</h1>
        <p className="w-2/3 text-xl opacity-80">
          I love working cross-functionally. I ve received amazing feedback from
          engineers, PMs, content designers, and other product designers on my
          team. It provides me with a chance to grow, learn new things, and
          witness how design brings people closer for the greater good.
        </p>
        <Button
          variant={"gooeyRight"}
          size={"lg"}
          className="w-fit rounded-full text-xl"
        >
          What people say about me
        </Button>
      </div>
      <div className="w-2/3 flex flex-col mt-8 gap-2">
        <h4 className="font-medium text-2xl underline">My process at its core</h4>
        <p className="text-xl max-md:font-medium font-thin opacity-80">
          The eureka moment during the design process is only the start.
          Bringing the solution to life through storytelling – thats the true
          power of design.
        </p>
      </div>
    </section>
  );
};

export default page;
