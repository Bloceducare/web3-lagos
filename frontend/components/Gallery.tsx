import arrow from "../public/arrows.png";
import Image from "next/image";

const Gallery = () => {
  return (
    <>
    {/* <section> */}
      <div className="">
        <div className="flex w-full items-center justify-center py-[3rem] md:px-5 md:py-[5rem] bg-top bg-no-repeat bg-[url('../images/web3lagos.jpg')]  bg-cover">
          <div className="w-full px-4 lg:space-y-10 lg:max-w-screen-lg xl:max-w-screen-xl text-gray-200">
            <div className="text-3xl md:text-6xl lg:text-6xl font-bold leading-[50px] md:leading-[56px] lg:leading-[56px]">
              <h2>Our</h2>
              <h2>Success Story;</h2>
            </div>
            <div>
              <div className="text-2xl mt-2">
                <p>Check gallery from the previous event</p>
              </div>
              <div className="flex gap-4 mt-7 items-center">
                <div>
                  <Image src={arrow} alt="arrow" />
                </div>
                <div className="text-2xl md:text-3xl lg:text-3xl ">
                  <p>
                    W3LC 2022:{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://docs.google.com/document/d/11RWT18bAajPigJg_o39Kg2XM8BWaaw3D22KdJ9OTooA/edit?usp=sharing"
                    >
                      Link Here
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mt-7 items-center">
                <div>
                <Image src={arrow} alt="arrow" />
                </div>
                <div className="text-2xl md:text-3xl lg:text-3xl">
                  <p>
                    W3LC 2023:{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://docs.google.com/document/d/1JdcvII6U_3O6FQngIkaEVIDiOMMmaiMGotslBygbL-0/edit?usp=sharing"
                    >
                      Link Here
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </section> */}
    </>
  );
};

export default Gallery;
