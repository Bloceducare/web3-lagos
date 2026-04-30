import type { NextPage } from "next";
import Head from "next/head";
import HomeView from "@/views/home/index";
import Layout from "@/components/layout/index";

const PastEventsPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Web3Lagos Past Events</title>
      </Head>
      <Layout>
        <HomeView archiveMode />
      </Layout>
    </div>
  );
};

export default PastEventsPage;
