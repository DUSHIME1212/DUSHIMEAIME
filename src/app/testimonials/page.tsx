import Image from "next/image";
import React from "react";
import { testimonials } from "~/lib/utils";

const page = () => {
  const profileimage =
    "https://media.giphy.com/media/10M8Yr4WKJK63e/giphy.gif?cid=ecf05e47e1sxe98n9urf94glnw7lwws0up8egd7d7mei3c6s&ep=v1_gifs_search&rid=giphy.gif&ct=g";

  return (
    <section className="mb-32">
      {/* topsection */}
      <div className="flex min-h-96 flex-col rounded-b-[96px] bg-blue-700 px-8 text-white md:flex-row md:px-16 lg:px-32">
        <div className="flex w-full flex-col justify-center gap-4 md:w-1/2">
          <h3 className="text-4xl">Testimonials</h3>
          <h1 className="">
            I ve designed @ a lot of places, seen a lot of faces
          </h1>
          <p>
            Here are some kind testaments to me, my design craft, leadership,
            dedication, and XFN collaboration.
          </p>
        </div>
        <div className="w-full p-8 md:w-1/2">
          <div className="relative min-h-[512px] w-full scale-90 overflow-clip rounded-[96px] border-4 border-white grayscale">
            <Image src={profileimage} alt="" className="object-cover" fill />
          </div>
        </div>
      </div>
      {/* topsection */}
      <div className="mt-16 px-8 md:px-16 lg:px-32">
        <h2 className="mb-8 text-5xl font-thin">Testimonials</h2>
        <p></p>
        <div className="grid grid-cols-1 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="min-h-[512px] overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <div className="flex p-6">
                <div className="relative mb-4 min-h-[512px] w-1/2 items-center">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover scale-75 rounded-3xl"
                  />
                </div>
                <div className="flex w-1/2 flex-col gap-4 p-8">
                  <h3 className="text-5xl font-bold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                  <p className="text-2xl text-gray-700">
                    {testimonial.testimonial}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
