import { blurUrl, speakersImg } from "@/data";
import Image, { ImageProps } from "next/image";
import speaker from "../public/speaker.png";
import speaker2 from "../public/speakers2.png";
import speaker3 from "../public/speaker3.png";
import speaker4 from "../public/speaker4.png";
import Button from "./button";
import Contact from "./Contact";

const Card = ({ src }: { src: string }) => (
  <>
    <div className="relative mt-5 rounded-md flex  justify-center  ">
      <Image
        src={src}
        placeholder="blur"
        blurDataURL={blurUrl}
        alt="sponsor"
        width={300}
        height={300}
      />
    </div>
  </>
);

const SpeakersCards = () => {
  const speakers = speakersImg.map((speaker, i) => <Card key={i} src={speaker} />);

  return (
    <>
      <div className="speaker_wrapper">
        <div className="max-w-6xl mx-auto speakers-section ">
          <div className="mx-4  p-4">
            <h3 className="text-6xl tracking-wide !text-[#437394] text-center">
              <span className="font-bold text-white">Speakers</span>
            </h3>
            <div>
              {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 justify-center"> */}
              <div>
                <Image
                  src={speaker3}
                  width={1140}
                  height={422}
                  alt="speakers"
                />
              </div>
              <div>
                <Image
                  src={speaker}
                  width={"1140"}
                  height={"814"}
                  alt="speakers"
                />
              </div>
              <div className="mb-6">
                <Image
                  src={speaker2}
                  width={"1140"}
                  height={"814"}
                  alt="speakers"
                />
              </div>

              <div className="mb-12">
                <Image
                  src={speaker4}
                  width={"1140"}
                  height={749}
                  alt="speakers"
                />
              </div>
            </div>
          </div>
        </div>
       <Contact/>
      </div>
    </>
  );
};

export default SpeakersCards;