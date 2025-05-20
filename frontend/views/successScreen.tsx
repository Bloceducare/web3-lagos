import Link from 'next/link'
import React from 'react'

const SuccessScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="mb-4 bg-gradient-to-r text-[2em] text-transparent bg-clip-text font-semibold from-[#895470] via-[#BD6854] to-[#3E3797]">
        Thank you for submitting the form!
      </h1>

      <Link href="/">
        <button className="rounded-lg px-6 py-2 border-[0.8px] hover:bg-gray-100 transition">
          Go to HomePage
        </button>
      </Link>
    </div>
  )
}

export default SuccessScreen;
