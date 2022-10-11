# Docker で [Playwright](https://github.com/microsoft/playwright) を動かしてみた

## 実行環境

Ubuntu 22.04

## ディスプレイサーバー

ディスプレイサーバーは Wayland のままで OK だった。

確認するコマンド

```
echo $XDG_SESSION_TYPE
```

## コンテナ起動

```
docker compose up -d
docker compose exec app bash
```

```
npm install
```

```
npm test
```

## メモ

```
xhost +local:
xhost -local:
```

↑ は不要だった。

## 参考にしたページ

https://www.youtube.com/watch?v=cMsIT2otEjA

https://zenn.dev/ykesamaru/articles/add7d844f56516

https://zukucode.com/2019/07/docker-gui-show.html
