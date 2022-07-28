# RoulettePlus

ルーレットアプリを複数保存&永続化できるようにしたアプリ

## 環境構築

- 環境変数の設定をする。

  - NEXT_PUBLIC_GRAPHQL_END_POINT に graphql のエンドポイント
  - NEXT_PUBLIC_GRAPHQL_API_KEY に graphql の API キー

- 起動

```
yarn dev
```

## 使用技術

- Next.js
- urql
- AppSync(GraphQL + DynamoDB)
- useSpring(ルーレットのアニメーション)
- MUI(デザイン)
