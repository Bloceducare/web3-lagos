import Image from "next/image";

const Sponsors = () => {
  return (
    <div className="bg-white">
    <div className="max-w-6xl px-3 py-16 mx-auto ">
      <div className="mb-8 border-b-2 border-b-gray-300">
        <h2 className="text-2xl font-normal">Headline Sponsors:</h2>
        <div className="flex flex-wrap items-center my-2 mr-6">
          <Image src="/ETH-logo.svg" width={200} height={80} alt="sponsor" />
          <Image src="/polygon-matic.svg" width={200} height={100} alt="sponsor" />
          <Image src="/pillow.svg" width={200} height={100} alt="sponsor" />


          
        </div>
      </div>
      <div className="mb-8 border-b-2 ">
        <h2 className="text-2xl font-normal">Silver Sponsors:</h2>

        <div className="flex flex-wrap items-center ">

        <div className="my-2 mr-6 ">
          <img src='/starkware.png' alt="img" />          
          </div>
          
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
          <div className="my-2 mr-6 ">
          <img src='/nahmi.png' alt="img" />          
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
    

      <div className="mb-8">
      <h2 className="text-2xl font-normal">Community Partners:</h2>

      <div className="flex flex-wrap items-center">
        
      <div className="mr-6">
        <img src="/siban-m.png" alt='siban logo' />
        </div>
        <div className="mr-6">
        <img src="/oau-m.png" alt='oau logo' />
          </div>
        <div className="mr-6">
        <img src="/unn-m.png" alt='unn logo' />
          </div>
          <div className="mr-6">
        <img src="/bayero-m.png" alt='bayero logo' />
          </div>

          <div className="mr-6">
        <img src="/lasu-m.png" alt='lasu logo' />
          </div>

          <div className="mr-6">
        <img src="/uniben-m.png" alt='uniben logo' />
          </div>
          <div className="mr-6">
        <img src="/imo-m.png" alt='uniben logo' />
          </div>
          <div className="mr-6">
        <img src="/web3ladies-m.png" alt='uniben logo' />
          </div>
        
      </div>
      </div>
    </div>
    </div>
  );
};

export default Sponsors;
