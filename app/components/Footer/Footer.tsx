import React from 'react';
import styles from "./Footer.module.css";


export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li><a href="/" className={styles.navLink}>ホーム</a></li>
            <li><a href="/about" className={styles.navLink}>About</a></li>
            <li><a href="/contact" className={styles.navLink}>お問い合わせ</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}