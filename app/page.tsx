"use client";
import { useState } from "react";
import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

import { GameService } from "@/src/gen/protobuf/game_connect";

import styles from "./page.module.css";
import Loading from "@/app/components/Loading";
import Header from "@/app/components/Header";
import Controller from "./components/Controller";
import useGame from "@/app/hooks/useGame";
import Direction from "@/app/types/Direction";
import type Bubble from "@/app/types/Bubble";

// 接続先エンドポイントを設定
const transport = createConnectTransport({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
});

// クライアントの作成
const client = createPromiseClient(GameService, transport);

export default function Home() {
  const { isLoading, error, playerIndex } = useGame();

  const [bubbles, setBubbles] = useState<Bubble[]>([]); // 泡の状態を管理

  const createNewBubble = (index: number) => {
    const minX = 10;
    const maxX = 90;
    const minSize = 10;
    const maxSize = 70;
    const minDelay = 0;
    const maxDelay = 0.5;

    const newBubble: Bubble = {
      id: `${Date.now()}-${index}`, // 現在のタイムスタンプをIDとして使用
      x: Math.random() * (maxX - minX) + minX, // 泡のX座標をランダムに設定
      size: Math.random() * (maxSize - minSize) + minSize, // 泡の大きさをランダムに設定
      delay: Math.random() * (maxDelay - minDelay) + minDelay, // 泡のアニメーション遅延をランダムに設定
    }; // 現在のタイムスタンプをIDとして使用
    setBubbles((prevBubbles) => [...prevBubbles, newBubble]); // 新しい泡を追加

    // 2秒後に泡を消す
    setTimeout(() => {
      setBubbles((prevBubbles) =>
        prevBubbles.filter((b) => b.id !== newBubble.id),
      );
    }, 2000);
  };

  const pushBubbles = () => {
    // 1~5個の泡を追加
    const count = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < count; i++) {
      createNewBubble(i);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className={styles.page}>{error}</div>;
  }

  const handleMove = async ({
    userID,
    direction,
    roomID,
  }: {
    userID: number;
    direction: number;
    roomID: string;
  }) => {
    try {
      const request = {
        userId: userID,
        direction: direction,
        roomId: roomID,
      };

      // Moveメソッドを呼び出す
      const response = await client.move(request);

      // レスポンスを保存
      console.log("Move Response:", response); // コンソールにレスポンスを表示
    } catch (error) {
      console.error("Error calling Move:", error); // エラーハンドリング
    }
  };

  const onMainButtonTouchStart = () => {
    pushBubbles();
    console.log("onMainButtonTouchStart");
  };
  const onMainButtonTouchEnd = () => {
    console.log("onMainButtonTouchEnd");
  };
  const onArrowButtonTouchStart = (direction: Direction) => {
    handleMove({
      userID: playerIndex,
      direction: 0,
      roomID: "1120",
    });
    console.log("onArrowButtonTouchStart", direction);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />

        <Controller
          playerIndex={playerIndex}
          bubbles={bubbles}
          onMainButtonTouchStart={onMainButtonTouchStart}
          onMainButtonTouchEnd={onMainButtonTouchEnd}
          onLeftArrowButtonTouchStart={() =>
            onArrowButtonTouchStart(Direction.Left)
          }
          onRightArrowButtonTouchStart={() =>
            onArrowButtonTouchStart(Direction.Right)
          }
        />
      </main>
    </div>
  );
}
