import NextJsQueryParamProvider from '../providers/NextJsQueryParamProvider'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
    <NextJsQueryParamProvider>
      <Component {...pageProps} />
    </NextJsQueryParamProvider>
  )
}

export default MyApp
