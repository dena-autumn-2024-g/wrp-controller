import React from "react";
import styles from "./component.module.css";
import Direction from "@/app/types/Direction";

export default function ArrowButton({
  onClick,
  direction,
}: {
  onClick: () => void;
  direction: Direction;
}) {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onClick}>
        <div
          className={`${styles.arrow} ${
            direction === Direction.Left ? styles.left : styles.right
          }`}
        />
      </button>
    </div>
  );
}
