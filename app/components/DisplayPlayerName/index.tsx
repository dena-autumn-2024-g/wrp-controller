import React from "react";
import styles from "./component.module.css";

export default function DisplayPlayerName({
  playerName,
}: {
  playerName: string;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.playerName}>{playerName}</div>
    </div>
  );
}
