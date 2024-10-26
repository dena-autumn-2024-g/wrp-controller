"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Loading from "@/app/components/Loading";
import Header from "@/app/components/Header";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        <h1 className={styles.title}>Welcome to Next.js!</h1>
      </main>
    </div>
  );
}
