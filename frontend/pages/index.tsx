import type { NextPage } from "next";
import Head from "next/head";
import HomeView from "@/views/home";
import Layout from "@/components/layout";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Web3Lagos Sep 5 - Sep 9, 2024</title>
      </Head>
      <Layout>
        <HomeView />
      </Layout>
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
