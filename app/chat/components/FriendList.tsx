"use client";
import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { collection, getDocs, query, where, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import FriendAddForm from "./FriendAddForm";
import QRScanAddFriend from "./QRScanAddFriend";
import MyQRCode from "./MyQRCode";

type FriendListProps = {
  session: Session;
};

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

export default function FriendList({ session }: FriendListProps) {
    const [friends, setFriends] = useState<Friend[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const q = query(collection(db, "users"));
                const snapshot = await getDocs(q);
                const users = snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() } as Friend));
                const filtered = users.filter(u => u.email !== session?.user?.email);
                setFriends(filtered);
            } catch (error) {
                console.error("ユーザー取得エラー:", error);
            }
        };

        fetchUsers();
    }, [session?.user?.email]);

    const startChat = async (friend: Friend) => {
        try {
            const chatsSnapshot = await getDocs(collection(db, "chats"));
            const existingChat = chatsSnapshot.docs.find(doc => {
                const data = doc.data();
                return data.members && data.members.includes(session?.user?.email) && data.members.includes(friend.email);
            });

            if (existingChat) {
                router.push(`/chat/${existingChat.id}`);
            } else {
                const newChatRef = await addDoc(collection(db, "chats"), {
                    members: [session?.user?.email, friend.email],
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
            <MyQRCode session={session} />
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