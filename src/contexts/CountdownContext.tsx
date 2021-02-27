import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { ChallengeContext } from "../contexts/ChallengesContext";

/**
 * Tipando a Context API, essas são os estados e 
 * métodos que ficam disponíveis em toda a aplicação
 */
interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isCountdownActive: boolean;
  resetCountdown: () => void;
  startCountdown: () => void;
}

/** 
 * Tipando as propriedades recebidas pelo componente
 * "CountdownProvider"
*/
interface CountdownProviderProps {
  children: ReactNode
}


/**
 * Aqui estamos criando a context API, e definindo a tipagem da mesma logo após
 */
export const CountdownContext = createContext({} as CountdownContextData);

/** 
 * Aqui estamos criando um componente para envolver toda a aplicação
 * deixando assim a Context API disponível em todo o projeto
 */
export function CountdownProvider({ children }: CountdownProviderProps) {

  // Context
  const { startNewChallenge } = useContext(ChallengeContext);
  
  // Tipagem
  let countdownTime;

  // Data
  const [time, setTime] = useState(0.1 * 60);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  // Countdown
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  /* Função responsável por iniciar o countdown */
  function startCountdown() {
    setIsCountdownActive(!isCountdownActive);
    if (isCountdownActive) {
      console.warn('Countdown iniciado!');
    }
  }

  /* Função responsável por resetar o countdown */
  function resetCountdown() {

    // Parando o countdown no momento do click
    clearTimeout(countdownTime);

    // Resetando o timer
    setTime(0.1 * 60);

    // Setando o estado do countdown
    setIsCountdownActive(false);

    // Setando o termino do countdown
    setHasFinished(false);

  }

  useEffect(() => {
    countdownTime = setTimeout(() => {
      if (isCountdownActive && time > 0) {

        // Decrementando do timer
        setTime(time - 1);

      } else if (isCountdownActive && time == 0) {

        // Setando o termino do countdown
        setHasFinished(true);

        // Setando o estado do countdown
        setIsCountdownActive(false);

        startNewChallenge();
      }
    }, 1000);
  }, [isCountdownActive, time]);

  /**
   * Aqui estamos retornando o componente, a propriedade ".provider" é 
   * justamente a que dá a aplicação o poder de usar a Context API,
   * seguido da prop "value" onde ficam concentrados todos os estados e
   * métodos que serão disponibilizados para toda a aplicação
   */
  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isCountdownActive,
      resetCountdown,
      startCountdown,
    }}>

      {/* Este código permite que "CountdownContext" receba um outro componente
      como filho */}
      {children}

    </CountdownContext.Provider>
  )
}