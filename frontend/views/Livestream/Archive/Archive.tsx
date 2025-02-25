import React from 'react'
import Image from 'next/image'
import Logo from "../../../public/resourcLogo.png"
import Link from 'next/link'
import Archives from '../../../public/archive.png'
import Bgsmall from '../../../public/bgsmall.png'


const Archiveses = [
    {
        id:0 ,
        vid: Archives,
        title: "Field Notes from the Trenches: Ensuring High-Availability and Resilience in Blockchain Node Operations",
        speaker: "by: Ukeme David Eseme"
    },
    {
        id: 1 ,
        vid: Archives,
        title: "Field Notes from the Trenches: Ensuring High-Availability and Resilience in Blockchain Node Operations",
        speaker: "by: Ukeme David Eseme"
    },
    {
        id:2,
        vid: Archives,
        title: "Field Notes from the Trenches: Ensuring High-Availability and Resilience in Blockchain Node Operations",
        speaker: "by: Ukeme David Eseme"
    },
    {
        id:3,
        vid: Archives,
        title: "Field Notes from the Trenches: Ensuring High-Availability and Resilience in Blockchain Node Operations",
        speaker: "by: Ukeme David Eseme"
    },
    {
        id:4,
        vid: Archives,
        title: "Field Notes from the Trenches: Ensuring High-Availability and Resilience in Blockchain Node Operations",
        speaker: "by: Ukeme David Eseme"
    },
    {
        id:5,
        vid: Archives,
        title: "Field Notes from the Trenches: Ensuring High-Availability and Resilience in Blockchain Node Operations",
        speaker: "by: Ukeme David Eseme"
    },
]

const label = [
    {
        name: "Type",
        summ: "Panel session"
    },
    {
        name: "Date",
        summ: "7/11/2024"
    },
    {
        name: "Time",
        summ: "8:00am"
    }
]

function Archive() {
  return (
    <div className='px-3 lg:px-16 xl:px-32'>

    <section className='flex flex-col md:flex-row justify-between gap-10 md:gap-20 mt-10 mb-10'>
        {/* First Detail */}
        <div className='flex-1 md:w-[1200px] xl:w-[1700px]'>
            <div className='flex items-center text-[#0096FF]'>
                <p>Archived</p>
                <p className='text-black font-bold mx-2'>{'>>'}</p>
                <p>Main Event</p>
            </div>
            <div className='mt-4'>
                <Image src={Archives} alt='ghghgh' layout='responsive' width={1000} height={500} />
            </div>
            <div className='space-y-8 mt-5 text-start flex flex-col items-start'>
                <p className='border px-3 py-2 rounded-xl bg-[#EFF4FF] font-semibold'>Detail</p>
                <p className=' text-2xl md:text-3xl leading-8 md:leading-10 text-[#263238]'>Field Notes from the Trenches: Ensuring High-Availability and Resilience in Blockchain Node Operations</p>
            </div>
            <div className='flex flex-wrap justify-between mt-5'>
              <div>
                    <p className='font-medium'>Speaker</p>
                    <p>Victor Fawale</p>
            </div>
                {label.map((text, index) => (
                    
                    <div key={index} className='flex items-center'>
                        <div className='h-12 w-[1px] bg-[#A02B2D] mx-4' />
                        <div>
                            <p className='font-medium'>{text.name}</p>
                            <p>{text.summ}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Second Detail */}
        <section className='flex-1'>
            <div className='mb-4'>
                <h1 className='bg-[#E8ECF4] py-2 px-3 rounded-2xl text-lg md:text-xl'>Hall 1</h1>
            </div>
            <div className='relative overflow-y-auto h-[80vh]' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div className='flex flex-col gap-10 mt-5 overflow-y-auto pr-5'>
                    {Archiveses.map((arch) => (
                        <div key={arch.id} className='flex gap-10 flex-wrap lg:flex-nowrap px-5 py-5 hover:bg-[#E8ECF4] cursor-pointer rounded-lg'>
                            <div className='lg:w-[40%]'>
                                <Image src={arch.vid} alt='hghsd' className='rounded-3xl'   />
                            </div>
                            <div className='space-y-4 mt-3'>
                                <h1 className='font-medium'>
                                    {arch.title.split(' ').slice(0, 10).join(' ')}
                                    {arch.title.split(' ').length > 10 && '...'}
                                </h1>
                                <p className='text-[#545454]'>{arch.speaker}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <div className='absolute left-0 right-0 bottom-0 h-20 bg-gradient-to-t from-[#EDF4FF] to-transparent pointer-events-none'></div> */}
            </div>
        </section>
    </section>
</div>
  )
}

export default Archive
