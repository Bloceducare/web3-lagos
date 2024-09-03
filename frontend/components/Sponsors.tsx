import Image from "next/image";
import images from "../public/Sponsors/imageImports"; 

type UIProps = {
  title: string;

}

const SponsorUI:React.FC<UIProps> = ({title}) => {
  return (
    <div className="p-0 md:py-10 xl:px-10 xl:mx-10">
      <h1 className="text-[42px] md:text-[54px] text-center leading-[70px] font-bold text-[#23242A] flex justify-center mb-10 tracking-wide md:mb-10">
        {title}
      </h1>
      <div className="flex flex-wrap w-full justify-between px-6 gap-y-5 ">
        {images.map((image, index) => (
          <Image src={image} key={index} alt="sponsor" className="w-[130px] lg:w-[180px] h-[70px] lg:h-[100px] shadow p-4 " />
        ))}
      </div>
  </div>
  );
}

const Sponsors = () => {
  return (
    <section className="container py-10 mx-auto xl:px-4">
      <SponsorUI title="Our Sponsors" />

      {/* <div className="border-t linear my-8"></div> */}

      {/* <SponsorUI title="Community Partners" /> */}
    </section>
  );
};
export default Sponsors;
