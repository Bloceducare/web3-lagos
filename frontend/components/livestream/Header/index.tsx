import Image from 'next/image'
import Link from 'next/link'

import Logo from "@/public/hackathon/Group545.png"

const Home_Page = "/livestream"
const Live_Stream = "/livestream/live";
const Archived_Stream = "/livestream/archive";
const About_Us = "/livestream/about";
const Register_Here = "#";

const Header = () => {
  return (
    <header className="flex justify-center sticky top-0 bg-[#ffffff] shadow-sm z-50">
      <div className='flex justify-center items-center py-4 md:w-[1200px] md:px-8 xl:w-[1600px]'>
        <div className='flex justify-between items-center w-full'>
          <Link href={Home_Page}>
            <Image src={Logo} alt="" width={0} height={0} className="w-[50px] md:w-[150px] xl:w-[165px]" />
          </Link>
          <div className='flex flex-wrap lg:flex-nowrap justify-between lg:w-[55%] xl:w-[47%] text-[14px] lg:text-[17px] items-center gap-4 mt-4 md:mt-0'>
            <Link href={Live_Stream}>Live Stream</Link>
            <Link href={Archived_Stream}>Archived Stream</Link>
            <Link href={About_Us}>About Us</Link>
            <button className='px-5 py-2 text-white rounded-[10px] bg-[blue]'>
              <Link href={Register_Here}>Register for Cohort</Link>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
