import Image from "next/image";
import sponsor from "../public/Sponsors.png";
import Partners from "../public/Partners.png";

const Sponsors = () => {
  return (
    <section className="container mx-auto p-4 mb-24">
      <div className="p-4 mt-12 md:px-3 md:py-16 md:mx-10 md:mt-4 lg:px-3 lg:py-16 lg:mx-10">
        <h1 className="text-[64px] leading-[70px] font-bold text-[#23242A] flex justify-center mb-20 tracking-wide">
          Our <span className="ml-2">Sponsors</span>
        </h1>
      </div>
      <div className="flex -mt-6 lg:-mt-32 justify-center">
        <Image src={sponsor} alt="sponsor" />
      </div>
      <div className="border-t linear my-8"></div>

      <div className="p-4 mt-12 md:px-3 md:py-16 md:mx-10 md:mt-4 lg:px-3 lg:py-16 lg:mx-10">
        <h1 className="text-[64px] leading-[70px] font-bold text-[#23242A] flex justify-center mb-20 tracking-wide">
          Community Partners
        </h1>
      </div>
      <div className="flex -mt-6 lg:-mt-32 justify-center">
        <Image src={Partners} alt="sponsor" />
      </div>

     
    </section>
  );
};
export default Sponsors;
