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
    <section className="flex flex-col items-center justify-center w-full py-12">
      <div className="w-full max-w-2xl p-4 text-center">
        
        <div className="aspect-w-16 aspect-h-9">
          <YouTube videoId="EbcGAXOTWbA" opts={opts} onReady={onPlayerReady} />
        </div>
        {children && (
          <p className="mt-6 text-lg lg:leading-[1.7em] lg:text-[24px] px-4 text-white">
            {children}
          </p>
        )}
      </div>
    </section>
  );
};

export default YoutubeIframe;
