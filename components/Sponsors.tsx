import Image from "next/image";

const Sponsors = () => {
  return (
    <div className="bg-white">
    <div className="max-w-6xl px-3 py-16 mx-auto ">
      <div className="mb-8 border-b-2 border-b-gray-300">
        <h2 className="text-2xl font-normal">Headline Sponsors:</h2>
        <div className="my-2 mr-6">
          <Image src="/ETH-logo.svg" width={200} height={80} alt="sponsor" />
        </div>
      </div>
      <div className="mb-8 border-b-2 ">
        <h2 className="text-2xl font-normal">Silver Sponsors:</h2>
        <div className="flex">
          <div className="my-2 mr-6">
            <Image
              src="/wakanda-inu.png"
              width={120}
              height={120}
              alt="sponsor"
            />
          </div>
          <div className="flex items-center my-2 mr-6">
            <Image src="/web3d.svg" width={120} height={120} alt="sponsor" />
          </div>
        </div>
      </div>
      <div className="pb-4 mb-8 border-b-2 ">
        <h2 className="text-2xl font-normal">Media Partners:</h2>
        <div className="flex">
          <div className="flex items-center my-2 mr-6">
            <Image src="/papaya.svg" width={30} height={30} alt="sponsor" />
            <span className="relative ml-2 text-4xl">
              Papayas
              <sub className="absolute right-0 text-xs font-semibold text-orange-500 -bottom-4">
                Studios
              </sub>
            </span>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-normal">Community Partners:</h2>
        <div className="flex flex-wrap">
          <div className="my-2 mr-6">
            <Image
              src="/blockchain-kano.png"
              width={120}
              height={120}
              alt="sponsor"
            />
          </div>
          <div className="my-2 mr-6">
            <Image
              src="/blockchain-benin.png"
              width={120}
              height={120}
              alt="sponsor"
            />
          </div>
          <div className="w-1/2 my-2 mr-6 -mt-6 md:w-auto md:mt-auto">
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

          <div className="relative w-full my-2 mr-6 md:block md:w-auto ">
            <div
              className="absolute mt-12 md:mt-24 md:left-44 left-20"
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
    </div>
  );
};

export default Sponsors;
