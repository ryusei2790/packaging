"use client";
import React from 'react';
import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoginButton from "../LoginButton";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image src="/images/packaging.png" alt="packa" width={100} height={100} />
        </div>
        <nav className={styles.nav}>
          <div className={styles.userArea}>
            {session?.user?.name && (
              <span className={styles.userName}>{session.user.name} さん</span>
            )}
            <LoginButton session={session} />
          </div>
          <ul className={styles.navList}>
            <li><Link href="/" className={styles.navLink}>ホーム</Link></li>
            <li><Link href="/chat" className={styles.navLink}>チャット</Link></li>
            <li><Link href="/about" className={styles.navLink}>About</Link></li>
            <li><Link href="/contact" className={styles.navLink}>お問い合わせ</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}