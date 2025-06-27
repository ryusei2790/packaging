"use client";
import { useSession } from "next-auth/react";
import LoginButton from "../../components/LoginButton";

export default function ChatContent() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return (
    <div>
      <div>ログインしてください</div>
     
      <LoginButton />
    </div>
  );

  return (
    <div>
      <div>ログインユーザー: {session.user?.name || session.user?.email}</div>
      {/* チャット内容など */}
    </div>
  );
} 