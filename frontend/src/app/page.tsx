'use client'
import { useState, useEffect } from 'react'
import StartScreen from '../components/StartScreen'
import DifficultyScreen from '../components/DifficultyScreen'
import QuestionScreen from '../components/QuestionScreen'
import GameOverScreen from '../components/GameOverScreen'
import GoalScreen from '../components/GoalScreen'
import FortuneScreen from '../components/FortuneScreen'
import { useLang } from '../lib/langContext'

type GameState =
  | 'start'
  | 'difficulty'
  | 'question'
  | 'gameover'
  | 'goal'
  | 'fortune'

export default function Home() {
  const { language } = useLang();
  const [gameState, setGameState] = useState<GameState>('start')
  const [difficulty, setDifficulty] = useState<'easy' | 'normal' | 'hard'>('easy')
  const [questions, setQuestions] = useState([])
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  useEffect(() => {
    if (gameState === 'question') {
      fetch(`${API_BASE_URL}/questions?difficulty=${difficulty}&language=${language}`)
        .then(res => res.json())
        .then(data => {
          // 前のquestionsと違う場合だけ更新
          setQuestions(prev => {
            const prevStr = JSON.stringify(prev);
            const newStr = JSON.stringify(data);
            if (prevStr !== newStr) {
              return data;
            }
            return prev; // 変わってなければ更新しない
          });
        });
    }
  }, [API_BASE_URL, gameState, difficulty, language])

  return (
    <>
      {gameState === 'start' && (
        <StartScreen language={language} onStart={() => setGameState('difficulty')} />
      )}

      {gameState === 'difficulty' && (
        <DifficultyScreen
          language={language}
          onSelect={(difficulty) => {
            setDifficulty(difficulty)
            setGameState('question')
          }}
        />
      )}

      {gameState === 'question' && (
        <QuestionScreen
          language={language}
          difficulty={difficulty}
          questions={questions}
          onGameClear={() => setGameState('goal')}
          onGameOver={() => setGameState('gameover')}
        />
      )}

      {gameState === 'gameover' && (
        <GameOverScreen
          language={language}
          difficulty={difficulty}
          onRetry={() => setGameState('question')}
          onBackToStart={() => setGameState('start')}
        />
      )}

      {gameState === 'goal' && (
        <GoalScreen language={language} onTapFortune={() => setGameState('fortune')} />
      )}

      {gameState === 'fortune' && (
        <FortuneScreen
          language={language}
          difficulty={difficulty}
          onRestart={() => setGameState('question')}
          onTitle={() => setGameState('start')}
        />
      )}
    </>
  )
}
