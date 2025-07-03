'use client'

import Image from 'next/image'
import common from '../styles/common.module.css'

type Props = {
  difficulty: 'easy' | 'normal' | 'hard'
  onRetry: () => void
  onBackToStart: () => void
  language: 'ja' | 'en'
}

const translations = {
  ja: {
    difficultyLabel: (
      <>
        <ruby>難易度<rt>なんいど</rt></ruby>
      </>
    ),
    text: (
      <>
        <ruby>船<rt>ふね</rt></ruby>は<ruby>沈没<rt>ちんぼつ</rt></ruby>した。。。
      </>
    ),
    retry: (
      <>
        もう<ruby>一度<rt>いちど</rt></ruby><ruby>挑戦<rt>ちょうせん</rt></ruby>
      </>
    ),
    backToStart: (
      <>
        タイトルへ<ruby>戻<rt>もど</rt></ruby>る
      </>
    ),
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
        <h2 style={{ fontSize: '2rem' }}>GAME OVER</h2>
        <p style={{ marginTop: '1rem' }}>{t.text}</p>
        <p style={{ marginTop: '1rem' }}>{t.difficultyLabel}: {difficulty}</p>
        <div className={common.buttonGroup}>
          <button className={common.blackButton} onClick={onRetry}>
            {t.retry}
          </button>
          <button className={common.blackButton} onClick={onBackToStart}>
            {t.backToStart}
          </button>
        </div>
      </div>

      <Image
        src="/images/yusya_gameover.svg"
        alt="勇者"
        width={120}
        height={120}
        className={common.yusyaIconGameover}
        priority={true}
      />
    </div>
  )
}
