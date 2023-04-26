import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

function GramsApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-RZ3SWVWV2J"
      />
      <Script
        id={"gtag"}
        dangerouslySetInnerHTML={{
          __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-RZ3SWVWV2J');
                    `,
        }}
      ></Script>
      <Head>
        <title>Drug Half-life Calculator – Grams</title>

        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <meta
          name="description"
          content="A half-life calculator that estimates how long a drug is in your body."
        />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default GramsApp;
