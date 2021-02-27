/**
 * MÓDULOS
 * 
 * Módulos que estão instalados
 */

// Este módulo é utilizado para inserir informações no <head> da página
import Head from 'next/head'

/**
 * TIPAGENS
 * 
 * Tipagens que estão instaladas
 */

// Essa aqui é a tipagem do contexto do server-side
import { GetServerSideProps } from 'next';


/**
 * INTERFACES
 * 
 * Interfaces são tipagens manuais
 */

// Propriedades repassadas ao componente principal
interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

/**
 * ESTILOS
 * 
 * Módulos de estilo
 */
import styles from '../styles/pages/Home.module.css';


/**
 * COMPONENTES
 * 
 * Componentes da aplicação que foram previamente declarados
 */
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';

/**
 * CONTEXT PROVIDERS
 * 
 * Lida com o 'estado' da aplicação, provê um componente para envolver
 * alguns outros e trabalhar com informações retornadas por esses 
 * providers
 */
import { ChallengeProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';


export default function Home(props: HomeProps) {
  return (
    <ChallengeProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>

    </ChallengeProvider>
  )
}


/**
 * Esta função é executada na camada server-side do Next.js
 * 
 *  - Isso pode ser utilizado para trazer dados "pré" renderizados para o
 * front-end
 * 
 * - Não é recomendado fazer consultas ao banco ou a serviços terceiros nesta
 * camada, do meu ponto de vista é um questão de performance mesmo, devido ao
 * Next.js ter que esperar a resposta de uma requisição a uma API por exemplo
 * para somente depois enviar a página renderizada no servidor para o front-end
 * 
 * ⚠️ Percebi que quando se coloca a função como "async" o tempo de
 * carregamento aumenta consideravelmente, mas pode ser que seja somente meu
 * notebook mesmo 🥲
 * 
 */
export const getServerSideProps: GetServerSideProps = async (context) => {

  // Retornando os cookies do contexto do server side
  const { level, currentExperience, challengesCompleted } = context.req.cookies;

  console.log(context.req.cookies);

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}