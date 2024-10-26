import React from "react";
import styles from "./component.module.css";
import MainButton from "@/app/components/MainButton";
import ArrowButton from "../ArrowButton";
import DisplayPlayerName from "../DisplayPlayerName";
import Direction from "@/app/types/Direction";

export default function Controller({
  playerIndex,
  onMainButtonTouchStart,
  onMainButtonTouchEnd,
  onLeftArrowButtonTouchStart,
  onRightArrowButtonTouchStart,
}: {
  playerIndex: number;
  onMainButtonTouchStart: () => void;
  onMainButtonTouchEnd: () => void;
  onLeftArrowButtonTouchStart: () => void;
  onRightArrowButtonTouchStart: () => void;
}) {
  console.log("playerIndex", playerIndex);

  return (
    <div className={styles.container}>
      <div className={styles.water}>{/* ここに水泡を表示 */}</div>
      <div className={styles.controller}>
        <MainButton
          playerIndex={playerIndex}
          onTouchStart={onMainButtonTouchStart}
          onTouchEnd={onMainButtonTouchEnd}
        />
        <div className={styles.arrowContainer}>
          <ArrowButton
            onTouchStart={onLeftArrowButtonTouchStart}
            direction={Direction.Left}
          />
          <ArrowButton
            onTouchStart={onRightArrowButtonTouchStart}
            direction={Direction.Right}
          />
        </div>
        <DisplayPlayerName playerName={`Player${playerIndex}`} />
      </div>
    </div>
  );
}
