"use client";
import styles from './page.module.css';
import { SessionProvider, useSession } from "next-auth/react";
import ChatRoom from "./components/ChatRoom";
import LoginButton from "../components/LoginButton";


function InnerChatPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>読み込み中...</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <LoginButton />
      {session?.user ? (
        <ChatRoom user={{
          id: session.user.email || 'anonymous',
          name: session.user.name || '',
          email: session.user.email || ''
        }} />
      ) : (
        <div>ログインしてください</div>
      )}
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
