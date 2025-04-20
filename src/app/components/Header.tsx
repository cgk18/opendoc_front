// src/app/components/Header.tsx
"use client";

import Link from 'next/link';
import styles from './styles/Header.module.css';
import OpenDocLogo from './OpenDocLogo';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <div className={styles.logoContainer}>
            <span className={styles.logoText}>OpenDoc</span>
            <OpenDocLogo width={120} height={60} />
          </div>
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/searches">Previous searches</Link>
        <Link href="/feedback">Feedback</Link>
        <Link href="/about">About</Link>
        <div className={styles.userIcon}>
          <svg width="30" height="30" viewBox="0 0 30 30">
            <circle cx="15" cy="10" r="6" fill="#FFFFFF" />
            <path d="M15,18 C9,18 4,22 4,27 L26,27 C26,22 21,18 15,18 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </nav>
    </header>
  );
}