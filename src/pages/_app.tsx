import { AppProps } from 'next/app'
import { FunctionComponent } from 'react'
import NextJsQueryParamProvider from '../providers/NextJsQueryParamProvider'

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <NextJsQueryParamProvider>
      <Component {...pageProps} />
    </NextJsQueryParamProvider>
  )
}

export default MyApp
