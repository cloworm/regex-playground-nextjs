import { FunctionComponent } from 'react'
import Head from 'next/head'
import RegexPlayground from '../components/RegexPlayground'
import Examples from '../components/Examples'

const Home: FunctionComponent = () => {
  return (
    <div>
      <Head>
        <title>Regex Playground</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="min-h-screen flex flex-col justify-center bg-theme_gray">
        <main className="flex flex-col align-center xl:w-2/3 py-4 max-w-full px-8">
          <div>
            <h1 className="text-theme_slateBlue font-semibold text-2xl pb-12">RegEx Playground</h1>
          </div>
          <div className="flex flex-row space-x-4">
            <div className="flex-grow w-3/5">
              <RegexPlayground />
            </div>
            <div className="w-2/5">
              <Examples />
            </div>
          </div>
        </main>
        <footer className="bg-gradient-to-br to-theme_slateBlue from-theme_hotPink py-4 mt-auto w-full">
          <div className="text-center text-white">
            <a href='http://www.github.com/cloworm' target='_blank' rel='noopener noreferrer'>
              {/* <img src='/github.png' /> */}
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
