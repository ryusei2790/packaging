"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { db } from "../../../lib/firebase";
import { collection, getDocs, query, where, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import FriendAddForm from "./FriendAddForm";
import QRScanAddFriend from "./QRScanAddFriend";

type Session = {
  user?: {
    name?: string | null;
    email?: string | null;
  };
} | null;

type Friend = { 
    uid: string;
    name: string;
    email: string;
    avatar?: string;
};

type FriendListProps = {
  session: Session;
};

export default function FriendList({ session }: FriendListProps) {
    const [friends, setFriends] = useState<Friend[]>([]);
    const router = useRouter();

    // セッション情報をメモ化
    const userEmail = useMemo(() => session?.user?.email, [session?.user?.email]);

    const fetchUsers = useCallback(async () => {
        if (!userEmail) return;
        
        try {
            const q = query(collection(db, "users"));
            const snapshot = await getDocs(q);
            const users = snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() } as Friend));
            const filtered = users.filter(u => u.email !== userEmail);
            setFriends(filtered);
        } catch (error) {
            console.error("ユーザー取得エラー:", error);
        }
    }, [userEmail]);

    useEffect(() => {
        if (userEmail) {
            fetchUsers();
        }
    }, [userEmail, fetchUsers]);

    const startChat = async (friend: Friend) => {
        if (!userEmail) return;

        try {
            const chatsSnapshot = await getDocs(collection(db, "chats"));
            const existingChat = chatsSnapshot.docs.find(doc => {
                const data = doc.data();
                return data.members && data.members.includes(userEmail) && data.members.includes(friend.email);
            });

            if (existingChat) {
                router.push(`/chat/${existingChat.id}`);
            } else {
                const newChatRef = await addDoc(collection(db, "chats"), {
                    members: [userEmail, friend.email],
                    createdAt: serverTimestamp(),
                });
                router.push(`/chat/${newChatRef.id}`);
            }
        } catch (error) {
            console.error("チャット作成エラー:", error);
        }
    };

    return (
        <div>
            <FriendAddForm session={session} />
            <QRScanAddFriend session={session} />
            <h2>友達一覧</h2>
            <ul>
                {friends.map((friend) => (
                    <li key={friend.uid}>
                        {friend.avatar && (
                            <img src={friend.avatar} alt={friend.name} />
                        )}
                        <button onClick={() => startChat(friend)}>
                            {friend.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}