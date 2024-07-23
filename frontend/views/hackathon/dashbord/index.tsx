import React, { useEffect, useState } from 'react'
import Logo from '../../../public/logo.png'
import Image from 'next/image'
import { Bell } from 'lucide-react'
import Schedule from './Schedule'
import Team from './Team'
import Project from './Project'

function Dashboards() {

    const [fullName, setFullName] = useState<string>("");

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const userString = localStorage.getItem('user');
        if (userString) {
          try {
            const user = JSON.parse(userString);
            setFullName(user.first_name + " " + (user.other_name || ""));
          } catch (error) {
            console.error('Error parsing user data:', error);
          }
        } else {
          console.log('No user data found in localStorage');
        }
      }
    }, []);
    
  return (
    <div  className=" mx-auto mt-14  p-6">
        <section className='flex gap-10'>
            <div className='bg-[#0096FF] h-[1024px] px-10 py-10 rounded-2xl hidden md:block'> 
            <Image src={Logo} alt="Sample" />
            </div>


            <section className='w-[100%]'> 
                <div className='flex justify-between w-full'>
                    <div>
                <p className='font-bold text-3xl'>Welcome, {fullName}</p>
                <p>Monday 15th July, 2024</p>
                </div>

                <div>
                    <Bell />
                </div>
                </div>

                {/* <Schedule /> */}
                {/* <Project /> */}
                <Team />
            </section>


        </section>
    </div>
  )
}

export default Dashboards
