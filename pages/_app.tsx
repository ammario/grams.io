import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Head from 'next/head'

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>Half-Life Calculator – grams.io</title>
                <meta name="viewport" content= "width=device-width, user-scalable=no" />
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
