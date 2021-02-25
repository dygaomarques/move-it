import Head from 'next/head'
import styles from '../styles/Home.module.css';

import { ExperienceBar } from '../components/ExperienceBar';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <ExperienceBar />
      </div>
    </div>
  )
}
