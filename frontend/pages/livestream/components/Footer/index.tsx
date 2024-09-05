import Image from "next/image";
import Link from "next/link";
import twitter from "../../../../public/SocialIconsTwitter.png"


const Footer = () => {
  return (
    <footer className='flex justify-center items-center px-8 py-10 bg-transparent'>
      <div className="flex items-center justify-between md:w-[1200px] xl:w-[1600px] border-t-[1px] pt-8 border-[#EAECF0] ">
        <Link href="mailto:event@web3bridge.com" className="text-[16px] text-[#98A2B3]">
          <p>Enquiries/Details: event@web3bridge.com</p>
        </Link>
        <Link href="https://x.com/Web3LagosCon">
          <Image src={twitter} alt="" width={0} height={0} className="w-6" />
        </Link>
      </div>
    </footer>
  )
}

export default Footer
