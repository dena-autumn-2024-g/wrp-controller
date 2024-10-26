"use client";
import styles from "./page.module.css";
import Loading from "@/app/components/Loading";
import Header from "@/app/components/Header";
import Controller from "./components/Controller";
import useGame from "@/app/hooks/useGame";

export default function Home() {
  const { isLoading, error, playerIndex } = useGame();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className={styles.page}>{error}</div>;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />

        <Controller playerIndex={playerIndex} />
      </main>
    </div>
  );
}
