import Image from 'next/image'
import React from 'react'
import ReactMarkdown from 'react-markdown'


async function getProjectData(slug: string): Promise<ProjectData> {
  const res = await fetch(`https://portfoliostrapicms.onrender.com/api/projects?filters[slug][$eq]=${slug}&populate=*`)
  if (!res.ok) {
    throw new Error('Failed to fetch project data')
  }
  const data = await res.json()
  return data.data[0]
}

const page = async ({ params }: { params: { project: string } }) => {
    const projectdata = params.project

    const res = await fetch(`https://portfoliostrapicms.onrender.com/api/projects?filters[slug][$eq]=${projectdata}&populate=*`)
    const data = await res.json()
    const project = data.data[0]

    const baseurl = "http://localhost:1337";


  return (
    <div className='w-full  flex flex-col items-center justify-center'>
        <div className='relative w-full min-h-[512px]'>
            <div className='absolute size-full bg-gradient-to-b from-transparent z-20 to-blue-700' />
            <h1 className='absolute left-1/2 top-1/2 -translate-y-1/2 text-center -translate-x-1/2 text-white z-20'>{project.title}</h1>
            <Image src={`${project.bannerimage[0].url}`} alt='' className='object-cover' fill />
            <h3>{project.title}</h3>
        </div>
            <ReactMarkdown className='w-[512px] prose my-32'>{project.content}</ReactMarkdown>
    </div>
  )
}

export default page