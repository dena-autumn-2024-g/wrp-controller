import React from "react";
import styles from "./component.module.css";
import Logo from "@/app/components/Logo";

export default function Header() {
  return (
    <div className={styles.header}>
      <Logo />
    </div>
  );
}
