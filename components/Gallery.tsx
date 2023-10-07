import arrow from "public/arrows.png";
import Image from "next/image";
const Gallery = () => {
  return (
    <>
    <section>
      <div className=" items-center bg-top bg-no-repeat bg-[url('../images/web3lagos.jpg')]  bg-cover ">
        <div className="p-4 md:p-12  lg:p-12">
          <div className="bg-transparent  text-gray-200">
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
                      href="#"
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
                      href="#"
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
      </section>
    </>
  );
};

export default Gallery;
