import Link from 'next/link'
import React from 'react'

const SuccessScreen = () => {
  return (
    
    <div className="flex flex-col text-center justify-center items-center m-auto">

    <h1 className="mb-2 bg-gradient-to-r text-[2em] text-transparent bg-clip-text text-center font-semibold from-[#895470] via-[#BD6854] to-[#3E3797]">
    Thank you for submitting the form!
  </h1>
  
<Link href="/apply/speakers">
  <button className='rounded-lg px-4 py-2 border-[0.8px]'>Submit another response</button>
  </Link>
    </div>
  )
}

export default SuccessScreen;