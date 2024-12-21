import { Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { testimonials } from "~/lib/utils";

interface PictureFormats {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
}

interface Picture {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    small: PictureFormats;
    thumbnail: PictureFormats;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Testimonial {
  id: number;
  documentId: string;
  Name: string;
  work: string;
  testimonial: string;
  linkedin: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Picture: Picture;
}


async function getTestimonials() {
  const res = await fetch(
    "https://portfoliostrapicms.onrender.com/api/testimonials?populate=*",
  );
  const response = res.json();
  return response;
}

const page = async () => {
  const { data } = await getTestimonials();

  const profileimage =
    "https://media.giphy.com/media/10M8Yr4WKJK63e/giphy.gif?cid=ecf05e47e1sxe98n9urf94glnw7lwws0up8egd7d7mei3c6s&ep=v1_gifs_search&rid=giphy.gif&ct=g";

  return (
    <section className="mb-32">
      {/* topsection */}
      <div className="flex min-h-96 flex-col rounded-b-[96px] bg-blue-700 px-8 text-white md:flex-row md:px-16 lg:px-32">
        <div className="flex w-full flex-col justify-center gap-4 md:w-1/2">
          <h3 className="text-4xl">Testimonials</h3>
          <h1 className="">
            I've had the pleasure of designing many spaces and meeting
            incredible people
          </h1>
          <p>
            I've had the pleasure of working with numerous individuals and
            teams, and I'm grateful for the kind words they've shared about my
            design expertise, leadership abilities, and collaborative approach.
          </p>
        </div>
        <div className="w-full md:p-8 md:w-1/2">
          <div className="relative min-h-[512px] w-full scale-90 overflow-clip rounded-[96px] border-4 border-white grayscale">
            <Image src={profileimage} alt="" className="object-cover" fill />
          </div>
        </div>
      </div>
      <div className="mt-16 px-2 md:px-16 lg:px-32">
        <h2 className="mb-8 text-5xl font-thin">Testimonials</h2>
        <p></p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((testimonial: Testimonial) => (
            <Card
              key={testimonial.id}
              className="min-h-[512px] overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <div className="flex flex-col p-6">
                  <div className="relative size-32">
                    <Image
                    priority
                      src={testimonial.Picture.url}
                      alt={testimonial.Name}
                      fill
                      className="rounded-full object-cover"
                    />
                </div>
                <div className="flex w-full flex-col gap-4 p-8">
                  <h3 className="text-5xl font-bold">{testimonial.Name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.work}</p>
                  <p className="text-xl text-gray-700">
                    {testimonial.testimonial}
                  </p>
                  <Button asChild variant={"gooeyLeft"} className="w-fit">
                    <Link href={testimonial.linkedin} className="flex bg-blue-600 from-blue-800 flex-row gap-2">
                      <Linkedin size={12} />
                      Linkedin
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
