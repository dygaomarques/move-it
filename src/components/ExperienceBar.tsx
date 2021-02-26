import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/experienceBar.module.css';

export function ExperienceBar(){

  const { level, currentExperience, experienceToNextLevel } = useContext(ChallengeContext);

  const percentToNextLevel = Math.round((currentExperience * 100) / experienceToNextLevel);

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%`, transition: 'ease-in-out 300ms' }} />

        <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
          {percentToNextLevel}xp
        </span>
      </div>
      <span>{ experienceToNextLevel } xp</span>
    </header>
  );
}