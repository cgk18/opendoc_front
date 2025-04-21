"use client";

import SearchForm from './components/SearchForm';
import styles from './components/styles/Home.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>
          Connecting <span className={styles.emphasis}>YOU</span> with the right <span className={styles.emphasis}>DOCTORS</span>
        </h1>
        <p className={styles.subtitle}>through smart, personalized recommendations.</p>
      </div>

      <SearchForm />
    </main>
  );
}