import React from "react";
import styles from "./component.module.css";

export default function Button({ onClick }: { onClick: () => void }) {
  return (
    <button className={styles.button} onClick={onClick}>
      <div className={styles.topCircle} />
      <div className={styles.middleBox} />
      <div className={styles.bottomCircle} />
    </button>
  );
}
