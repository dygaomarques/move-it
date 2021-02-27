import '../styles/globals.css'

import { ChallengeProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';

function MyApp({ Component, pageProps }) {

  return (
    <ChallengeProvider>
      <CountdownProvider>
        <Component {...pageProps} />
      </CountdownProvider>
    </ChallengeProvider>
  )
}

export default MyApp
