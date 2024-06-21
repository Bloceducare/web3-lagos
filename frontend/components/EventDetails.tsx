import Image from "next/image";
import Sponsors from "./Sponsors";
import Link from "next/link";
// import vectorPic from "../images/vector.svg";

// bg-cover bg-[url('../images/main_bg.png')] h-[calc(110vh-20rem)] w-[1440px]
type DetailsCardProps = {
  cardHeading: string;
  cardContent: string;
  cardLink: string;
  linkName: string;
};

const DetailsCard: React.FC<DetailsCardProps> = ({
  cardHeading,
  cardContent,
  cardLink,
  linkName,
}) => {
  return (
    <div className="bg-white shadow-xl w-full flex flex-col items-center rounded-2xl xl:h-[420px] lg:h-[420px] md:h-fit sm:h-fit sm:w-full justify-between">
      <div className="p-[50px] sm:p-[30px]">
        <h3 className="mb-6 text-[#122C47] text-2xl font-semibold ">
          {" "}
          {cardHeading}{" "}
        </h3>
        <p className="text-slate-600">{cardContent}</p>
      </div>
      <div className="border-t-[1px] w-full relative py-[20px] px-[50px] ">
        <a className="text-left underline" href={cardLink}>
          {linkName}
        </a>
      </div>
    </div>
  );
};

const EventDetails = () => {
  return (
    <>
      <div className="flex justify-center items-center mx-auto w-full">
        <div className="flex gap-4 h-full w-full justify-between items-center m-auto flex-col sm:flex-row ">
          <DetailsCard
            cardHeading="Our Goal"
            cardContent="At Web3bridge, we believe education is critical in the drive for adoption of blockchain technology. And we have set up Web3 Lagos conference to bring education across varying topics/subjects and comprehension of blockchain technology."
            cardLink="#"
            linkName="Learn More"
          />

          <DetailsCard
            cardHeading="Event Overview "
            cardContent="Web3 Lagos Conference is a 3-day physical and virtual event comprising of hackathon, workshops, networking, career fair, panel session, talks, etc. The event focuses on onboarding and supporting the growth of individual new to the concept of blockchain and decentralisation, helping technical and non-technical blockchain native persons realise the endless possibilities and opportunities of the Blockchain & Ethereum ecosystem."
            cardLink="#"
            linkName="Visit X(Twitter) to Learn More"
          />
        </div>
      </div>
    </>
  );
};
export default EventDetails;
