import Head from 'next/head'
import styles from '../styles/Home.module.css'
import RegexPlayground from '../components/RegexPlayground'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Regex Playground</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap" rel="stylesheet" />
      </Head>
      <RegexPlayground />
    </div>
  )
}
