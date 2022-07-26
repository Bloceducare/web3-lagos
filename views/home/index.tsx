import Image from 'next/image'
import Button from '@components/button'
import DateCountDown from '@components/dateCountDown'
import { HiLocationMarker} from "react-icons/hi";
import Link from "next/link";

const HomeView = ()=>{
    return (<>

        <div className='md:bg-green-300 pt-10 md:h-[calc(100vh_-_5rem)]'>
        <div className="flex md:items-start md:justify-between  mx-auto max-w-6xl " >
            <div className='flex flex-col max-w-md text-center md:text-left' >
              <div className='mt-2'>July, 01,2022</div>
              <div className='my-3'>
              <h1 className='text-5xl mb-3'>Ethereum Community Conference 5</h1>
              <div className='md:p-0  p-3'>

              <p className='my-1 text-left'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem hic cum aspernatur nisi cumque magnam deserunt saepe aliquam, illum voluptatibus corporis. Accusantium animi ullam ea ut sit nihil nam voluptas.</p>

              <p className='my-1 text-left'> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus, accusantium minus repellendus aperiam quas saepe officia itaque minima soluta ex.</p>
              </div>
              </div>
                <div className='md:mt-0 mt-4'>

            <Button variant='primary'>Learn More</Button>
                </div>
            </div>
            <div className='hidden md:block'>
                
            <Image
      src="/eth-img.jpg"
      alt="Picture of the author"
      width={400}
      height={400}
      className="rounded-sm"
    />
            </div>
        </div>
        </div>  

        <section className='mx-auto text-center max-w-4xl md:text-center'>
            <DateCountDown />
            <div className='flex items-center justify-center'>
            <HiLocationMarker  className='mr-2'/> Lagos Nigeria
            </div>
        </section>   
        <section className='text-center my-6  bg-red-100 p-6'>
            <h1 className='text-6xl mb-2'>Apply &#38;
             </h1>
            <h1 className='text-6xl mb-12 text-red-700'>   
            Join the Conversation
             </h1>


            <div className="container mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3 ">
    <div className="flex justify-center text-2xl brd border:dotted border-2 border-red-300 hover:bg-red-200 hover:opacity-80 p-4 cursor-pointer items-center">
        <Link href='/apply/speaker'>

    <a>
                {/* <DashboardIcon src="/assets/wallet.svg" alt="wallet" /> */}
                Apply as a Speaker
              </a>
        </Link>
              
      
    </div>
    <div className="flex justify-center text-2xl brd border:dotted border-2 border-red-300 hover:bg-red-200 hover:opacity-80 p-4 cursor-pointer items-center">
        Apply as a Sponsor
    </div>
    <div className="flex justify-center text-2xl brd border:dotted border-2 border-red-300 hover:bg-red-200 hover:opacity-80 p-4 cursor-pointer items-center">
        Apply as a Volunteer
    </div>
    <div className="flex justify-center text-2xl brd border:dotted border-2 border-red-300 hover:bg-red-200 hover:opacity-80 p-4 cursor-pointer items-center">
        Apply as a Media Partner
    </div>

  </div>
</div>
        </section>

        <section className='max-w-6xl m-auto my-16 ' >
        <div className="md:grid md:grid-cols-12">
  <div className="md:col-span-6 col-span-6">
    <Image
    src='/speaker-one.jpg'
 
    width="100%" height="70%" layout="responsive" objectFit="cover"
      />
  </div>
  <div className="col-span-6 md:pl-20 [&>p]:mb-3 p-3 md:p-0">
    <h2 className='text-3xl font-semibold leading-10 mb-8'>Lorem ipsum dolor sit amet, consectetur adipisi.</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae maxime reprehenderit nobis, sunt quod voluptatibus odit itaque deserunt autem. Commodi consequuntur perferendis deleniti voluptate molestiae sunt exercitationem aliquid ipsam nisi, necessitatibus, modi excepturi fuga ullam odio aspernatur quisquam eos earum?</p>

    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, earum sapiente, ipsum minus explicabo animi quis laboriosam libero blanditiis vel nobis, labore totam quae ut.</p>
  </div>
</div>
        </section>

        <section className='max-w-6xl m-auto my-16 ' >
        <div className="md:grid md:grid-cols-12">
  <div className="col-span-6 md:pl-20 [&>p]:mb-3 p-3 md:p-0">
    <h2 className='text-3xl font-semibold leading-10 mb-8'>Lorem ipsum dolor sit amet, consectetur adipisi.</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae maxime reprehenderit nobis, sunt quod voluptatibus odit itaque deserunt autem. Commodi consequuntur perferendis deleniti voluptate molestiae sunt exercitationem aliquid ipsam nisi, necessitatibus, modi excepturi fuga ullam odio aspernatur quisquam eos earum?</p>

    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, earum sapiente, ipsum minus explicabo animi quis laboriosam libero blanditiis vel nobis, labore totam quae ut.</p>
  </div>
  <div className="md:col-span-6 col-span-6">
    <Image
    src='/speaker-two.jpg'
 
    width="100%" height="70%" layout="responsive" objectFit="cover"
      />
  </div>
</div>
        </section>

        <section className='max-w-6xl m-auto my-16'>
            <h2 className='text-3xl text-semibold'>Partners</h2>
            <hr  className='my-4'/>
            <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3 my-12 ">
    <div className="flex justify-center  shadow-2xl p-4 cursor-pointer items-center">
      <Image src='/eth.png' 
     width='80px' height='80px' style={{border:'1px solid red'}}
       />
    </div>
    <div className="flex justify-center  shadow-2xl p-4 cursor-pointer items-center">
      <Image src='/Epns.png' 
      width='80px' height='80px'
       />
    </div>
    <div className="flex justify-center  shadow-2xl p-4 cursor-pointer items-center">
      <Image src='/hydro.png' 
     width='80px' height='80px'
       />
    </div>
    <div className="flex justify-center  shadow-2xl p-4 cursor-pointer items-center ">
      <Image src='/kernel.png' 
     width='100%' height='100%'  
       />
    </div>
    </div>
            </div>
        </section>

       
    </>)
}

export default HomeView