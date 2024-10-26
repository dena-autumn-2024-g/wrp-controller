import React from "react";
import styles from "./component.module.css";
import Button from "@/app/components/Button";

export default function Controller() {
  return (
    <div className={styles.container}>
      <div className={styles.water}>{/* ここに水泡を表示 */}</div>
      <div className={styles.controller}>
        <Button onClick={() => console.log("clicked")} />
      </div>
    </div>
  );
}
