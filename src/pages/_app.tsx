import '../styles/globals.css'

import NextJsQueryParamProvider from '../providers/NextJsQueryParamProvider'

function MyApp({ Component, pageProps }) {
  return (
    <NextJsQueryParamProvider>
      <Component {...pageProps} />
    </NextJsQueryParamProvider>
  )
}

export default MyApp
