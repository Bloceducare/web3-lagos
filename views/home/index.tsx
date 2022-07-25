import Image from 'next/image'
import Button from '@components/button'
import DateCountDown from '@components/dateCountDown'
import { HiLocationMarker} from "react-icons/hi";

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
    </>)
}

export default HomeView