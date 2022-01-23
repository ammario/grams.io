import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Head from 'next/head'

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>Half-life calculator – grams.io</title>
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
