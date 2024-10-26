import React from "react";
import styles from "./component.module.css";

export default function MainButton({ onClick }: { onClick: () => void }) {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onClick}>
        <div className={styles.topCircle} />
        <div className={styles.middleBox} />
        <div className={styles.bottomCircle} />
      </button>
      <div className={styles.base}></div>
    </div>
  );
}
