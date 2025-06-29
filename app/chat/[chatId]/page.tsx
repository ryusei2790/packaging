"use client";
import { useParams } from "next/navigation";
import ChatRoom from "../components/ChatRoom";
import { SessionProvider } from "next-auth/react";

export default function ChatRoomPage() {
    const params = useParams();
    const { chatId }= params as { chatId: string };

    if (!chatId) {
        return <div>チャットIDがありません</div>;
    }

    return (
        <SessionProvider>
        <div>
            <h1>チャットルーム</h1>
            <ChatRoom chatId={chatId} />
        </div>
        </SessionProvider>
    );
}