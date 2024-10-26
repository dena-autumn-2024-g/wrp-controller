"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Loading from "@/app/components/Loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <Loading />
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Next.js!</h1>
      </main>
    </div>
  );
}
