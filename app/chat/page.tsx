"use client";

import styles from './page.module.css';
import { useSession } from "next-auth/react";
import FriendList from "./components/FriendList";

export default function ChatPage() {
  const { data: session, status } = useSession({
    required: false,
  });

  if (status === "loading") {
    return <div>読み込み中...</div>;
  }

  if (!session?.user) {
    return (
      <div className={styles.pageContainer}>
        <p>ログインしてください</p>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <FriendList session={session}/>
    </div>
  );
}

