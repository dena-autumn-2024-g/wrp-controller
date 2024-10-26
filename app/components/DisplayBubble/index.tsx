import React from "react";
import styles from "./component.module.css";
import type Bubble from "@/app/types/Bubble";

export default function DisplayBubble({ bubble }: { bubble: Bubble }) {
  return (
    <div
      key={bubble.id}
      className={styles.bubble}
      style={{
        left: `${bubble.x}%`,
        width: `${bubble.size}px`,
        height: `${bubble.size}px`,
        animationDelay: `${bubble.delay}s`,
      }}
    />
  );
}
