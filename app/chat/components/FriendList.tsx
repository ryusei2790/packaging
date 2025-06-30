"use client";
import { useEffect, useState, useCallback } from "react";
import { db } from "../../../lib/firebase";
import { collection, getDocs, query, where, doc, getDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import FriendAddForm from "./FriendAddForm";
import QRScanAddFriend from "./QRScanAddFriend";
import MyQRCode from "./MyQRCode";
import { useSession } from "next-auth/react";

type Friend = { 
    uid: string;
    name: string;
    email: string;
    avatar?: string;
};

export default function FriendList() {
    const [friends, setFriends] = useState<Friend[]>([]);
    const { data: session } = useSession();
    const router = useRouter();

    const fetchFriends = useCallback(async () => {
        if (!session?.user?.email) return;
        const userDocRef = doc(db, "users", session.user.email);
        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) return;
        const userData = userDocSnap.data();
        const friendEmails: string[] = userData.friends || [];
        if (friendEmails.length === 0) {
            setFriends([]);
            return;
        }
        const q = query(collection(db, "users"), where("email", "in", friendEmails.slice(0, 10)));
        const snapshot = await getDocs(q);
        const users = snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() } as Friend));
        setFriends(users);
    }, [session?.user?.email]);

    useEffect(() => {
        fetchFriends();
    }, [fetchFriends]);

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
            <MyQRCode />
            <FriendAddForm onFriendAdded={fetchFriends} />
            <QRScanAddFriend onFriendAdded={fetchFriends} />
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