import Image from 'next/image';
import React from 'react';
import ReactMarkdown from 'react-markdown';

async function getProjectData(slug: string){
  const res = await fetch(
    `https://portfoliostrapicms.onrender.com/api/projects?filters[slug][$eq]=${slug}&populate=*`,
    {next:{revalidate:60}}
  );
  if (!res.ok) {
    throw new Error('Failed to fetch project data');
  }
  const data = await res.json();
  return data.data[0];
}


export async function generateStaticParams() {
  const res = await fetch(
    'https://portfoliostrapicms.onrender.com/api/projects'
  );
  const data = await res.json();

  return data.data.map((project: any) => ({
    project: project.slug,
  }));
}

export default async function Page({ params }) {
  const { project } = await params;

  const projectData = await getProjectData(project);

  if(!projectData){
    return<section className='text-7xl grid place-items-center font-indie min-h-[512px]'>404 Page not found</section>
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="relative w-full min-h-[512px]">
        <div className="absolute size-full bg-gradient-to-b from-transparent z-20 to-blue-700" />
        <h1 className="absolute left-1/2 top-1/2 -translate-y-1/2 text-center -translate-x-1/2 text-white z-20">
          {projectData.title}
        </h1>
        <Image src={projectData.bannerimage[0].url} alt="" loading="lazy" className="object-cover" fill />
      </div>
      <ReactMarkdown className="w-[512px] prose my-32">{projectData.content}</ReactMarkdown>
      <img src={projectData.bannerimage[0].url} alt="" className="object-cover h-auto w-full"  />
    </div>
  );
}
