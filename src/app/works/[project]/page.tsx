import Image from 'next/image'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const page = async ({ params }: { params: { project: string } }) => {
    const projectdata = params.project

    const res = await fetch(`http://localhost:1337/api/projects?filters[slug][$eq]=${projectdata}&populate=*`)
    const data:Array = await res.json()
    const project = data.data[0]
    console.log(project)

    const baseurl = "http://localhost:1337";


  return (
    <div>
        <div className='relative min-h-[512px]'>
            <div className='absolute size-full bg-gradient-to-b from-transparent z-20 to-blue-700' />
            <h1 className='absolute left-1/2 top-1/2 -translate-y-1/2 text-center -translate-x-1/2 text-white z-20'>{project.title}</h1>
            <Image src={`${baseurl}/${project.projectImg.formats.large.url}`} alt='' className='object-cover' fill />
            <h3>{project.title}</h3>
        </div>
            <ReactMarkdown className='px-32 lg:px-64 prose my-32'>{project.content}</ReactMarkdown>
    </div>
  )
}

export default page