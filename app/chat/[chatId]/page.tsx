"use client";
import { useParams } from "next/navigation";
import ChatRoom from "../components/ChatRoom";

export default function ChatRoomPage() {
    const params = useParams();
    const { chatId }= params as { chatId: string };

    if (!chatId) {
        return <div>チャットIDがありません</div>;
    }

    return (
        <div>
            <h1>チャットルーム</h1>
            <ChatRoom chatId={chatId} />
        </div>
    );
}