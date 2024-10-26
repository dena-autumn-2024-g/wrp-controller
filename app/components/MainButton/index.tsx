import React from "react";
import styles from "./component.module.css";
import { PLAYER_COLORS } from "@/app/const";

export default function MainButton({
  playerIndex,
  onTouchStart,
  onTouchEnd,
}: {
  playerIndex: number;
  onTouchStart: () => void;
  onTouchEnd: () => void;
}) {
  const { color, shadowColor } = PLAYER_COLORS[playerIndex];

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className={styles.topCircle}
          style={{ backgroundColor: color, border: `4px solid ${shadowColor}` }}
        />
        <div
          className={styles.middleBox}
          style={{
            backgroundColor: shadowColor,
            border: `4px solid ${shadowColor}`,
          }}
        />
        <div
          className={styles.bottomCircle}
          style={{
            backgroundColor: shadowColor,
            border: `4px solid ${shadowColor}`,
          }}
        />
      </button>
      <div
        className={styles.base}
        style={{ backgroundColor: color, border: `4px solid ${shadowColor}` }}
      />
    </div>
  );
}
