// "use client";
import Image from "next/image";
import React from "react";

const HomePage = async () => {
  const res = await fetch("https://portfoliostrapicms.onrender.com/api/galleries?populate=*")
  const galleries = await res.json()
  const { data } = galleries
  const gallery = data[0].gallery
  // console.log(gallery)

  return (
    <div className="container mx-auto p-4 md:px-16">
      <h3>My recent works as Graphic Designer</h3>
      <div className="grid w-full mt-8 grid-cols-3">
        {
          gallery.map(item => (
            
            <div key={item?.id} className="w-full min-h-96 relative">
              <Image src={item?.url} alt="" className="object-contain" fill/>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default HomePage;
