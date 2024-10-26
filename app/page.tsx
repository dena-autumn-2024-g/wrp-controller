"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Loading from "@/app/components/Loading";
import Header from "@/app/components/Header";
import Controller from "./components/Controller";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roomID, setRoomID] = useState<string | null>(null);
  const [serverName, setServerName] = useState<string | null>(null);
  const [playerIndex, setPlayerIndex] = useState<number | null>(null);
  console.log("error", error);

  useEffect(() => {
    const checkGameAlive = async (roomID: string, serverName: string) => {
      // const response = await fetch(
      //   `https://api.sample.com/check?roomID=${roomID}`
      // );
      // const data = await response.json();
      // console.log("checkGameAlive", data);
      console.log(`[checkGameAlive] roomID:${roomID} serverName:${serverName}`);
      const data = { isAlive: true };
      const isAlive = data.isAlive;

      return isAlive;
    };

    const registerPlayer = async (roomID: string, serverName: string) => {
      // const response = await fetch(
      //   `https://api.sample.com/register?roomID=${roomID}&serverName=${serverName}`
      // );
      // const data = await response.json();
      // console.log("registerPlayer", data);
      console.log(`[registerPlayer] roomID:${roomID} serverName:${serverName}`);
      const data = { playerIndex: 1 };
      const playerIndex = data.playerIndex;
      localStorage.setItem("roomID", roomID);
      localStorage.setItem("playerIndex", playerIndex.toString());
      return playerIndex;
    };

    const initialize = async () => {
      const url = new URL(window.location.href);
      const paramRoomID = url.searchParams.get("roomID") || null;
      const paramServerName = url.searchParams.get("serverName") || null;
      console.log("paramRoomID", paramRoomID);
      console.log("paramServerName", paramServerName);

      if (paramRoomID === null) {
        setIsLoading(false);
        setError("roomID is required");
        return;
      }
      if (paramServerName === null) {
        setIsLoading(false);
        setError("serverName is required");
        return;
      }

      const isGameAlive = await checkGameAlive(paramRoomID, paramServerName);
      if (!isGameAlive) {
        setIsLoading(false);
        setError("Game is not alive");
        return;
      }

      // localStorageから情報を取得
      const storedRoomID = localStorage.getItem("roomID");
      const storedPlayerIndexString = localStorage.getItem("playerIndex");
      const storedPlayerIndex = storedPlayerIndexString
        ? parseInt(storedPlayerIndexString)
        : null;

      if (storedRoomID === paramRoomID && storedPlayerIndex !== null) {
        setRoomID(paramRoomID);
        setServerName(paramServerName);
        setPlayerIndex(storedPlayerIndex);
        setIsLoading(false);
        return;
      }

      const fetchedPlayerID = await registerPlayer(
        paramRoomID,
        paramServerName,
      );

      if (!fetchedPlayerID) {
        setIsLoading(false);
        setError("Failed to register player");
        return;
      }

      setRoomID(paramRoomID);
      setServerName(paramServerName);
      setPlayerIndex(fetchedPlayerID);
      setIsLoading(false);
    };

    initialize();
  }, []);

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

        <Controller />
      </main>
    </div>
  );
}
