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
      <main className="bg-theme_gray min-h-screen flex justify-center">
        <div className="py-4 px-8 sm:w-2/3 xl:w-1/2">
          <RegexPlayground />
        </div>
      </main>
    </div>
  )
}

export default Home
