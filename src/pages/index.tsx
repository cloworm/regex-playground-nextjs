import { FunctionComponent } from 'react'
import Head from 'next/head'
import RegexPlayground from '../components/RegexPlayground'

const Home: FunctionComponent = () => {
  return (
    <div>
      <Head>
        <title>Regex Playground</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="min-h-screen flex flex-col bg-theme_gray">
        <main className="flex justify-center">
          <div className="py-4 px-8 sm:w-2/3 xl:w-1/2">
            <RegexPlayground />
          </div>
        </main>
        <footer className="bg-gradient-to-br to-theme_slateBlue from-theme_hotPink py-4 mt-auto">
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
