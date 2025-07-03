"use client";
import React, { useEffect, useState } from "react";
import "./globals.css";
import { LangProvider } from '../lib/langContext'

type Item = { id: number; type: "cloud" | "mountain"; src: string; top: number; left: number };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [language, setLanguage] = useState<"ja" | "en">("ja");

  // 初回読み込みでlocalStorageから言語取得
  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved === "ja" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  // 言語が変わるたびlocalStorageに保存
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // 初期表示で適当にいくつか配置（右から左に100px間隔で）
  useEffect(() => {
    const initialItems: Item[] = [];
    let idCounter = 0;
    let leftPos = 100;

    // まず山を1つ（高さ固定）
    idCounter++;
    initialItems.push({
      id: idCounter,
      type: "mountain",
      src: "/images/mountain.svg",
      top: 20,
      left: leftPos,
    });
    leftPos += 100;

    // 雲を3つランダム高さで配置
    for (let i = 0; i < 3; i++) {
      idCounter++;
      initialItems.push({
        id: idCounter,
        type: "cloud",
        src: "/images/cloud.svg",
        top: Math.random() * 60,
        left: leftPos,
      });
      leftPos += 100;
    }

    setItems(initialItems);
  }, []);

  useEffect(() => {
    let idCounter = items.length;

    const interval = setInterval(() => {
      setItems((oldItems) => {
        const cloudCount = oldItems.filter((item) => item.type === "cloud").length;
        const mountainCount = oldItems.filter((item) => item.type === "mountain").length;

        const isMountain = Math.random() < 0.3;

        if (isMountain) {
          if (mountainCount >= 1) return oldItems;
        } else {
          if (cloudCount >= 3) return oldItems;
        }

        // 新しいアイテムを配置するときに100px間隔をチェック
        // 古いアイテムでleftが最も大きいものを取得
        const maxLeft = oldItems.reduce((max, item) => (item.left > max ? item.left : max), 0);

        if (maxLeft > 0 && maxLeft < 100) {
          // まだ間隔が狭いなら追加しない
          return oldItems;
        }

        idCounter++;
        const src = isMountain ? "/images/mountain.svg" : "/images/cloud.svg";
        const top = isMountain ? 20 : Math.random() * 60;

        return [...oldItems, { id: idCounter, type: isMountain ? "mountain" : "cloud", src, top, left: 100 }];
      });
    }, 5000);

    const cleanInterval = setInterval(() => {
      setItems((old) => old.filter((item) => item.left > -20));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(cleanInterval);
    };
  }, [items.length]);

  // 波のリズムに合わせたカクカク動き（左へ動く）
  useEffect(() => {
    let moveTimer: NodeJS.Timeout | null = null;
    let stopTimer: NodeJS.Timeout | null = null;

    const moveDistance = 0.1;
    const moveInterval = 20;
    const stopDuration = 1400;

    function startMoving() {
      moveTimer = setInterval(() => {
        setItems((old) =>
          old.map((item) => ({
            ...item,
            left: item.left - moveDistance,
          }))
        );
      }, moveInterval);

      stopTimer = setTimeout(() => {
        if (moveTimer) clearInterval(moveTimer);
        startStopping();
      }, 600);
    }

    function startStopping() {
      stopTimer = setTimeout(() => {
        startMoving();
      }, stopDuration);
    }

    startMoving();

    return () => {
      if (moveTimer) clearInterval(moveTimer);
      if (stopTimer) clearTimeout(stopTimer);
    };
  }, []);

  // children に language propを追加して渡す（ページやコンポーネントで受け取れる）
  const childrenWithLanguage = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { language });
    }
    return child;
  });

  return (
    <html lang={language}>
      <body>
        <LangProvider language={language} setLanguage={setLanguage}>
          <div className="app-container">
            <div className="language-toggle">
              <button onClick={() => setLanguage(language === "ja" ? "en" : "ja")}>
                {language === "ja" ? "EN" : "JP"}
              </button>
            </div>

            <div className="background">
              <div className="sky">
                {items.map(({ id, src, top, left, type }) => (
                  <img
                    key={id}
                    src={src}
                    alt=""
                    className="moving-item"
                    style={{
                      top: type === "mountain" ? undefined : `${top}%`,
                      bottom: type === "mountain" ? -10 : undefined,
                      left: `${left}%`,
                      width: id % 2 === 0 ? 80 : 50,
                      position: "absolute",
                      pointerEvents: "none",
                      userSelect: "none",
                      transition: "left 0.05s linear",
                    }}
                  />
                ))}
              </div>

              <div className="sea-wrapper">
                <div className="sea1">
                  {[...Array(10)].map((_, i) => (
                    <img key={i} src="/images/sea1.svg" alt="sea1" className="sea1-tile" />
                  ))}
                </div>
                <div className="sea2">
                  {[...Array(15)].map((_, row) => (
                    <div key={row} className="sea2-row">
                      {[...Array(10)].map((_, col) => (
                        <img key={col} src="/images/sea2.svg" alt="sea2" className="sea2-tile" />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <main>{childrenWithLanguage}</main>
          </div>
        </LangProvider>
      </body>
    </html>
  );
}
