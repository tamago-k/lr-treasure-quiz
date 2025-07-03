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

export default function FortuneScreen({ onRestart, onTitle }: Props) {
  const [fortune, setFortune] = useState('')
  const { language } = useLang()
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

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
                width={40}        // サイズは適宜調整してください
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
          <p>{language === 'ja' ? 'あなたの運勢は…' : 'Your fortune is...'}</p>
          <p style={{ fontSize: '1.6rem', margin: '1rem 0' }}>{fortune}</p>
          <button className={common.blackButton} onClick={onRestart}>
            {language === 'ja' ? 'もう一度遊ぶ' : 'Play Again'}
          </button>
          <button className={common.blackButton} onClick={onTitle}>
            {language === 'ja' ? 'タイトルに戻る' : 'Back to Title'}
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
