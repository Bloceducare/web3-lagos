import type { NextPage } from "next";
import Head from "next/head";
import Script from "next/script"; // Import Script component for handling external scripts
import HomeView from "@/views/home";
import Layout from "@/components/layout";
import { Schedule } from "@/components";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Web3Lagos Sep 5 - Sep 9, 2024</title>
      </Head>
      
      {/* Add the Google Analytics script using the Script component */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-QZDCWPSP3K"></Script>
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QZDCWPSP3K');
        `}
      </Script>

      <Layout>
        <HomeView />
        <Schedule />
      </Layout>
    </div>
  );
};

export default Home;
