import React, { useState } from 'react'
import Image from 'next/image'
import Logo from "../../../public/resourcLogo.png"
import Link from 'next/link'
import Archives from '../../../public/archive.png'
import Bgsmall from '../../../public/bgsmall.png'


const Archiveses = [
    {
        id:0 ,
        vid: Archives,
        title: "Hall 2",
    },
    {
        id: 1 ,
        vid: Archives,
        title: "Main Hall",
    },
]

function Livestream() {
    const [clickedStream, setClickedStream] = useState(Archiveses[0])
  return (
    <div className='px-3 lg:px-16 xl:px-32'>

    <section className='flex mt-10 mb-10'>
        <div className='flex-1 md:w-[1200px] xl:w-[1700px]'>
            <div className='flex items-center text-[#0096FF]'>
                <p>LiveStream</p>
                <p className='text-black font-bold mx-2'>{'>>'}</p>
                <p>Main Event</p>
            </div>
            <div className='mt-4'>
                <Image src={clickedStream.vid} alt='ghghgh' layout='responsive' width={1000} height={500} />
            </div>
            <div className='space-y-8 mt-5 text-start flex flex-col items-start'>
                <p className='border px-3 py-2 rounded-xl bg-[#EFF4FF] font-semibold'>Detail</p>
                <div className='space-y-3'>
                <p className=' text-2xl md:text-3xl leading-8 md:leading-10 text-[#263238]'>Conference 2025</p>
                <p>{clickedStream.title}</p>
                </div> 
            </div>

            <div className='mt-14'>
                <p className='bg-[#E8ECF4] h-[40px] flex items-center px-5 text-base rounded-3xl'>Other Live Stream</p>


                <div className='flex gap-10 mt-10 flex-wrap md:flex-nowrap'>
                    {Archiveses.map((archive, index) => (
                        <div key={index} className='w-full md:w-[25%] cursor-pointer' onClick={() => setClickedStream(archive)}>
                            <Image src={archive.vid} alt='live_video'/>
                            <p className='mt-5 font-semibold text-[#263238]'>{archive.title} </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
</div>
  )
}

export default Livestream