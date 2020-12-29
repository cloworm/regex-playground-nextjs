import { FunctionComponent } from 'react'
import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import { RecoilRoot } from 'recoil'

import NextJsQueryParamProvider from '../providers/NextJsQueryParamProvider'

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <NextJsQueryParamProvider>
        <Component {...pageProps} />
      </NextJsQueryParamProvider>
    </RecoilRoot>
  )
}

export default MyApp
