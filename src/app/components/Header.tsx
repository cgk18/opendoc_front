
"use client";

import styles from './styles/Header.module.css';
import Image from 'next/image';
import Link from 'next/link';


export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <div className={styles.logoContainer}>
            <span className={styles.logoText}>OpenDoc</span>
            {/* You'll need to create this logo file */}
            <div className={styles.logoImage}>
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="35" fill="#87CEFA" />
                <circle cx="40" cy="40" r="15" fill="#FFFFFF" />
              </svg>
            </div>
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