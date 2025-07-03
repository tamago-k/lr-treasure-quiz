'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import common from '../styles/common.module.css'

type Props = {
  language: 'ja' | 'en'
  difficulty: 'easy' | 'normal' | 'hard'
  questions: { prompt: string; correct: 'left' | 'right' }[]
  onGameClear: () => void
  onGameOver: () => void
}

const translations = {
  ja: {
    notion: '進むべき方向を選ぼう！',
    loading: '問題データを読み込み中です...',
    slash: '/',
  },
  en: {
    notion: 'Choose the direction to move forward!',
    loading: 'Loading questions...',
    slash: '/',
  },
}
const buttonLabels = {
  ja: {
    left: <ruby>左<rt>ひだり</rt></ruby>,
    right: <ruby>右<rt>みぎ</rt></ruby>,
  },
  en: {
    left: 'L',
    right: 'R',
  },
}

export default function QuestionScreen({
  language,
  difficulty,
  questions,
  onGameClear,
  onGameOver,
}: Props) {
  const t = translations[language]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [leftButtonIsLeft, setLeftButtonIsLeft] = useState(true)
  const timeLimitSeconds = difficulty === 'easy' ? 15 : difficulty === 'normal' ? 10 : 5
  const [timeLeft, setTimeLeft] = useState(timeLimitSeconds)

  useEffect(() => {
    setTimeLeft(timeLimitSeconds)
  }, [currentIndex, timeLimitSeconds])

  useEffect(() => {
    if (timeLeft <= 0) {
      onGameOver()
      return
    }
    const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(timerId)
  }, [timeLeft, onGameOver])

  useEffect(() => {
    if (difficulty === 'hard') {
      setLeftButtonIsLeft(Math.random() < 0.5)
    } else {
      setLeftButtonIsLeft(true)
    }
  }, [currentIndex, difficulty])

  const handleAnswer = (choice: 'left' | 'right') => {
    const current = questions[currentIndex]
    let actualChoice = choice
    if (difficulty === 'hard' && !leftButtonIsLeft) {
      actualChoice = choice === 'left' ? 'right' : 'left'
    }
    if (actualChoice === current.correct) {
      const next = currentIndex + 1
      if (next >= questions.length) {
        onGameClear()
      } else {
        setCurrentIndex(next)
      }
    } else {
      onGameOver()
    }
  }

  if (!questions || questions.length === 0) {
    return (
      <div className={common.screen}>
        <div className={common.blackBox}>{t.loading}</div>
      </div>
    )
  }

  let buttons = null
  if (difficulty === 'easy') {
    buttons = (
      <>
        <button onClick={() => handleAnswer('left')} className={common.arrowButton}>
          ←
        </button>
        <button onClick={() => handleAnswer('right')} className={common.arrowButton}>
          →
        </button>
      </>
    )
  } else if (difficulty === 'normal') {
    buttons = (
      <>
        <button onClick={() => handleAnswer('left')} className={common.textButton}>
          {buttonLabels[language].left}
        </button>
        <button onClick={() => handleAnswer('right')} className={common.textButton}>
          {buttonLabels[language].right}
        </button>
      </>
    )
  } else {
    buttons = leftButtonIsLeft ? (
      <>
        <button onClick={() => handleAnswer('left')} className={common.textButton}>
          {buttonLabels[language].left}
        </button>
        <button onClick={() => handleAnswer('right')} className={common.textButton}>
          {buttonLabels[language].right}
        </button>
      </>
    ) : (
      <>
        <button onClick={() => handleAnswer('right')} className={common.textButton}>
          {buttonLabels[language].right}
        </button>
        <button onClick={() => handleAnswer('left')} className={common.textButton}>
          {buttonLabels[language].left}
        </button>
      </>
    )
  }

  return (
    <div className={common.screen}>
      <div className={common.blackBox} style={{ minHeight: '58%' }}>
        <div className={common.blackBoxInner}>
          <p>{t.notion}</p>
          <div className={common.progress}>
            {currentIndex + 1} {t.slash} {questions.length}
          </div>
          <div className={common.timer}>
            LIMIT
            <br />
            <span className={common.timerNum}>{timeLeft}</span>
          </div>
          <p className={common.question}>{questions[currentIndex].prompt}</p>
          <div className={common.buttonAns}>{buttons}</div>
        </div>
      </div>
    </div>
  )
}
