/* eslint-disable @next/next/no-document-import-in-page */
// pages/_document.js
import { Head, Html, Main, NextScript } from 'next/document'

const APP_NAME = 'Web3Bridge'
const APP_DESCRIPTION = 'We are Building a Sustainable web3 community in Africa'

export default function Document() {
  return (
    <Html>
      <Head>
        {/* <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-P6C4Q9GY24"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-P6C4Q9GY24');
</script> */}
        <meta name="application-name" content={APP_NAME} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={APP_NAME} />
        <meta name="description" content={APP_DESCRIPTION} />

        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="web3bridge" />
        <meta property="og:description" content="Welcome to web3bridge" />
        <meta property="og:image" content="" />

        <link rel="shortcut icon" href="favicon.png" />
   
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-P6C4Q9GY24"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-P6C4Q9GY24', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}