# lr-treasure-quiz 開発環境セットアップ

Node.jsはバージョン20 (LTS) を使用してください。バージョン管理には [nvm](https://github.com/nvm-sh/nvm) の利用を推奨します。

## Node.js バージョン切り替え例（nvm使用）

```bash
nvm install 20
nvm use 20
nvm alias default 20
node -v
npm -v

cd frontend
npm install

# Tailwind CSS
https://qiita.com/zven027/items/8dd658803c5183c9836f

mkdir -p ./bin
curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-macos-arm64
mv tailwindcss-macos-arm64 ./bin/tailwindcss
chmod +x ./bin/tailwindcss
./bin/tailwindcss -i ./src/input.css -o ./dist/output.css --watch

npm install -D @tailwindcss/postcss


# トラブル時の再インストール
rm -rf node_modules package-lock.json
npm install

#　不要かも
cd backend
pip install fastapi uvicorn

docker compose up --build -d

## 素材サイト
https://dot-illust.net/