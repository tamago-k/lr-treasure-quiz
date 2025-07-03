'use client'

import common from '../styles/common.module.css'

type Props = {
  onTapFortune: () => void
  language: 'ja' | 'en'
}

const translations = {
  ja: {
    title: 'おめでとう！',
    message: '宝箱をタップしてね',
  },
  en: {
    title: 'Congratulations!',
    message: 'Tap the fortune',
  },
}

export default function GoalScreen({ onTapFortune, language }: Props) {
  const t = translations[language]

  return (
    <div className={common.screen}>
      <div className={common.greenLayer}>
        {[...Array(8)].map((_, row) => (
          <div key={row} className={common.greenRow}>
            {[...Array(10)].map((_, col) => (
              <img key={col} src="/images/green.svg" alt="green" className={common.greenTile} />
            ))}
          </div>
        ))}
      </div>
      <div
        className={common.blackBox}
      >
        <h1 className={common.title}>{t.title}</h1>
        <p>{t.message}</p>
      </div>
      <img
        src="images/yusya.svg"
        alt="勇者"
        className={common.yusyaIcon}
      />
      <img
        src="/images/treasure.svg"
        alt="宝箱"
        onClick={onTapFortune}
        className={common.treasureIcon}
        style={{ cursor: 'pointer' }}
      />
    </div>
  )
}
