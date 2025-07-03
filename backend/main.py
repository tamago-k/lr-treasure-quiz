import os 
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

origins = os.environ.get("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

QUESTIONS_JA = {
    "easy": [
        { "prompt": "右に行こう！", "correct": "right" },
        { "prompt": "左へ進もう！", "correct": "left" },
        { "prompt": "右のほうが安全そうだ！", "correct": "right" },
        { "prompt": "左に何かがある気がする！", "correct": "left" },
        { "prompt": "右のほうが明るい！", "correct": "right" },
        { "prompt": "左から風が吹いてきた！", "correct": "left" },
        { "prompt": "右へ向かって進め！", "correct": "right" },
        { "prompt": "左に宝のにおいがする！", "correct": "left" },
        { "prompt": "右の空に虹が見える！", "correct": "right" },
        { "prompt": "左に島が見えた！", "correct": "left" },
        { "prompt": "右に海賊がいないよ！", "correct": "right" },
        { "prompt": "左にカモメが飛んでる！", "correct": "left" },
        { "prompt": "右の方から音がする！", "correct": "right" },
        { "prompt": "左が何だか気になる…", "correct": "left" },
        { "prompt": "右のほうへ行こう！", "correct": "right" },
        { "prompt": "左の方が安心だよ！", "correct": "left" },
        { "prompt": "右にキラキラした光！", "correct": "right" },
        { "prompt": "左の方角を見てごらん！", "correct": "left" },
        { "prompt": "右に向かって船を出そう！", "correct": "right" },
        { "prompt": "左に向かって風を読もう！", "correct": "left" },
    ],
    "normal": [
        { "prompt": "右じゃない方へ進もう！", "correct": "left" },
        { "prompt": "左じゃない方に宝があるぞ！", "correct": "right" },
        { "prompt": "右の反対側を選ぼう！", "correct": "left" },
        { "prompt": "左の逆にあるものを見に行こう！", "correct": "right" },
        { "prompt": "右に見えるけど、あえて左に行け！", "correct": "left" },
        { "prompt": "左と思わせて、正解は右だ！", "correct": "right" },
        { "prompt": "右の方角には何もない！", "correct": "left" },
        { "prompt": "左のほうが危ない！右に進もう！", "correct": "right" },
        { "prompt": "右が正しいとは限らない…左へ！", "correct": "left" },
        { "prompt": "左は罠かも？右を選ぼう！", "correct": "right" },
        { "prompt": "右には誰もいない！じゃあ…？", "correct": "left" },
        { "prompt": "左が正しいと信じて！", "correct": "left" },
        { "prompt": "右の方に勇者の足跡が！", "correct": "right" },
        { "prompt": "左の方角に光が差している！", "correct": "left" },
        { "prompt": "右と左、今回は右が正解だ！", "correct": "right" },
        { "prompt": "左と右、信じるなら左を！", "correct": "left" },
        { "prompt": "右の方向には仲間がいるぞ！", "correct": "right" },
        { "prompt": "左の向こうに島が見える！", "correct": "left" },
        { "prompt": "右の先に宝箱がある気がする！", "correct": "right" },
        { "prompt": "左じゃない方が安全だ！", "correct": "right" },
    ],
    "hard": [
        { "prompt": "右じゃない方へ進め！", "correct": "left" },
        { "prompt": "左と見せかけて右！", "correct": "right" },
        { "prompt": "右の反対側へ進もう！", "correct": "left" },
        { "prompt": "左が罠だ、右だ！", "correct": "right" },
        { "prompt": "右と思わせて左だ！", "correct": "left" },
        { "prompt": "左に見えるが進むのは右！", "correct": "right" },
        { "prompt": "右じゃない方向に注意！", "correct": "left" },
        { "prompt": "左を信じるな！右へ！", "correct": "right" },
        { "prompt": "右に向かうと危険！", "correct": "left" },
        { "prompt": "左じゃない道を選ぼう！", "correct": "right" },
        { "prompt": "右ではない、左だ！", "correct": "left" },
        { "prompt": "左ではない、右だ！", "correct": "right" },
        { "prompt": "右を選ぶと戻ってしまう！", "correct": "left" },
        { "prompt": "左はフェイクだ！右に行け！", "correct": "right" },
        { "prompt": "右は行き止まり！", "correct": "left" },
        { "prompt": "左が正解とは限らないぞ！", "correct": "right" },
        { "prompt": "右のつもりが左だった！", "correct": "left" },
        { "prompt": "左っぽいが右だ！", "correct": "right" },
        { "prompt": "右を疑え、左が安全！", "correct": "left" },
        { "prompt": "左が怖いなら右へ！", "correct": "right" },
    ],
}

QUESTIONS_EN = {
    "easy": [
        { "prompt": "Let's go right!", "correct": "right" },
        { "prompt": "Head to the left!", "correct": "left" },
        { "prompt": "The right side looks safer!", "correct": "right" },
        { "prompt": "I feel like something's on the left!", "correct": "left" },
        { "prompt": "It’s brighter to the right!", "correct": "right" },
        { "prompt": "The wind is blowing from the left!", "correct": "left" },
        { "prompt": "Move forward to the right!", "correct": "right" },
        { "prompt": "Smells like treasure on the left!", "correct": "left" },
        { "prompt": "There’s a rainbow in the sky to the right!", "correct": "right" },
        { "prompt": "I see an island on the left!", "correct": "left" },
        { "prompt": "No pirates on the right side!", "correct": "right" },
        { "prompt": "A seagull is flying to the left!", "correct": "left" },
        { "prompt": "I hear a sound from the right!", "correct": "right" },
        { "prompt": "Something about the left seems curious...", "correct": "left" },
        { "prompt": "Let’s go toward the right!", "correct": "right" },
        { "prompt": "The left seems safer!", "correct": "left" },
        { "prompt": "There’s a sparkle of light on the right!", "correct": "right" },
        { "prompt": "Take a look to the left!", "correct": "left" },
        { "prompt": "Set sail toward the right!", "correct": "right" },
        { "prompt": "Read the wind and head left!", "correct": "left" },
    ],
    "normal": [
        { "prompt": "Go the opposite of right!", "correct": "left" },
        { "prompt": "The treasure is on the side that isn’t left!", "correct": "right" },
        { "prompt": "Choose the direction opposite of right!", "correct": "left" },
        { "prompt": "Let’s head to the opposite of left!", "correct": "right" },
        { "prompt": "You see right, but go left!", "correct": "left" },
        { "prompt": "It looks like left, but the answer is right!", "correct": "right" },
        { "prompt": "There’s nothing in the right direction!", "correct": "left" },
        { "prompt": "The left side is dangerous! Go right!", "correct": "right" },
        { "prompt": "Right isn’t always right… go left!", "correct": "left" },
        { "prompt": "Left might be a trap! Pick right!", "correct": "right" },
        { "prompt": "No one is on the right… so?", "correct": "left" },
        { "prompt": "Believe in the left!", "correct": "left" },
        { "prompt": "There are footprints to the right!", "correct": "right" },
        { "prompt": "Light shines from the left!", "correct": "left" },
        { "prompt": "Right or left? Right is the answer this time!", "correct": "right" },
        { "prompt": "Between left and right, trust left!", "correct": "left" },
        { "prompt": "Your allies are in the right direction!", "correct": "right" },
        { "prompt": "An island appears beyond the left!", "correct": "left" },
        { "prompt": "A treasure chest might be ahead to the right!", "correct": "right" },
        { "prompt": "The side that’s not left is safer!", "correct": "right" },
    ],
    "hard": [
        { "prompt": "Go in the direction that’s not right!", "correct": "left" },
        { "prompt": "Looks like left, but go right!", "correct": "right" },
        { "prompt": "Let’s head to the side opposite of right!", "correct": "left" },
        { "prompt": "Left is a trap—go right!", "correct": "right" },
        { "prompt": "You think it’s right, but it’s actually left!", "correct": "left" },
        { "prompt": "You see left, but move right!", "correct": "right" },
        { "prompt": "Watch out for the not-right direction!", "correct": "left" },
        { "prompt": "Don’t trust left—go right!", "correct": "right" },
        { "prompt": "It’s dangerous to go right!", "correct": "left" },
        { "prompt": "Pick the direction that isn’t left!", "correct": "right" },
        { "prompt": "It’s not right, so go left!", "correct": "left" },
        { "prompt": "It’s not left, so go right!", "correct": "right" },
        { "prompt": "If you choose right, you’ll go backwards!", "correct": "left" },
        { "prompt": "Left is a fake! Go right!", "correct": "right" },
        { "prompt": "Right is a dead end!", "correct": "left" },
        { "prompt": "Left may not be the right answer!", "correct": "right" },
        { "prompt": "You thought it was right, but it was left!", "correct": "left" },
        { "prompt": "Feels like left, but it’s right!", "correct": "right" },
        { "prompt": "Doubt right—left is safe!", "correct": "left" },
        { "prompt": "Scared of the left? Then go right!", "correct": "right" },
    ]
}


@app.get("/questions")
def get_questions(
    difficulty: str = Query(..., regex="^(easy|normal|hard)$"),
    language: str = Query("ja", regex="^(ja|en)$"),
):
    if language == "en":
        questions = QUESTIONS_EN.get(difficulty, [])
    else:
        questions = QUESTIONS_JA.get(difficulty, [])
    
    # 問題数制限
    limit = {"easy": 10, "normal": 15, "hard": 20}.get(difficulty, 10)

    questions_shuffled = questions[:]
    random.shuffle(questions_shuffled)

    return questions_shuffled[:limit]


# おみくじ（ハッピーな内容50個くらい）

FORTUNES_JA = [
    "今日、臨時収入があるかも",
    "あなたに嬉しい知らせが届く",
    "大切な人と素敵な時間を過ごせる",
    "願いがひとつ叶う日",
    "新しい出会いがあるかも",
    "運気上昇中！何事も順調に進む",
    "健康に恵まれる一日",
    "楽しいことがたくさん訪れる",
    "笑顔が絶えない日になる",
    "幸運があなたを見つける",
    "夢に近づくチャンスがある",
    "心が穏やかになる日",
    "思わぬ幸運が舞い込む",
    "願いが叶う予感がする",
    "人間関係が良好になる",
    "嬉しいサプライズが待っている",
    "金運アップの兆しあり",
    "努力が報われる日",
    "感謝の気持ちを伝えると吉",
    "笑顔があなたを輝かせる",
    "新しい趣味が見つかるかも",
    "チャレンジ精神が芽生える日",
    "心が軽くなる出来事がある",
    "友達との絆が深まる",
    "愛情運が良好になる",
    "夢を諦めないで進もう",
    "幸せな出来事が続く",
    "ポジティブな気持ちが大切",
    "良いニュースが舞い込む",
    "元気いっぱいの一日",
    "チャンスを掴むタイミング",
    "リラックスできる時間が持てる",
    "幸せを感じる瞬間が増える",
    "願い事が叶いやすい日",
    "心の成長を感じる",
    "笑顔で人と接すると吉",
    "新しい学びがある日",
    "素敵な人との出会いがある",
    "心にゆとりができる",
    "運命の出会いが近いかも",
    "やる気がみなぎる日",
    "嬉しい知らせが届く",
    "感謝の気持ちを忘れずに",
    "笑顔が幸運を呼ぶ",
    "良い運気が流れている",
    "新たな挑戦が成功する",
    "楽しいイベントが待っている",
    "幸運があなたに微笑む",
    "心からの喜びが訪れる",
]

FORTUNES_EN = [
    "You might get unexpected income today",
    "Good news is coming your way",
    "Spend a wonderful time with loved ones",
    "A wish you made will come true",
    "You might meet someone new",
    "Your luck is rising! Everything goes smoothly",
    "Blessed with good health today",
    "Lots of fun things will happen",
    "A day full of smiles",
    "Good fortune will find you",
    "A chance to get closer to your dreams",
    "Your heart will be at peace",
    "Unexpected luck will come your way",
    "You feel your wish will come true",
    "Good relationships will improve",
    "A nice surprise awaits you",
    "Signs of better financial luck",
    "Your efforts will be rewarded",
    "Express gratitude and good things will happen",
    "Your smile will make you shine",
    "You may find a new hobby",
    "Your challenge spirit will awaken",
    "You will feel lighthearted",
    "Bonds with friends will deepen",
    "Your love luck is good",
    "Don't give up on your dreams",
    "Happiness keeps coming",
    "Positive thinking is important",
    "Good news will come",
    "You will be full of energy",
    "The timing to grab your chance",
    "You can relax today",
    "You will have more happy moments",
    "Your wishes are likely to come true",
    "You will feel growth in your heart",
    "Smile when meeting people",
    "You will learn something new",
    "You will meet nice people",
    "You will feel calm inside",
    "A destined meeting may be near",
    "You will feel motivated",
    "Good news will arrive",
    "Never forget gratitude",
    "Your smile brings good luck",
    "Good luck is flowing",
    "New challenges will succeed",
    "Fun events are waiting",
    "Fortune smiles upon you",
    "Joy from your heart is coming",
]

@app.get("/fortune")
def get_fortune(language: str = Query("ja", regex="^(ja|en)$")):
    if language == "en":
        return {"fortune": random.choice(FORTUNES_EN)}
    else:
        return {"fortune": random.choice(FORTUNES_JA)}
