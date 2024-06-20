import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";

type YoutubeIframeProps = {
  children?: React.ReactNode; // Description text as children
};

const YoutubeIframe: React.FC<YoutubeIframeProps> = ({ children }) => {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "350",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <section className="bg-hero h-[650px]">
      <div className="flex justify-center p-4">
        <div className="mt-12 2xl:w-[60vw] lg:w-[85vw] ">
          <h3 className="text-center font-bold my-4 text-white text-3xl lg:text-4xl leading-10 lg:leading-12">
            Highlights from W3LC 2023
          </h3>
          <div className="aspect-w-16 aspect-h-9">
            <YouTube
              videoId="EbcGAXOTWbA"
              opts={opts}
              onReady={onPlayerReady}
            />
          </div>
        </div>
      </div>
      {children && (
        <p className="text-center my-6 2xl:w-[60vw] lg:w-[85vw] m-auto text-lg  lg:leading-[33px] lg:text-[24px] px-4 lg:px-0 text-white">
          {children}
        </p>
      )}
    </section>
  );
};

export default YoutubeIframe;
