"use client";
import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type User = { 
    uid: string;
    name: string;
    email: string;
    avatar?: string;
};

export default function FriendList() {
    const [friends, setFriends] = useState<User[]>([]);
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            if (!session?.user?.email) return;
            
            const q = query(collection(db, "users"));
            const snapshot = await getDocs(q);
            const users = snapshot.docs.map((doc) => doc.data() as User);
            const filtered = users.filter(u => u.email !== session.user!.email);
            setFriends(filtered);
        };
        
        fetchUsers();
    }, [session]);

    const startChat = async (friend: User) => {
        const currentUserId = session?.user?.email;
        if (!currentUserId) return;

        const chatsQuery = query(collection(db, "chats"));
        const chatsSnapshot = await getDocs(chatsQuery);
        const existingChat = chatsSnapshot.docs.find(doc => {
            const data = doc.data();
            return data.members.includes(currentUserId) && data.members.includes(friend.email);
        });

        if (existingChat) {
            router.push(`/chat/${existingChat.id}`);
        } else {
            const newChatRef = await addDoc(collection(db, "chats"), {
                members: [currentUserId, friend.email],
                createdAt: new Date(),
            });
            router.push(`/chat/${newChatRef.id}`);
        }
    };

    if (!session?.user) {
        return <div>ログインしてください</div>;
    }

    return (
        <div>
            <h2>友達一覧</h2>
            <ul>
                {friends.map((friend) => (
                    <li key={friend.uid}>
                        <button onClick={() => startChat(friend)}>
                            {friend.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}