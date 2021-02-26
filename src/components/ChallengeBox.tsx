// Módulos
import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';

// Estilos
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {

  /**
   * Aqui é onde chamamos a Context API para que ela fique disponível para
   * este componente
   */
  const { activeChallenge, resetChallenge } = useContext(ChallengeContext);

  return (
    <div className={styles.ChallengeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.ChallengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.ChallengeFailedButton}
              onClick={resetChallenge}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.ChallengeSucceededButton}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
          <div className={styles.ChallengeNotActive}>
            <strong>Finalize um ciclo para receber um desafio</strong>
            <p>
              <img src="icons/level-up.svg" alt="Level up" />
           Avance de level completando desafios.
         </p>
          </div>
        )}
    </div>
  )
}