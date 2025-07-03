'use client'

import Image from 'next/image'
import common from '../styles/common.module.css'

type Props = {
  onTapFortune: () => void
  language: 'ja' | 'en'
}

const translations = {
  ja: {
    title: 'おめでとう！',
    message: (
      <>
        <ruby>宝箱<rt>たからばこ</rt></ruby>をタップしてね
      </>
    ),
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
              <Image
                key={col}
                src="/images/green.svg"
                alt="green"
                width={50} 
                height={50}
                className={common.greenTile}
                priority={false}
              />
            ))}
          </div>
        ))}
      </div>

      <div className={common.blackBox}>
        <h1 className={common.title}>{t.title}</h1>
        <p>{t.message}</p>
      </div>

      <Image
        src="/images/yusya.svg"
        alt="勇者"
        width={70}
        height={98}
        className={common.yusyaIcon}
        priority={true}
      />

      <div onClick={onTapFortune} style={{ cursor: 'pointer' }}>
        <Image
          src="/images/treasure.svg"
          alt="宝箱"
          width={100}
          height={87}
          className={common.treasureIcon}
          priority={true}
        />
      </div>
    </div>
  )
}
