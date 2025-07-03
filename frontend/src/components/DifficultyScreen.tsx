'use client'

import Image from 'next/image'
import common from '../styles/common.module.css'

type Props = {
  onSelect: (difficulty: 'easy' | 'normal' | 'hard') => void
  language: 'ja' | 'en'
}

const translations = {
  ja: {
    title: (
      <>
        <ruby>難易度<rt>なんいど</rt></ruby>
      </>
    ),
    easy: 'かんたん',
    normal: 'ふつう',
    hard: 'むずかしい',
    description: (
      <>
        時間内に右か左か選んでお宝を探そう！<br />
        選んだらすぐ始まるよ！
      </>
    ),
  },
  en: {
    title: <>Difficulty</>,
    easy: 'Easy',
    normal: 'Normal',
    hard: 'Hard',
    description: (
      <>
        Choose right or left within the time limit to find treasure!<br />
        The game starts immediately after selection!
      </>
    ),
  },
}

export default function DifficultyScreen({ onSelect, language }: Props) {
  const t = translations[language]

  return (
    <div className={common.screen}>
      <div className={common.blackBox}>
        <h2 className={common.title}>{t.title}</h2>

        <div className={common.buttonGroup}>
          <button
            className={common.blackButton}
            onClick={() => onSelect('easy')}
          >
            {t.easy}
          </button>
          <button
            className={common.blackButton}
            onClick={() => onSelect('normal')}
          >
            {t.normal}
          </button>
          <button
            className={common.blackButton}
            onClick={() => onSelect('hard')}
          >
            {t.hard}
          </button>
        </div>

        <p>{t.description}</p>
      </div>
      <Image
        src="/images/dolphin.svg"
        alt="イルカ"
        width={40}
        height={32}
        className={common.dolphinIcon}
        priority={true}
      />
    </div>
  )
}
