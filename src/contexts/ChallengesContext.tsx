import { createContext, ReactNode, useState } from 'react';

// Importando "database" de desafios
import challenges from '../../challenges.json';

/** 
 * Tipando as propriedades recebidas pelo componente
 * "ChallengeProvider"
*/
interface ChallengeProviderProps {
  children: ReactNode
}

/**
 * Tipando o challenge que representa o desafio retornado
 * do arquivo .json
 */
interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

/**
 * Tipando a Context API, essas são os estados e 
 * métodos que ficam disponíveis em toda a aplicação
 */
interface ChallengeContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
}

/**
 * Aqui estamos criando a context API, e definindo a tipagem da mesma logo após
 */
export const ChallengeContext = createContext({} as ChallengeContextData);

/** 
 * Aqui estamos criando um componente para envolver toda a aplicação
 * deixando assim a Context API disponível em todo o projeto
 */
export function ChallengeProvider({ children }: ChallengeProviderProps) {

  
  /**
   * Aqui estão todos os estados que serão necessários na aplicação
   */
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);


  // Calculo da experiência necessária para usuário alcançar o próximo nível
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);


  
  function levelUp() {
    setLevel(level + 1);
  }

  /**
   * Função para dar inicio em um novo desafio
   */
  function startNewChallenge() {

    // Obtendo número aleatório
    const radomChallengeIndex = Math.floor(Math.random() * challenges.length);

    // Buscando desafio aleatório
    const challenge = challenges[radomChallengeIndex];

    // Definindo o desafio ativo
    setActiveChallenge(challenge);
  }

  /**
   * Função para resetar o desafio
   */
  function resetChallenge() {
    setActiveChallenge(null);
  }

  /**
   * Aqui estamos retornando o componente, a propriedade ".provider" é 
   * justamente a que dá a aplicação o poder de usar a Context API,
   * seguido da prop "value" onde ficam concentrados todos os estados e
   * métodos que serão disponibilizados para toda a aplicação
   */
  return (
    <ChallengeContext.Provider value={{
      level, 
      levelUp,
      currentExperience,
      challengesCompleted,
      activeChallenge,
      startNewChallenge,
      resetChallenge,
      experienceToNextLevel
    }}>

      {/* Este código permite que "ChallengeContext" receba um outro componente
      como filho */}
      {children}

    </ChallengeContext.Provider>
  )
}