import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Head from 'next/head'

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>Drug Half-life Calculator – Grams</title>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-RZ3SWVWV2J"/>
                <script dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-RZ3SWVWV2J');
                    `
                }}>
                </script>
                <meta name="viewport" content= "width=device-width, user-scalable=no" />
                <meta name="description" content="A half-life calculator that estimates how long a drug is in your body."/>
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
