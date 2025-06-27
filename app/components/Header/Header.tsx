import React from 'react';
import styles from "./Header.module.css";
import Image from "next/image";



export default function Head() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image src="/images/packaging.png" alt="packa" width={100} height={100} />
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li><a href="/" className={styles.navLink}>ホーム</a></li>
            <li><a href="/chat" className={styles.navLink}>チャット</a></li>
            <li><a href="/about" className={styles.navLink}>About</a></li>
            <li><a href="/contact" className={styles.navLink}>お問い合わせ</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}