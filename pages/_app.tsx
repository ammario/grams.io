import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Head from 'next/head'

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>Half-life Calculator – grams.io</title>
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
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
