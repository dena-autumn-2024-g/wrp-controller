"use client";
import { useState } from "react";
import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

import { GameService } from "@/src/gen/protobuf/game_connect";
import { RoomService } from "@/src/gen/protobuf/room_connect";

import styles from "./page.module.css";
import Loading from "@/app/components/Loading";
import Header from "@/app/components/Header";
import Controller from "./components/Controller";
import useGame from "@/app/hooks/useGame";
import type Bubble from "@/app/types/Bubble";
import { Direction } from "@/src/gen/protobuf/game_pb";

// 接続先エンドポイントを設定
const transport = createConnectTransport({
  baseUrl: "/",
});

// クライアントの作成
const gameClient = createPromiseClient(GameService, transport);
const roomClient = createPromiseClient(RoomService, transport);

export default function Home() {
  const {
    isLoading,
    error,
    userID,
    onArrowButtonTouchStart,
    onMainButtonTouchStart,
    onMainButtonTouchEnd,
  } = useGame(gameClient, roomClient);

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

  const handleMainButtonTouchStart = () => {
    onMainButtonTouchStart();
    pushBubbles();
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className={styles.page}>{error}</div>;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />

        <Controller
          userID={userID}
          bubbles={bubbles}
          onMainButtonTouchStart={handleMainButtonTouchStart}
          onMainButtonTouchEnd={onMainButtonTouchEnd}
          onLeftArrowButtonTouchStart={() =>
            onArrowButtonTouchStart(Direction.LEFT)
          }
          onRightArrowButtonTouchStart={() =>
            onArrowButtonTouchStart(Direction.RIGHT)
          }
        />
      </main>
    </div>
  );
}
