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
    <section className="flex flex-col items-center justify-between bg-hero space-y-6 w-full py-[3rem] md:py-[3rem]">
      <div className="p-4 lg:max-w-screen-lg xl:max-w-screen-xl">
        <div className="space-y-[3rem]">
          <h3 className="text-center font-bold my-4 text-white text-3xl lg:text-4xl leading-10 lg:leading-12">
            Highlights from W3LC 2023
          </h3>
          <div className="aspect-w-6 aspect-h-9">
            <YouTube
              videoId="EbcGAXOTWbA"
              opts={opts}
              onReady={onPlayerReady}
            />
          </div>
        </div>
        {children && (
          <p className="text-center mt-[3rem] text-lg  lg:leading-[1.7em] lg:text-[24px] px-4 lg:px-0 text-white">
            {children}
          </p>
        )}
      </div>
    </section>
  );
};

export default YoutubeIframe;
