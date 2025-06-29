"use client";
import { useParams } from "next/navigation";
import ChatRoom from "../components/ChatRoom";

type Session = {
  user?: {
    name?: string | null;
    email?: string | null;
  };
} | null;

type ChatRoomPageProps = {
  session: Session;
};

export default function ChatRoomPage({ session }: ChatRoomPageProps) {
    const params = useParams();
    const { chatId }= params as { chatId: string };

    if (!chatId) {
        return <div>チャットIDがありません</div>;
    }

    return (
        <div>
            <h1>チャットルーム</h1>
            <ChatRoom chatId={chatId} session={session} />
        </div>
    );
}