import styles from '../styles/components/Profile.module.css';

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/dygaomarques.png" alt="Rodrigo Marques"/>
      <div>
        <strong>Rodrigo Marques</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level 1</p>
      </div>
    </div>
  )
}