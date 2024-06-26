import Image from "next/image";


// bg-cover bg-[url('../images/main_bg.png')] h-[calc(110vh-20rem)] w-[1440px]
type DetailsCardProps = {
  cardHeading: string;
  cardContent: string;
  cardLink: string
  linkName: string
}

const DetailsCard: React.FC<DetailsCardProps> = ({cardHeading, cardContent, cardLink, linkName }) => {
  return (
    <div className="bg-white shadow-xl w-full flex flex-col items-center border rounded-2xl lg:h-[26rem] md:h-[31rem] sm:h-fit sm:w-full justify-between">
      <div className="p-[30px] lg:px-[40px] lg:py-[30px]">
        <h3 className="mb-6 text-[#122C47] text-2xl font-semibold "> {cardHeading} </h3>
        <p className="text-slate-600">
          {cardContent}
        </p>
      </div>
      <div className="border-t-[1px] w-full relative px-[30px] py-[20px] lg:px-[40px] ">
        <a className="text-left underline" href={cardLink}>{linkName}</a>
      </div>
  </div>
  )
}

const EventDetails = () => {
  return (
    <>
      <div className="flex justify-center items-center mx-auto">
        <div className="flex gap-5 px-4 py-[3rem] md:px-5 md:py-[5rem] lg:h-full w-full justify-between items-center m-auto flex-col md:flex-row lg:max-w-screen-lg xl:max-w-screen-xl">
         <DetailsCard 
            cardHeading="Our Goal" 
            cardContent="At Web3bridge, we believe education is critical in the drive for adoption of blockchain technology. And we have set up Web3 Lagos conference to bring education across varying topics/subjects and comprehension of blockchain technology." 
            cardLink="#" 
            linkName="Learn More" />
         
         <DetailsCard cardHeading="Event Overview " cardContent="Web3 Lagos Conference is a 3-day physical and virtual event comprising of hackathon, workshops, networking, career fair, panel session, talks, etc. The event focuses on onboarding and supporting the growth of individual new to the concept of blockchain and decentralisation, helping technical and non-technical blockchain native persons realise the endless possibilities and opportunities of the Blockchain & Ethereum ecosystem." cardLink="#" linkName="Visit X(Twitter) to Learn More" />
        </div>
      </div>
    </>
  );
};
export default EventDetails;