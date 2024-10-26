"use client"; // src/app/page.tsx
import { useState } from "react";
import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

// ElizaService のインポート
import { ElizaService } from "@buf/connectrpc_eliza.connectrpc_es/connectrpc/eliza/v1/eliza_connect";

// 接続先エンドポイントを設定
const transport = createConnectTransport({
  baseUrl: "https://demo.connectrpc.com",
});

// クライアントの作成
const client = createPromiseClient(ElizaService, transport);

import styles from "./page.module.css";
import Loading from "@/app/components/Loading";
import Header from "@/app/components/Header";
import Controller from "./components/Controller";
import useGame from "@/app/hooks/useGame";
import Direction from "@/app/types/Direction";
import type Bubble from "@/app/types/Bubble";

export default function Home() {
  const { isLoading, error, playerIndex } = useGame();
  const [inputValue, setInputValue] = useState("hogehoge");
  console.log(`inputValue: ${inputValue}`);
  const [messages, setMessages] = useState<
    {
      fromMe: boolean;
      message: string;
    }[]
  >([]);
  console.log(`messages: ${messages}`);

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

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    // Clear inputValue since the user has submitted.
    setInputValue("");
    // Store the inputValue in the chain of messages and
    // mark this message as coming from "me"
    setMessages((prev) => [
      ...prev,
      {
        fromMe: true,
        message: inputValue,
      },
    ]);
    const response = await client.say({
      sentence: inputValue,
    });
    setMessages((prev) => [
      ...prev,
      {
        fromMe: false,
        message: response.sentence,
      },
    ]);

    console.log(response);
  };

  const onMainButtonTouchStart = () => {
    pushBubbles();
    console.log("onMainButtonTouchStart");
  };
  const onMainButtonTouchEnd = () => {
    console.log("onMainButtonTouchEnd");
  };
  const onArrowButtonTouchStart = (direction: Direction) => {
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
        {/* <button onClick={handleClick}>push</button> */}
        {/* <ol>
          {messages.map((msg, index) => (
            <li key={index}>
              {`${msg.fromMe ? "ME:" : "ELIZA:"} ${msg.message}`}
            </li>
          ))}
        </ol> */}
      </main>
    </div>
  );
}
