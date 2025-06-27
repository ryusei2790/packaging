"use client";
import styles from './page.module.css';
import { SessionProvider } from "next-auth/react";
import ChatContent from "./components/ChatContent";

export default function HomePage() {
  return (
    <div className={styles.pageContainer}>
      <SessionProvider>
        <ChatContent />
      </SessionProvider>
    </div>
  );
}