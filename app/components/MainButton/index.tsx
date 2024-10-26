import React from "react";
import styles from "./component.module.css";
import { PLAYER_COLORS } from "@/app/const";

export default function MainButton({
  playerIndex,
  onClick,
}: {
  playerIndex: number;
  onClick: () => void;
}) {
  const { color, shadowColor } = PLAYER_COLORS[playerIndex];

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onClick}>
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
