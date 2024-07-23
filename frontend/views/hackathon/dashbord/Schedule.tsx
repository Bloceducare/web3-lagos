import React, { useEffect, useState } from 'react'
import SideBar from "@/components/hackathon-sidebar";
import HackathonHeader from "@/components/hackathon-header";


type User = {
    email: string;
    id: number;
    first_name: string;
    github_username: string;
    other_name: string;
  };

const Schedule: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    console.log(userData);
  }, []);
    return (
      <div className='flex  mt-[5rem] mb-5 px-4 sm:px-0'>

    <div className="sm:w-1/5 sm:fixed h-full sm:flex hidden">
        <SideBar />
      </div>

    <section className="flex flex-col sm:w-4/5 sm:ml-[20%] w-full  sm:px-8 ">
    <div className="w-full">
          <HackathonHeader user={user} />
        </div>
        <section>
            <h1 className='text-3xl font-bold mt-5'>Event Schedule</h1>
        </section>

        <section className='text-[#FFFF] flex flex-wrap mt-10 '>
            <div className='w-[100%] sm:w-[33.3%] md:w-[25%] bg-[#0096FF]  border-r-2 border-b-2 flex flex-col gap-2 text-start pl-3 pr-10 pt-10 pb-20 '>
                <h3 className='bg-[#1ACF2C] w-[80px] rounded-xl pl-2'>11am WAT</h3>
                <p>15th July, 2024</p>
                <p className='font-bold text-lg'>Registration Begins</p>
            </div>
            <div className='w-[100%] sm:w-[33.3%] md:w-[25%] bg-[#0096FF]  border-r-2 border-b-2 flex flex-col gap-2 text-start pl-3 pr-10 pt-10 pb-20 '>
                <h3 className='bg-[#1ACF2C] w-[80px] rounded-xl pl-2'>11.59PM WAT</h3>
                <p>4th August, 2024</p>
                <p className='font-bold text-lg'>Registration Begins</p>
            </div>    <div className='w-[100%] sm:w-[33.3%] md:w-[25%] bg-[#0096FF]  border-r-2 border-b-2 flex flex-col gap-2 text-start pl-3 pr-10 pt-10 pb-20 '>
                <h3 className='bg-[#1ACF2C] w-[80px] rounded-xl pl-2'>10am - 4pm WAT</h3>
                <p>5th August, 2024</p>
                <p className='font-bold text-lg'>Workshop for Hackers</p>
            </div>    <div className='w-[100%] sm:w-[33.3%] md:w-[25%] bg-[#0096FF]  border-r-2 border-b-2 flex flex-col gap-2 text-start pl-3 pr-10 pt-10 pb-20 '>
                <h3 className='bg-[#1ACF2C] w-[80px] rounded-xl pl-2'>7am WAT</h3>
                <p>1st September, 2024</p>
                <p className='font-bold text-lg'>HackerHouse Resumption</p>
            </div>    <div className='w-[100%] sm:w-[33.3%] md:w-[25%] bg-[#0096FF]  border-r-2 border-b-2 flex flex-col gap-2 text-start pl-3 pr-10 pt-10 pb-20 '>
                <h3 className='bg-[#1ACF2C] w-[80px] rounded-xl pl-2'>7am WAT</h3>
                <p>2nd September, 2024</p>
                <p className='font-bold text-lg'>Hackerthon Kickstart</p>
            </div>    <div className='w-[100%] sm:w-[33.3%] md:w-[25%] bg-[#0096FF]  border-r-2 border-b-2 flex flex-col gap-2 text-start pl-3 pr-10 pt-10 pb-20 '>
                <h3 className='bg-[#1ACF2C] w-[80px] rounded-xl pl-2'>11:59pm WAT</h3>
                <p>4th September, 2024</p>
                <p className='font-bold text-lg'>Submission Deadline</p>
            </div>    <div className='w-[100%] sm:w-[33.3%] md:w-[25%] bg-[#0096FF]  border-r-2 border-b-2 flex flex-col gap-2 text-start pl-3 pr-10 pt-10 pb-20 '>
                <h3 className='bg-[#1ACF2C] w-[80px] rounded-xl pl-2'>9am WAT</h3>
                <p>5th September, 2024</p>
                <p className='font-bold text-lg'>Web3 Lagos Grand Opening</p>
            </div>    <div className='w-[100%] sm:w-[33.3%] md:w-[25%] bg-[#0096FF]  border-r-2 border-b-2 flex flex-col gap-2 text-start pl-3 pr-10 pt-10 pb-20 '>
                <h3 className='bg-[#1ACF2C] w-[80px] rounded-xl pl-2'>2pm WAT</h3>
                <p>6th September, 2024</p>
                <p className='font-bold text-lg'>Judging Begins</p>
            </div>    <div className='w-[100%] sm:w-[33.3%] md:w-[25%] bg-[#0096FF]  border-r-2 border-b-2 flex flex-col gap-2 text-start pl-3 pr-10 pt-10 pb-20 '>
                <h3 className='bg-[#1ACF2C] w-[80px] rounded-xl pl-2'>12pm WAT</h3>
                <p>7th September, 2024</p>
                <p className='font-bold text-lg'>Submission of Results</p>
            </div>    <div className='w-[100%] sm:w-[33.3%] md:w-[25%] bg-[#0096FF]  border-r-2 border-b-2 flex flex-col gap-2 text-start pl-3 pr-10 pt-10 pb-20 '>
                <h3 className='bg-[#1ACF2C] w-[80px] rounded-xl pl-2'>TBC</h3>
                <p>7th September, 2024</p>
                <p className='font-bold text-lg'>Announcement of Winners</p>
            </div>
            
            
            
            

           


         
        </section>
        </section>
      </div>
    );
  };
  
  export default Schedule;