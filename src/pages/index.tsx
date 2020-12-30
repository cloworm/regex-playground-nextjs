import { FunctionComponent } from 'react'
import Head from 'next/head'

import RegexPlayground from '../components/RegexPlayground'
import Examples from '../components/Examples'
import Permalink from '../components/Permalink'

const Home: FunctionComponent = () => {
  return (
    <div>
      <Head>
        <title>Regex Playground</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-theme_gray max-w-full">
        <main className="flex flex-col xl:w-2/3 py-4 px-8">
          <div className="flex flex-col lg:flex-row lg:items-center pb-12">
            <div>
              <h1 className="text-theme_slateBlue font-semibold text-2xl">RegEx Playground</h1>
            </div>
            <div className="lg:ml-auto">
              <Permalink />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-center lg:space-x-4">
            <div className="flex-grow w-full lg:w-3/5 pb-10">
              <RegexPlayground />
            </div>
            <div className="w-full lg:w-2/5 order-first lg:order-last pb-10">
              <Examples />
            </div>
          </div>
        </main>
        <footer className="bg-gradient-to-br to-theme_slateBlue from-theme_hotPink py-4 mt-auto w-full">
          <div className="text-center text-white">
            <a href='http://www.github.com/cloworm' target='_blank' rel='noopener noreferrer'>
              { ' ' }
            cloworm
            </a>
            { ' ' }
          © 2020
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home
