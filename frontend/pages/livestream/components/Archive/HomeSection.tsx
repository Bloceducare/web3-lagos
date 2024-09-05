import Image from "next/image";
import Link from "next/link";

interface StreamProps {
  image1: string;
  image2: string;
  link1: string;
  link2: string;
  label1: string;
  label2: string;
}

const Streams: React.FC<StreamProps> = ({image1, image2, label1, label2, link1,  link2}) => {

  const labelStyle = "p-4";
  const card = "shadow-md rounded-lg w-full md:w-[48%]";
  const imageStyle = "w-full bg-[#ccc] rounded-t-lg h-[250px]";

  return (
    <div className="flex flex-col w-[85%] gap-y-10 md:gap-y-0 md:flex-row md:w-[1200px] md:px-8 lg:w-[1000px] justify-between">
      <div className={`${card}`}>
        <Link href={link1} className="">
          <Image src={image1} alt={label1} className={`${imageStyle}`} />
          <p className={`${labelStyle}`}>{label1}</p>
        </Link>
      </div>
      <div className={`${card}`}>
        <Link href={link2} className="">
          <Image src={image2} alt={label2} className={`${imageStyle}`} />
          <p className={`${labelStyle}`}>{label2}</p>
        </Link>
      </div>
    </div>
  )
}

export default Streams;
