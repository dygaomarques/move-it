// Módulos do React
import { useContext, useEffect, useState } from "react";

// Estilos
import styles from "../styles/components/Countdown.module.css";

// Módulos adicionais
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChallengeContext } from "../contexts/ChallengesContext";

let countdownTime;

export function Countdown() {

  // Context
  const { startNewChallenge } = useContext(ChallengeContext);

  // Data
  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  // Countdown
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  /* Função responsável por iniciar o countdown */
  function startCountdown() {
    setIsActive(!isActive);
    if (isActive) {
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
    setIsActive(false);

  }

  useEffect(() => {
    countdownTime = setTimeout(() => {
      if (isActive && time > 0) {

        // Decrementando do timer
        setTime(time - 1);

      } else if (isActive && time == 0) {

        // Setando o termino do countdown
        setHasFinished(true);

        // Setando o estado do countdown
        setIsActive(false);

        startNewChallenge();
      }
    }, 1000);
  }, [isActive, time]);

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado <FontAwesomeIcon className={styles.countdownButtonIcon} icon={faCheckCircle} />
        </button>
      ) : (
          <>
            { isActive ? (
              <button
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick={resetCountdown}
              >
                Abandonar ciclo
              </button>
            ) : (
                <button
                  className={styles.countdownButton}
                  onClick={startCountdown}
                >
                  Iniciar um ciclo
                </button>
              )}
          </>
        )}
    </div>
  )
}