import React, { FunctionComponent } from 'react'
import type { AppProps } from 'next/app'
import NextJsQueryParamProvider from '../providers/NextJsQueryParamProvider'
import 'tailwindcss/tailwind.css'

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <NextJsQueryParamProvider>
      <Component {...pageProps} />
    </NextJsQueryParamProvider>
  )
}

export default MyApp
