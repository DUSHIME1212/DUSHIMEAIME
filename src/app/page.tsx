import React from 'react'
import Experience from '~/components/Experience'
import Hero from '~/components/Hero'
import Works from '~/components/Works'

const page = () => {
  return (
    <div className='px-8 md:px-16 flex flex-col gap-4 lg:px-32'>
      <Hero/>
      <Works/>
      <Experience/>
    </div>
  )
}

export default page
