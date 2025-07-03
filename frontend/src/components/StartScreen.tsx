'use client'

import common from '../styles/common.module.css'

type Props = {
  language: 'ja' | 'en'
  onStart: () => void
}
const translations = {
  ja: {
    title: (
      <>
        <ruby>右<rt>みぎ</rt></ruby>・<ruby>左<rt>ひだり</rt></ruby>を<ruby>選<rt>えら</rt></ruby>んで
        <br />
        <ruby>宝探<rt>たからさが</rt></ruby>しゲーム
      </>
    ),
    subtitle: <><ruby>最後<rt>さいご</rt></ruby>にはおみくじがあるよ</>,
  },
  en: {
    title: <>Choose Right or Left<br />Treasure Hunt Game</>,
    subtitle: <>At the end, there is a fortune.</>,
  },
}

export default function StartScreen({ language, onStart }: Props) {
  return (
    <div className={common.screen}>
      <div className={common.blackBox}>
      <h1 className={common.title}>{translations[language].title}</h1>
      <p>{translations[language].subtitle}</p>

        <button className={common.blackButton} onClick={onStart}>
          ▶ {language === 'ja' ? 'スタート' : 'Start'}
        </button>
      </div>
      <img
        src="images/dolphin.svg"
        alt="イルカ"
        className={common.dolphinIcon}
      />
    </div>
  )
}