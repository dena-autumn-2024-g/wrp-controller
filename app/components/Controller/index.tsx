import React from "react";
import styles from "./component.module.css";
import { Direction } from "@/src/gen/protobuf/game_pb";
import MainButton from "@/app/components/MainButton";
import ArrowButton from "@/app/components/ArrowButton";
import DisplayPlayerName from "@/app/components/DisplayPlayerName";
import DisplayBubble from "@/app/components/DisplayBubble";
import type Bubble from "@/app/types/Bubble";

export default function Controller({
  userID,
  bubbles,
  onMainButtonTouchStart,
  onMainButtonTouchEnd,
  onLeftArrowButtonTouchStart,
  onRightArrowButtonTouchStart,
}: {
  userID: number;
  bubbles: Bubble[];
  onMainButtonTouchStart: () => void;
  onMainButtonTouchEnd: () => void;
  onLeftArrowButtonTouchStart: () => void;
  onRightArrowButtonTouchStart: () => void;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.water}>
        {bubbles.map((bubble) => (
          <DisplayBubble key={bubble.id} bubble={bubble} />
        ))}
      </div>
      <div className={styles.controller}>
        <MainButton
          userID={userID}
          onTouchStart={onMainButtonTouchStart}
          onTouchEnd={onMainButtonTouchEnd}
        />
        <div className={styles.arrowContainer}>
          <ArrowButton
            onTouchStart={onLeftArrowButtonTouchStart}
            direction={Direction.LEFT}
          />
          <ArrowButton
            onTouchStart={onRightArrowButtonTouchStart}
            direction={Direction.RIGHT}
          />
        </div>
        <DisplayPlayerName playerName={`Player${userID + 1}`} />
      </div>
    </div>
  );
}
