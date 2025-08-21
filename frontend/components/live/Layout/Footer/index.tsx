import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="max-w-7xl mx-auto w-full flex justify-between items-center mt-10 px-8 py-10 bg-transparent border-[#EAECF0] border-t-[1px]">
      <Link
        href="mailto:event@web3bridge.com"
        className="text-[16px] text-[#98A2B3]"
      >
        <p>Enquiries/Details: event@web3bridge.com</p>
      </Link>
      <Link href="https://x.com/Web3LagosCon">
        <Image
          src={"/SocialIconsTwitter.png"}
          alt=""
          width={0}
          height={0}
          className="w-6"
        />
      </Link>
    </footer>
  );
};

export default Footer;
