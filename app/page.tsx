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

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />

        {/* <Controller playerIndex={playerIndex} /> */}
        <button onClick={handleClick}>push</button>
        <ol>
          {messages.map((msg, index) => (
            <li key={index}>
              {`${msg.fromMe ? "ME:" : "ELIZA:"} ${msg.message}`}
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
