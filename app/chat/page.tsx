"use client";
import styles from './page.module.css';
import { useSession } from "next-auth/react";
import LoginButton from "../components/LoginButton";
import FriendList from "./components/FriendList";

export default function ChatPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>読み込み中...</div>;
  }

  if (status === "unauthenticated" || !session?.user) {
    return (
      <div className={styles.pageContainer}>
        <LoginButton session={session} />
        <div>ログインしてください</div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <LoginButton session={session} />
      <FriendList session={session} />
    </div>
  );
}
