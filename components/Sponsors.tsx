import Image from "next/image";

const Sponsors = () => {
  return (
    <div className="max-w-6xl px-3 mx-auto my-16 ">
      <div className="mb-8 border-b-2 border-b-gray-300">
        <h2 className="text-2xl font-normal">Headline Sponsors:</h2>
        <div className="mr-6 my-2">
          <Image src="/ETH-logo.svg" width={200} height={80} alt="sponsor" />
        </div>
      </div>
      <div className="mb-8 border-b-2 border-b-gray-300">
        <h2 className="text-2xl font-normal">Silver Sponsors:</h2>
        <div className="flex">
          <div className="mr-6 my-2">
            <Image
              src="/wakanda-inu.png"
              width={120}
              height={120}
              alt="sponsor"
            />
          </div>
          <div className="mr-6 my-2 flex items-center">
            <Image src="/web3d.svg" width={120} height={120} alt="sponsor" />
          </div>
        </div>
      </div>
      <div className="mb-8 border-b-2 border-b-gray-300 pb-4">
        <h2 className="text-2xl font-normal">Media Partners:</h2>
        <div className="flex">
          <div className="mr-6 my-2 flex items-center">
            <Image src="/papaya.svg" width={30} height={30} alt="sponsor" />
            <span className="text-4xl relative ml-2">
              Papayas
              <sub className="absolute text-xs font-semibold text-orange-500 right-0 -bottom-4">
                Studios
              </sub>
            </span>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-normal">Community Partners:</h2>
        <div className="flex flex-wrap">
          <div className="mr-6 my-2">
            <Image
              src="/blockchain-kano.png"
              width={120}
              height={120}
              alt="sponsor"
            />
          </div>
          <div className="mr-6 my-2">
            <Image
              src="/blockchain-benin.png"
              width={120}
              height={120}
              alt="sponsor"
            />
          </div>
          <div className="mr-6 my-2 md:w-auto w-1/2 -mt-6 md:mt-auto">
            <div
              style={{ width: "100px", height: "100px", position: "relative" }}
            >
              <img
                src="/blockchain-oau.svg"
                alt="sponsor"
                style={{
                  transform: "scale(3)",
                  marginLeft: "58px",
                }}
              />
            </div>
          </div>

          <div className="md:block w-full mr-6 my-2 md:w-auto relative  ">
            <div
              className="absolute border mt-12 md:mt-24 md:left-44 left-20"
              style={{ width: "100px", height: "100px" }}
            >
              <img
                src="/siban.svg"
                alt="sponsor"
                className="absolute"
                style={{
                  transform: "scale(3)",
                  height: "auto",
                  maxWidth: "100%",
                  width: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
