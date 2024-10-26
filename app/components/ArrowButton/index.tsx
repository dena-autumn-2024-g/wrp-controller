import React from "react";
import styles from "./component.module.css";
import { Direction } from "@/src/gen/protobuf/game_pb";

export default function ArrowButton({
  onTouchStart,
  direction,
}: {
  onTouchStart: () => void;
  direction: Direction;
}) {
  return (
    <div className={styles.container}>
      <button className={styles.button} onTouchStart={onTouchStart}>
        <div
          className={`${styles.arrow} ${
            direction === Direction.LEFT ? styles.left : styles.right
          }`}
        />
      </button>
    </div>
  );
}
