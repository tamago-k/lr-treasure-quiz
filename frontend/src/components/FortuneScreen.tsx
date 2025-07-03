'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import common from '../styles/common.module.css'
import { useLang } from '../lib/langContext'

type Props = {
  difficulty: 'easy' | 'normal' | 'hard'
  language?: 'ja' | 'en'
  onRestart: () => void
  onTitle: () => void
}

const translations = {
  ja: {
    title: (
      <>
        あなたの<ruby>運勢<rt>うんせい</rt></ruby>は…
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
    title: 'Your fortune is...',
    text: 'The ship sank...',
    retry: 'Try Again',
    backToStart: 'Back to Title',
  },
}

export default function FortuneScreen({ onRestart, onTitle }: Props) {
  const [fortune, setFortune] = useState('')
  const { language } = useLang()
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const t = translations[language]

  useEffect(() => {
    fetch(`${API_BASE_URL}/fortune?language=${language}`)
      .then((res) => res.json())
      .then((data) => setFortune(data.fortune))
      .catch(() => setFortune(language === 'ja' ? '通信エラー' : 'Communication Error'))
  }, [API_BASE_URL, language])

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
                width={40} 
                height={40}
                className={common.greenTile}
              />
            ))}
          </div>
        ))}
      </div>

      <div className={common.blackBox}>
        <div className={common.blackBoxInner}>
          <Image
            src="/images/omikuji.svg"
            alt="おみくじ"
            width={100}
            height={114}
            className={common.omikujiIcon}
          />
          <p>{t.title}</p>
          <p 
            style={{ fontSize: '1.6rem', margin: '1rem 0' }} 
            dangerouslySetInnerHTML={{ __html: fortune }}
          />
          <button className={common.blackButton} onClick={onRestart}>
            {t.retry}
          </button>
          <button className={common.blackButton} onClick={onTitle}>
            {t.backToStart}
          </button>
        </div>
      </div>

      <Image
        src="/images/treasure_open.svg"
        alt="宝箱"
        width={100}
        height={94}
        className={common.treasureIconOpen}
      />
    </div>
  )
}
