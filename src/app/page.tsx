import React from 'react'
import Experience from '~/components/Experience'
import Hero from '~/components/Hero'
import Works from '~/components/Works'

const page = () => {
  return (
    <div className='px-8 md:px-32 flex flex-col gap-4 lg:px-72'>
      <Hero/>
      <Works/>
      {/* <Experience/> */}
    </div>
  )
}

export default page
