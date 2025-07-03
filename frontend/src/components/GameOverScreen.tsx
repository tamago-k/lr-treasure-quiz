'use client'

import common from '../styles/common.module.css'

type Props = {
  difficulty: 'easy' | 'normal' | 'hard'
  onRetry: () => void
  onBackToStart: () => void
  language: 'ja' | 'en'  // 追加
}

const translations = {
  ja: {
    difficultyLabel: '難易度',
    text: '船は沈没した。。。',
    retry: 'もう一度挑戦',
    backToStart: 'タイトルへ戻る',
  },
  en: {
    difficultyLabel: 'Difficulty',
    text: 'The ship sank...',
    retry: 'Try Again',
    backToStart: 'Back to Title',
  },
}

export default function GameOverScreen({ difficulty, onRetry, onBackToStart, language }: Props) {
  const t = translations[language]

  return (
    <div className={common.screen}>
      <div className={common.blackBox} style={{ minHeight: '58%' }}>
        <h2>GAME OVER</h2>
        <p>{t.text}</p>
        <p>{t.difficultyLabel}: {difficulty}</p>
        <div className={common.buttonGroup}>
          <button className={common.blackButton} onClick={onRetry}>
            {t.retry}
          </button>
          <button className={common.blackButton} onClick={onBackToStart}>
            {t.backToStart}
          </button>
        </div>
      </div>
      <img
        src="images/yusya_gameover.svg"
        alt="勇者"
        className={common.yusyaIconGameover}
      />
    </div>
  )
}
