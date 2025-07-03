'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
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
    notion: (
      <>
        <ruby>進<rt>すす</rt></ruby>むべき<ruby>方向<rt>ほうこう</rt></ruby>を<ruby>選<rt>えら</rt></ruby>ぼう！
      </>
    ),
    loading: (
      <>
        <ruby>問題<rt>もんだい</rt></ruby>データを<ruby>読<rt>よ</rt></ruby>み<ruby>込<rt>こ</rt></ruby>み<ruby>中<rt>ちゅう</rt></ruby>です...
      </>
    ),
    slash: '/',
    coution: (
      <>
        <ruby>文字<rt>もじ</rt></ruby>に<ruby>騙<rt>だば</rt></ruby>されず<ruby>正<rt>ただ</rt></ruby>しい<ruby>方向<rt>ほうこう</rt></ruby>を<ruby>押<rt>お</rt></ruby>してね
      </>
    ),
  },
  en: {
    notion: 'Choose the direction to move forward!',
    loading: 'Loading questions...',
    slash: '/',
    coution: "Don't be fooled by the text — press the correct direction!",
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
          <p
            className={common.question}
            dangerouslySetInnerHTML={{ __html: questions[currentIndex].prompt }}
          />
          <div className={common.buttonAns}>{buttons}</div>
          {difficulty === 'hard' && (
            <p style={{ marginTop: '20px' }}>*{t.coution}</p>
          )}
        </div>
      </div>

      <Image
        src="/images/yusya.svg"
        alt="勇者"
        width={70}
        height={98}
        className={common.yusyaIcon}
        priority={true}
      />
    </div>
  )
}
