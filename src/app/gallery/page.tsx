import Image from "next/image";
import { motion } from "motion/react";

const page = async () => {
  const res = await fetch(
    "https://portfoliostrapicms.onrender.com/api/galleries?populate=*",
    {next:{revalidate:60}}
  );
  const galleries = await res.json();
  const { data } = galleries;
  const gallery = data[0].gallery;

  return (
    <div className="container mx-auto p-4 md:px-16">
      <h1 className="mb-4 w-2/3 max-md:text-2xl text-blue-600 font-bold">
        My recent works as Graphic Designer
      </h1>
      <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="relative h-96 w-full"
          >
            <Image
              src={item.url}
              alt={"Gallery image"}
              className="object-cover"
              priority
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
