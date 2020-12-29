import { FunctionComponent } from 'react'
import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

import NextJsQueryParamProvider from '../providers/NextJsQueryParamProvider'

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <NextJsQueryParamProvider>
      <Component {...pageProps} />
    </NextJsQueryParamProvider>
  )
}

export default MyApp
