import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/next"
// import { SidebarProvider } from "@/components/hackathon-sidebar/SidebarContext";

const GA_TRACKING_ID = 'G-P6C4Q9GY24';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if ((window as any).gtag) {
        (window as any).gtag('config', GA_TRACKING_ID, {
          page_path: url,
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);
  
  return (
    <>
      {/* <SidebarProvider> */}
      <Analytics />
      <Component {...pageProps} />
      {/* </SidebarProvider> */}
    </>
  );
}

export default MyApp;
