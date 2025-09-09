import Image from "next/image";
import { motion } from "motion/react";

const page = async () => {
  let gallery = [];
  try {
    const res = await fetch(
      "https://portfoliostrapicms.onrender.com/api/galleries?populate=*",
      { next: { revalidate: 60 } }
    );
    if (res.ok) {
      const galleries = await res.json();
      const { data } = galleries;
      if (data && data.length > 0) {
        gallery = data[0].gallery || [];
      }
    } else {
      console.error(`Failed to fetch galleries: ${res.status} ${res.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching galleries:', error);
  }

  return (
    <div className="mx-auto p-4 font-dmsans md:px-16 lg:px-72">
      <h1 className="mb-4 w-1/3 md:text-5xl text-blue-600 font-bold">
        My recent works as <span className="text-yellow-500">Graphic Designer</span>
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
