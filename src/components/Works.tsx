import Image from "next/image";
import React from "react";

const Works = async () => {
  const res = await fetch("http://localhost:1337/api/projects?populate=*");
  const data = await res.json();
  const projects = data.data;

  const baseurl = "http://localhost:1337";

  const project = {
    title: "Adobe",
    description: "AI multi interactions",
    image:
      "https://cdn.dribbble.com/userupload/17646554/file/original-077e3f2619ee438c80f0cf63a7586d3d.png?resize=1200x900&vertical=center",
    link: "https://www.example.com",
  };
  return (
    <div className="py-8">
      <div className="grid md:grid-cols-3 max-md:grid-rows-2 items-start content-center">
        <h1 className="col-span-1">what I&apos;ve been up to lately</h1>
        <p className="col-span-2 w-full md:w-2/3 opacity-70 text-3xl">Bridging the gap between beautiful and bottom-line results.</p>
      </div>
      <div className="mt-8 grid max-md:grid-cols-1 grid-cols-2 max-md:grid-rows-4 grid-rows-2 content-center gap-4">
        {projects.slice(0,4).map((item, i) => (
          <div
            key={i}
            className="bg- rounded-lg p-4 group min-h-[512px] border-2 border-black shadow-2xl"
          >
            <div className="relative mb-8 h-96 w-full overflow-clip rounded-xl">
              <Image
                src={`${baseurl}/${item.projectImg.formats.large.url}`}
                className="object-cover duration-500 group-hover:scale-125"
                alt=""
                fill
              />
            </div>
            <h3 className="text-5xl mb-2">{item.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;
