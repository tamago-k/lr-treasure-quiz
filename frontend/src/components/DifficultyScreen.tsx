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
        <ruby>時間内<rt>じかんない</rt></ruby>に<ruby>右<rt>みぎ</rt></ruby>か<ruby>左<rt>ひだり</rt></ruby>か<ruby>選<rt>えら</rt></ruby>んでお<ruby>宝<rt>たから</rt></ruby>を<ruby>探<rt>さが</rt></ruby>そう！<br />
        <ruby>選<rt>えら</rt></ruby>んだらすぐ<ruby>始<rt>はじ</rt></ruby>まるよ！
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
