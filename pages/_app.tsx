import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <div>
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
          <Component {...pageProps} />
      </div>
  )
}

export default MyApp
