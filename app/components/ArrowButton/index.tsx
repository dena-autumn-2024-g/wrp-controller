import React from "react";
import styles from "./component.module.css";

export default function ArrowButton({
  onClick,
  direction,
}: {
  onClick: () => void;
  direction: "left" | "right";
}) {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onClick}>
        <div
          className={`${styles.arrow} ${
            direction === "left" ? styles.left : styles.right
          }`}
        />
      </button>
    </div>
  );
}
