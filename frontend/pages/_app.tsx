import "../styles/globals.css";
import 'react-tabs/style/react-tabs.css';
import type { AppProps } from "next/app";
import Layout from "../frontend/components/layoutts/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
