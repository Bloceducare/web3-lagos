import type { NextPage } from "next";
import Head from "next/head";
import HomeView from "@views/home";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Web3Lagos Aug 31 - Sep 2, 2023</title>
      
      </Head>

      <HomeView />
    </div>
  );
};

export default Home;

// <footer className="flex items-center justify-center w-full h-24 border-t">
// <a
//   className="flex items-center justify-center gap-2"
//   href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//   target="_blank"
//   rel="noopener noreferrer"
// >
//   Powered by{' '}
//   <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
// </a>
// </footer>
