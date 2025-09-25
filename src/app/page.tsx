import React from 'react'
import Experience from '~/components/Experience'
import Hero from '~/components/Hero'
import Posters from '~/components/Posters'
import Works from '~/components/Works'

const page = () => {
  return (
    <div className='px-8 mt-16 md:px-32 flex flex-col gap-4 '>
      <Hero/>
      <Works/>
      {/* <Experience/> */}
      <Posters/>
    </div>
  )
}

export default page
