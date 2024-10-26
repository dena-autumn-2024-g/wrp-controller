import React from "react";
import { useState } from "react";
import styles from "./component.module.css";
import MainButton from "@/app/components/MainButton";
import ArrowButton from "../ArrowButton";
import DisplayPlayerName from "../DisplayPlayerName";

export default function Controller({ playerIndex }: { playerIndex: number }) {
  console.log("playerIndex", playerIndex);

  return (
    <div className={styles.container}>
      <div className={styles.water}>{/* ここに水泡を表示 */}</div>
      <div className={styles.controller}>
        <MainButton
          playerIndex={playerIndex}
          onClick={() => console.log("main clicked")}
        />
        <div className={styles.arrowContainer}>
          <ArrowButton
            onClick={() => console.log("left clicked")}
            direction="left"
          />
          <ArrowButton
            onClick={() => console.log("right clicked")}
            direction="right"
          />
        </div>
        <DisplayPlayerName playerName="Player1" />
      </div>
    </div>
  );
}
