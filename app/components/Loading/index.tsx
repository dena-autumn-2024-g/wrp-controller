import React from "react";
import styles from "./component.module.css";
import Logo from "@/app/components/Logo";

export default function Loading() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.loading}>
          <Logo isLarge />
          <p className={styles.p}>通信中...</p>
        </div>
      </main>
    </div>
  );
}
