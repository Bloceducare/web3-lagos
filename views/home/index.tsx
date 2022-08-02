import Image from 'next/image'
import Button from '@components/button'
import DateCountDown from '@components/dateCountDown'
import { HiLocationMarker} from "react-icons/hi";
import Link from "next/link";
import CountUp from 'react-countup';
import useTotalParticipants from './hooks/useTotalParticipants';
import AddressIcon from '@components/Icons/AddressIcon';
import TwitterIcon from '@components/Icons/TwitterIcon';
import InstagramIcon from '@components/Icons/InstagramIcon';
import EmailIcon from '@components/Icons/EmailIcon';



const HomeView = ()=>{
  // const {total, loading} = useTotalParticipants()
  
    return (<>
        <div className= "text-white pt-10 md:h-[calc(100vh_-_5rem)] bg-[url('/blue-bg.png')] bg-no-repeat"  >
        <div className="flex flex-wrap justify-center max-w-6xl mx-auto sm:justify-center md:justify-between" >
            <div className='flex flex-col max-w-md text-center md:text-left' >
              <div className='flex items-center mx-auto mt-2 md:ml-0'>
                <div className='mr-1'>
                  <AddressIcon className='text-white' />
                </div>
                <div className='leading-5'>
                  <div>October</div>
                  <div>6-8, 2022</div>
                </div>
              </div>
              <div className='my-3'> 
              <h1 className='mb-3 text-5xl leading-snug'>Web3 
              <span className='font-bold'>
              {" "}Lagos Conference  2022
              </span>
              </h1>
              <div className='p-3 md:p-0'>

              <p className='my-1 text-left'>
                Join the largest Web3 conference in Lagos Nigeria, where stakeholders, industry experts, software developers are coming together to network and discuss about the web3 ecosystem.  
              </p>

              {/* <p className='my-1 text-left'> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus, accusantium minus repellendus aperiam quas saepe officia itaque minima soluta ex.</p> */}

              </div>
              </div>
                <div className='mt-4 md:mt-0'>

            <Button variant='primary' className='px-4'>

            <Link href='/apply/registration'>

<a>
  
       Register
          </a>
    </Link>

              </Button>
                </div>
            </div>
            <div className='relative block' >


<img 
src="/flying-bridge.png" 
width={'100%'}  
height='auto' 
className='inline-block scale-110 md:mt-8 md:max-w-md max-w-xs'
   />

{/* 
    <div className='p-8 px-8 text-center text-white order-r md:inline-grid place-items-center md:absolute -bottom-16 bg-gradient-to-r from-sky-500 to-indigo-500 md:-ml-24 md:p-4'>
      <div>
        {
         <div className={`${loading ? '' : 'hidden'} animate-pulse w-10 h-10 bg-gray-700 mx-auto flex justify-center text-center`}> </div> 
        }

      <span className={`${loading ? 'hidden' : ''} text-4xl`}  >
        {total}
      </span> 
    
      </div>
      <div className='uppercase'>
      attendees
      </div>
    </div> */}
    
            </div>
        </div>
        </div>  

        <section className='max-w-4xl mx-auto text-center md:text-center'>
            <DateCountDown />
            <div className='flex items-center justify-center my-3'>
            <HiLocationMarker  className='mr-2 text-2xl'/> Lagos Nigeria
            </div>
        </section>   
        <section className="text-center my-6  p-6 py-16 md:bg-[url('/web3bridge.png')] bg-no-repeat bg-contain bg-right">
          <div className=''>

       
            <h1 className='mb-2 text-6xl'>Apply &#38;
             </h1>
            <h1 className='mb-12 text-6xl text-red-700'>   
            Join the Conversation
             </h1>
            <div className="max-w-xl mx-auto">
  <div className="grid grid-cols-1 gap-6 mt-3 md:grid-cols-2 lg:grid-cols-2 ">
    <div className="flex items-center justify-center text-2xl brd">
        <Link href='/apply/speaker'>

    <a className="w-full p-4 border-2 border-red-500 cursor-pointer border:dotted hover:bg-red-200 hover:opacity-80">
                Apply as a Speaker
              </a>
        </Link>
              
      
    </div>
    <div className="flex items-center justify-center text-2xl brd">
    <Link href='/apply/sponsor'>

<a className="w-full p-4 border-2 border-red-500 cursor-pointer border:dotted hover:bg-red-200 hover:opacity-80">
    
        Apply as a Sponsor
          </a>
    </Link>
    
    </div>
    {/* <div className="flex items-center justify-center text-2xl brd">

    <Link href='/apply/volunteer'>

<a className="w-full p-4 border-2 border-red-300 cursor-pointer border:dotted hover:bg-red-200 hover:opacity-80">
        Apply as a Volunteer
          </a>
    </Link>
    
    </div>
    <div className="flex items-center justify-center text-2xl brd">
    <Link href='/apply/media-partner'>

<a className="w-full p-4 border-2 border-red-300 cursor-pointer border:dotted hover:bg-red-200 hover:opacity-80">
        Apply as a Media Partner     
          </a>
    </Link>
    </div> */}

  </div>
</div>
</div>

        </section>

        <section id='more' className='max-w-6xl px-3 mx-auto my-12' >
  <h2 className='my-1 text-3xl font-semibold leading-10'>Our Goal</h2>
  <p>To organize one of the Largest Blockchain developers and Ethereum builders conference in the heart of Africa tech.</p>
</section>
        <section className='max-w-6xl mx-auto  px-3 my-12 [&>p]:my-3' >
  <h2 className='my-1 text-3xl font-semibold leading-10'>Our Success Story</h2>
  <p>We3Bridge mission is to identify Web3 passions, train them in a collaborative and suppoive remote environment and create and African Web3 Community, which over these years we have executed through our learning series called “COHORT” from edition 1 to edition 7 and with more than 2000 trained on Web2-Web3 Blockchain development for free with access to accommodation, feeding and internet access at our learning Facility in Lagos.</p>
  <p>An initiative that started as 500 Ethereum Developers which with results has scaled into an organization that has contributed to growth, development of leading Blockchain projects including Hydro and exposing not less than 10,000 Africans to Web3 and its wealth of oppounities through educational and extended learning series</p>
</section>

        <section className='max-w-6xl m-auto my-16 ' >
        <div className="md:grid md:grid-cols-12">
  <div className="col-span-6 md:col-span-6">
    <Image
    src='/event-photo-1.jpg'
 
    width="100%" height="70%" layout="responsive" objectFit="cover"
      />
  </div>
  <div className="col-span-6 md:pl-20 [&>p]:mb-3 p-3 md:p-0">
    <h2 className='mb-8 text-3xl font-semibold leading-10'>Event Overview</h2>
    <p> 3 days event kickstaing with a hackathon and several other events including workshop, networking, career fair, panel session, talks e.t.c.and main event </p>

    <p>With an expected attendance of 5000 participants physically and virtually. This event is focused on helping developers, Blockchain enthusiasts and enthusiast realize the endless possibilities and oppounities of the Blockchain and Ethereum ecosystem. </p> 
    <p>
     Beyond celebrating three years of contributions to the Blockchain and Web3 space in Africa and international scenes, one of our core beliefs is that repeated interactions are a great contribution to career growth and poised to create an enabling environment onboarding top-tier projects for representation at the event and onboard best and value driven industry thought leader and value driven speakers</p>
  </div>
</div>
        </section>

        <section className='max-w-6xl m-auto my-16 ' >
        <div className="flex-row-reverse md:grid md:grid-cols-12">
  <div className="col-span-6 md:pl-20 [&>p]:mb-3 p-3 md:p-0">
    <h2 className='text-3xl font-semibold leading-10'>Outline of Event</h2>
    <div className='grid min-h-full place-items-center'>
    <h2 className='text-xl italic '>Coming Soon!!!</h2>

    </div>
{/* 
    <ul>
      <li>
      Day 1: Hackathons and workshops
      </li>
      <li>
      Day 2: Career fair, networking and pitching.
      </li>
      <li>
      Day 3: Main event and Web3bridge dinner for all
Web3bridge Alumnus.
      </li>
    </ul> */}
 
  </div>
  <div className="col-span-6 md:col-span-6 grid-row-start:auto">
    <div>
    <Image
    src='/event-photo-2-ed.png'
    width="100%" height="70px" layout="responsive" objectFit="cover"
      />
    </div>
  </div>
</div>
        </section>

        {/* <section className='max-w-6xl m-auto my-16'>
            <h2 className='text-3xl text-semibold'>Partners</h2>
            <hr  className='my-4'/>
            <div>
            <div className="grid grid-cols-1 gap-6 my-12 mt-3 md:grid-cols-2 lg:grid-cols-4 ">
    <div className="flex items-center justify-center p-4 shadow-2xl cursor-pointer">
      <Image src='/eth.png' 
     width='80px' height='80px' style={{border:'1px solid red'}}
       />
    </div>
    <div className="flex items-center justify-center p-4 shadow-2xl cursor-pointer">
      <Image src='/Epns.png' 
      width='80px' height='80px'
       />
    </div>
    <div className="flex items-center justify-center p-4 shadow-2xl cursor-pointer">
      <Image src='/hydro.png' 
     width='80px' height='80px'
       />
    </div>
    <div className="flex items-center justify-center p-4 shadow-2xl cursor-pointer ">
      <Image src='/kernel.png' 
     width='100%' height='100%'  
       />
    </div>
    </div>
            </div>
        </section> */}


        <section className='max-w-6xl m-auto my-16 text-center [&>div]:my-3'>
          <h2 className='text-5xl font-bold text-gray-700'> Team 
          <br />
          & 
          <br />
          Contact Details</h2>
          <div>Contact:</div>
          <div className='flex items-center justify-center'>
            <EmailIcon className='inline-block mr-1 text-xl font-bold' />
           <a href="mailto:ayodeji@web3bridge.com"  >
            ayodeji@web3bridge.com        
           </a>
            </div>
          <div className=''>
            <div className='flex items-center justify-center'>
              <a target='_blank' href='https://twitter.com/Web3Bridge'>         
                <TwitterIcon className='inline-block mr-1 text-xl font-bold ' />
             
              </a>
              <a target='_blank' href='https://instagram.com/web3bridge'>         
                <InstagramIcon className='inline-block mr-3 text-xl font-bold ' />
              
              </a>
               @web3bridge
               </div>
            <div>
            <a target='_blank' href='https://www.web3bridge.com' >
              
              https://www.web3bridge.com
            </a>
              </div>
          </div>
          </section>
    </>)
}

export default HomeView
