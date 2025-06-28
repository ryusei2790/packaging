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

type User = {
    id: string;
    name?: string;
    email?: string;
};

type Message = {
    id: string;
    text: string;
    senderId: string;
    createdAt: any;
    readBy: string[];
};

export default function ChatRoom({ user }: { user: User }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const q = query(
            collection(db, "chats", "chatId1", "messages"),
            orderBy("createdAt", "asc")
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Message)));
        });
        return () => unsubscribe();
    }, []);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        await addDoc(collection(db, "chats", "chatId1", "messages"), {
            text: input,
            senderId: user.id,
            createdAt: serverTimestamp(),
            readBy: [user.id],
        });

        setInput("");
    };

    return (
        <div>
            <div>{messages.map((msg) => (
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