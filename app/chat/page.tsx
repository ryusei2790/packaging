"use client";
import styles from './page.module.css';
import { SessionProvider, useSession } from "next-auth/react";
import ChatRoom from "./components/ChatRoom";

function InnerChatPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>読み込み中...</div>;
  }

  if (!session) {
    return <div>ログインして下さい。</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <ChatRoom user={session.user} />
    </div>
  );
}

export default function ChatPage() {
  return (
    <SessionProvider>
      <InnerChatPage />
    </SessionProvider>
  );
}
