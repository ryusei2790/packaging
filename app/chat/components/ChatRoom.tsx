"use client";
import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useSession } from "next-auth/react";

type Message = {
  id: string;
  text: string;
  senderId: string;
  createdAt: any;
  readBy: string[];
};

export default function ChatRoom({ chatId }: { chatId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Message)));
    });
    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !session?.user?.email) return;

    await addDoc(collection(db, "chats", chatId, "messages"), {
      text: input,
      senderId: session.user.email,
      createdAt: serverTimestamp(),
      readBy: [session.user.email],
    });

    setInput("");
  };

  return (
    <div>
      <div>
        {messages.map((msg) => (
          <p key={msg.id}>{msg.text}</p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="メッセージを入力"
        />
        <button type="submit">送信</button>
      </form>
    </div>
  );
}

}