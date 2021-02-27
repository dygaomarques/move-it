import { createContext, ReactNode, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect'
import Cookie from 'js-cookie';

// Importando "database" de desafios
import challenges from '../../challenges.json';

/** 
 * COMPONENTES
*/
import { LevelUpModal } from '../components/LevelUpModal';

/** 
 * Tipando as propriedades recebidas pelo componente
 * "ChallengeProvider"
*/
interface ChallengeProviderProps {
  children: ReactNode,
  level: number,
  currentExperience: number,
  challengesCompleted: number
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
  completeChallenge: () => void;
  handleLevelUpModal: () => void;
}

/**
 * Aqui estamos criando a context API, e definindo a tipagem da mesma logo após
 */
export const ChallengeContext = createContext({} as ChallengeContextData);

/** 
 * Aqui estamos criando um componente para envolver toda a aplicação
 * deixando assim a Context API disponível em todo o projeto
 */
export function ChallengeProvider({ children, ...rest }: ChallengeProviderProps) {

  
  /**
   * Aqui estão todos os estados que serão necessários na aplicação
   */
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);


  // Calculo da experiência necessária para usuário alcançar o próximo nível
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  /**
   * Pedindo autorização para exibir notificações
   */
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  /**
   * Criando cookies para salvar os dados do usuário
   */
  useEffect(() => {

    // Setando os cookies
    Cookie.set('level', String(level));
    Cookie.set('currentExperience', String(currentExperience));
    Cookie.set('challengesCompleted', String(challengesCompleted));

  }, [currentExperience, level, challengesCompleted]);



  /**
   * Função responsável por subir o nível do usuário
   */
  function levelUp() {

    // Subindo o nível
    setLevel(level + 1);

    // Chamando função para exibir/ocultar modal
    handleLevelUpModal();
  }

  /**
   * Função responsável por abrir/fechar o modal
   */
  function handleLevelUpModal() {
    setIsLevelUpModalOpen(!isLevelUpModalOpen);
  }

  /**
   * Função para subir o XP do usuário
   */
  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
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

    // Tocando o audio da notificação
    new Audio('/notification.mp3').play();

    // Enviando a notificação de novo desafio
    if (!isMobile && Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉',{
        body: `Valendo ${challenge.amount} xp`
      });
    }
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
      experienceToNextLevel,
      completeChallenge,
      handleLevelUpModal
    }}>

      {/* Este código permite que "ChallengeContext" receba um outro componente
      como filho */}
      {children}
      
      
      { isLevelUpModalOpen && <LevelUpModal /> }
    </ChallengeContext.Provider>
  )
}