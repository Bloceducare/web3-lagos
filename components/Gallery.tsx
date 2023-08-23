const Gallery = () => {
  
    return (
      <>
        <div className="h-screen flex items-center bg-top bg-no-repeat bg-[url('../images/web3lagos.jpg')] h-[calc(100vh-4rem)] bg-cover ">
          <div className="p-4 md:p-12 lg:p-12">
            <div className="bg-transparent  text-gray-200">
              <div className="text-3xl md:text-6xl lg:text-6xl font-bold leading-[50px] md:leading-[90px] lg:leading-[90px]">
                <h2>Our</h2>
                <h2>Success Story;</h2>
              </div>
              <div>
                <div className="text-2xl mt-2">
                  <p>Check gallery from the previous event</p>
                </div>
                <div className="flex gap-4 mt-7 items-center">
                  <div className="bg-white rounded-full flex items-center justify-center w-8 h-8 md:w-16 md:h-16 lg:w-16 lg:h-16">
                    <img src="/right-arrow.png" alt="right arrow" width="30px" />
                  </div>
                  <div className="text-2xl md:text-3xl lg:text-3xl ">
                    <p>
                      Day 1:{" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://photos.app.goo.gl/q9LVHsE9un57Kt1d8"
                      >
                        Link Here
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 mt-7 items-center">
                  <div className="bg-white rounded-full flex items-center justify-center w-8 h-8 md:w-16 md:h-16 lg:w-16 lg:h-16">
                    <img src="/right-arrow.png" alt="right arrow" width="30px" />
                  </div>
                  <div className="text-2xl md:text-3xl lg:text-3xl">
                    <p>
                      Day 2:{" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://photos.app.goo.gl/RbwmBsbjJoUq4nTm6"
                      >
                        Link Here
                      </a>
                    </p>
                  </div>
                </div>
  
                <div className="flex gap-4 mt-7 items-center">
                  <div className="bg-white rounded-full flex items-center justify-center w-8 h-8 md:w-16 md:h-16 lg:w-16 lg:h-16">
                    <img src="/right-arrow.png" alt="right arrow" width="30px" />
                  </div>
                  <div className="text-2xl md:text-3xl lg:text-3xl">
                    <p>
                      Day 3:{" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://photos.app.goo.gl/GDmtPM991g56svZs5"
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
      </>
    );
  };
  
  export default Gallery;