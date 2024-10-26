import React from "react";
import styles from "./component.module.css";
import MainButton from "@/app/components/MainButton";
import ArrowButton from "../ArrowButton";

export default function Controller() {
  return (
    <div className={styles.container}>
      <div className={styles.water}>{/* ここに水泡を表示 */}</div>
      <div className={styles.controller}>
        <MainButton onClick={() => console.log("main clicked")} />
        <div className={styles.arrowContainer}>
          <ArrowButton
            onClick={() => console.log("left clicked")}
            direction="left"
          />
          <ArrowButton
            onClick={() => console.log("right clicked")}
            direction="right"
          />
        </div>
      </div>
    </div>
  );
}
