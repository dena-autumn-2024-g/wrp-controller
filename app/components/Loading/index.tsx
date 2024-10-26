import React from "react";
import styles from "./component.module.css";

export default function Loading() {
  return (
    <div className={styles.loading}>
      <p className={styles.p}>通信中...</p>
    </div>
  );
}
