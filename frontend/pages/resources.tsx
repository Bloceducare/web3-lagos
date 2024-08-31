import React from 'react'
import Image from "next/image";
import Logo from "../public/resourcLogo.png"
import Topic from "../public/topic.png"
import Link from 'next/link';
import arrow from "../public/arrows.png";
import One from "../public/successimg1.png"
import Two from "../public/successimg2.png"
import Three from "../public/successimg3.png"
import Twitter from "../public/twitter.png"
import ETH from "../public/eth.png"
import Play from "../public/play.png"


const Articles = [
    {
        id: 0,
        title: "W3L Hackhathon Tips",
        summ: "At Web3bridge, we believe education is critical in the drive for adoption of blockchain technology. And we have set up Web3 Lagos conference to bring education across varying topics/subjects and comprehension of blockchain technology."
    },
    {
        id: 1,
        title: "How Ethereum is changing the game",
        summ: "At Web3bridge, we believe education is critical in the drive for adoption of blockchain technology. And we have set up Web3 Lagos conference to bring education across varying topics/subjects and comprehension of blockchain technology."
    },
    {
        id: 2,
        title: "W3L Hackhathon Tips",
        summ: "At Web3bridge, we believe education is critical in the drive for adoption of blockchain technology. And we have set up Web3 Lagos conference to bring education across varying topics/subjects and comprehension of blockchain technology."
    }
]

const Topics = [
    {
        id:0,
        img: Topic,
        category: "smart contract",
        title: "The Basics about Cryptocurrency",
        summ: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo."
    },
    {
        id:1,
        img: Topic,
        category: "smart contract",
        title: "The Basics about Cryptocurrency",
        summ: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo."
    },
    {
        id:2,
        img: Topic,
        category: "smart contract",
        title: "The Basics about Cryptocurrency",
        summ: "Lorem ipsum dolor sit ametero irseo, consectetur adipiscing elit. Scelerisque viverra donec diammeo."
    }
]


function resources() {
  return (
    <div className='px-3 lg:px-64'>
        <div>
            <header className="flex justify-between items-center w-full  py-10">
                <div>
                <Link href="/" className='flex items-center gap-2'>
              <Image src={Logo} alt="" width={0} height={0} className="w-[50px] md:w-[160px] lg:w-[100px] xl:w-[50px]" />
             <p className='font-semibold text-2xl'>Web3lagos Event</p> 
              </Link>
                </div>
                <div className='space-x-10 text-xl lg:text-2xl'>
                    <Link href="/apply/registration" >
                    Register
                    </Link>

                    <Link href="/apply/sponsor">
                    Become a sponsor
                    </Link>
                    
                </div>
            </header>



            {/* THE BODY */}
            <section>

                <section className='flex gap-10 flex-wrap lg:flex-nowrap'>
                    {Articles.map((art) => (
                        <div className='bg-[#188BE0] text-white h-auto lg:w-[425px] self-start space-y-6 px-10 py-10 rounded-2xl'>
                            <h1 className='font-semibold text-3xl'>{art.title}</h1>
                            <p className='text-base leading-7 font-normal'>{art.summ}</p>
                            <button className='border px-5 py-3 text-lg rounded-xl bg-[#F8F9FB] text-[#188BE0]'>Read more</button>
                        </div>
                    ))}
                </section>


                <section className='flex gap-10 flex-wrap lg:flex-nowrap'>
                    <div className='bg-[#188BE0] text-white h-auto lg:w-[425px] px-10 py-10 rounded-2xl space-y-5'>
                        <h1 className='font-semibold text-3xl'>Highlights from 2022</h1>
                        <div className='bg-[#FFFFFF] lg:w-[320px] h-[160px] flex justify-center items-center rounded-2xl'>
                            <p className='border-4 h-[10vh] w-[10vh] flex items-center justify-center border-[#188BE0] rounded-full'>
                                <Image src={Play} alt='play' />
                            </p>
                        </div>
                        <button className='text-[#188BE0] bg-[#F8F9FB] px-5 py-3 rounded-2xl'>View Youtube</button>
                    </div>
                    <div>
                        <Image src={ETH} alt='uhs' className='h-auto lg:w-[425px]' />
                    </div>
                    <div className='bg-[#188BE0] text-white h-auto lg:w-[425px] px-10 py-10 rounded-2xl space-y-5'>
                        <h1 className='font-semibold text-3xl'>Highlights from 2022</h1>
                        <div className='bg-[#FFFFFF] lg:w-[320px] h-[160px] flex justify-center items-center rounded-2xl'>
                            <p className='border-4 h-[10vh] w-[10vh] flex items-center justify-center border-[#188BE0] rounded-full'>
                                <Image src={Play} alt='play' />
                            </p>
                        </div>
                        <button className='text-[#188BE0] bg-[#F8F9FB] px-5 py-3 rounded-2xl'>View Youtube</button>
                    </div>
                </section>


               
                    <section className='flex justify-between mt-16 items-center flex-wrap lg:flex-nowrap'>
                        <div>
                            <p className='text-4xl font-medium lg:w-[549px] leading-[45px]'>Get the latest resources activity update into your inbox monthly</p>
                        </div>
                                            <div className="p-5">
                        <p className="flex flex-col lg:flex-row lg:items-center lg:space-x-3 bg-white border-[#188BE0] rounded-xl border p-3 mt-10 lg:mt-0">
                            <input
                                type="email"
                                name="email"
                                id=""
                                className="outline-none text-black bg-transparent flex-1 mb-3 lg:mb-0"
                                placeholder="Enter your email"
                            />
                            <button className="bg-[#188BE0] px-5 py-2 rounded-lg text-white">
                                Let's go
                            </button>
                        </p>
                    </div>


                    </section>


                    <section className="mt-16 px-4 md:px-8 lg:px-16">
  <div className="text-center">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium">Related Topics</h1>
  </div>

  <section className="flex flex-wrap justify-center lg:justify-between mt-14">
    {Topics.map((topic) => (
      <div
        key={topic.title} // Add a unique key to each item
        className="w-full md:w-[48%] lg:w-[30%] border border-[#188BE0] rounded-2xl mt-10 lg:mt-0 flex-shrink-0"
      >
        <Image
          src={topic.img}
          alt={topic.title}
          className="w-full rounded-t-2xl object-cover"
        />
        <div className="px-5 py-6 space-y-4 flex flex-col items-start">
          <p className="bg-[#188BE0] rounded-full px-3 py-2 uppercase text-white">
            {topic.category}
          </p>
          <h1 className="text-xl md:text-2xl lg:text-2xl w-full">{topic.title}</h1>
          <p className="text-base md:text-lg leading-6 lg:leading-8">{topic.summ}</p>
        </div>
      </div>
    ))}
  </section>
</section>



                    <section className='mt-16 flex justify-between flex-wrap lg:flex-nowrap'>
                        <div>
                            <div className="text-3xl md:text-6xl lg:text-4xl font-bold leading-[50px] md:leading-[56px] lg:leading-[56px]">
                <h2>Our Success Story;</h2>
                            </div>
                            <div>
                            <div className="text-2xl mt-2">
                                <p>Check gallery from the previous event</p>
                            </div>
                            <div className="flex gap-4 mt-7 items-center">
                                <div>
                                <Image src={arrow} alt="arrow" />
                                </div>
                                <div className="text-2xl md:text-3xl lg:text-3xl ">
                                <p>
                                    W3LC 2022:{" "}
                                    <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://docs.google.com/document/d/11RWT18bAajPigJg_o39Kg2XM8BWaaw3D22KdJ9OTooA/edit?usp=sharing"
                                    >
                                    Link Here
                                    </a>
                                </p>
                                </div>
                            </div>
                            <div className="flex gap-4 mt-7 items-center">
                                <div>
                                <Image src={arrow} alt="arrow" />
                                </div>
                                <div className="text-2xl md:text-3xl lg:text-3xl">
                                <p>
                                    W3LC 2023:{" "}
                                    <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://docs.google.com/document/d/1JdcvII6U_3O6FQngIkaEVIDiOMMmaiMGotslBygbL-0/edit?usp=sharing"
                                    >
                                    Link Here
                                    </a>
                                </p>
                                </div>
                            </div>
                            </div>
                        </div>

                        <section className='space-y-3 mt-10 lg:mt-10'>
                            <div className='flex  justify-end gap-3 flex-wrap lg:flex-nowrap'>
                                <Image src={One} alt='one' className='w-full lg:w-[250px]' /><Image src={Two} alt='one' className='w-full lg:w-[300px] lg:h-[160px]' />
                            </div>
                            <div className='flex justify-between gap-3 flex-wrap lg:flex-nowrap '>
                               <Image src={Three} alt='one' className='w-full lg:w-[200px] lg:h-[128px]' />  <Image src={One} alt='one' className='w-full lg:w-[250px] lg:h-[128px]' /><Image src={Two} alt='one' className=' lg:h-[128px] hidden lg:block' />
                            </div>
                        </section>
                    </section>              

            </section>

            {/* footer */}

            <section className='border-t-2 py-10 mt-20 flex  justify-between'>
                <div>
                    <p className='text-[#98A2B3]'>Enquiries/Details: <a href='mailto:event@web3bridge.com'>event@web3bridge.com</a></p>
                    
                </div>

                <div>
                    <a href='#'>
                        <Image src={Twitter} alt='gf' />
                    </a>
                </div>

            </section>
        </div>
    </div>
  )
}

export default resources
