import Image from "next/image";
import Link from "next/link";
import React from "react";

type Icard = {
  title: string;
  desc: string;
  more: string;
  link: string;
};

const Card = ({ title, desc, more,link }: Icard) => {
  return (
    <div className="bg-header shadow-lg rounded-lg flex flex-col h-full">
      <div className="p-6 flex-grow">
        <h3 className="my-2 text-[40px] leading-[44px] font-bold text-[#23242A]">{title}</h3>
        <p className="mb-12 text-[20px] leading-[26px] font-[500] text-[#23242A] overflow-y-auto">
          {desc}
        </p>
      </div>
      <div className="shaow-lg p-6 border border-t-2">
        <a target="_blank" className="text-[#053758] underline font-[700] text-[20px] leading-[27px]" href={link} rel="noopener noreferrer">
          {more}
        </a>
      </div>
    </div>
  );
};


function About() {
  return (
    <section className="mt-12">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-x-8 items-stretch">
          <Card
            title="Our Goal"
            desc="At Web3bridge, we believe education is critical in the drive for adoption of blockchain technology. And we have set up Web3 Lagos conference to bring education across varying topics/subjects and comprehension of blockchain technology and its core infrastructure."
            more={`Learn more`}
            link="https://www.web3bridge.com/"
          />

          <Card
            title="Event Overview"
            desc="Web3 Lagos Conference is a 3-day physical and virtual event comprising of hackathon, workshops, networking, career fair, panel session, talks, etc. The event focuses on onboarding and supporting the growth of individual new to the concept of blockchain and decentralisation, helping technical and non-technical blockchain native persons realise the endless possibilities and opportunities of the Blockchain & Ethereum ecosystem."
            more="Visit X (Twitter) to Learn more"
            link={`https://twitter.com/Web3Bridge`}
          />
        </div>
      </div>
    </section>
  );
}

export default About;
