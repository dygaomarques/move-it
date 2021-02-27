// Módulos do React
import { useContext, useEffect, useState } from "react";

// Estilos
import styles from "../styles/components/Countdown.module.css";

// Módulos adicionais
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CountdownContext } from "../contexts/CountdownContext";

let countdownTime;

export function Countdown() {

  // Context
  const { minutes, seconds, hasFinished, isCountdownActive, resetCountdown, startCountdown } = useContext(CountdownContext);

  // Countdown
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

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
            { isCountdownActive ? (
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