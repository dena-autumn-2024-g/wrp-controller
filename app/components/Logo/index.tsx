// Logo.tsx
import React from "react";
import styles from "./component.module.css";

export default function Logo({ isLarge }: { isLarge?: boolean }) {
  return (
    <div className={styles.logo}>
      <div className={styles.h1Container}>
        <h1 className={`${styles.h1} ${isLarge ? styles.h1Large : ""}`}>
          Water Ring Party
        </h1>
        <h1
          className={`${styles.strokeShadow} ${
            isLarge ? styles.strokeShadowLarge : ""
          }`}
        >
          Water Ring Party
        </h1>
        <div
          className={`${styles.shadow} ${isLarge ? styles.shadowLarge : ""}`}
        />
      </div>
    </div>
  );
}
