import { useEffect, useState } from "react";
import styles from "../styles/components/Countdown.module.css";

export function Countdown() {

  const [time, setTime] = useState(25 * 60);
  const [active, setActive] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setActive(!active);
    if (active) {
      console.warn('Countdonw iniciado!');
    }
    console.warn('Countdonw pausado!');
  }

  useEffect(() => {
    setTimeout(() => {
      if (active && time > 0) {
        setTime(time - 1);
      }
    }, 1000);
  }, [active, time]);

  return (
    <div className={styles.countdownContainer}>
      <div className={styles.timer}>
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
      <button className={styles.countdownButton} onClick={startCountdown}>
        Iniciar um ciclo
      </button>
    </div>
  )
}