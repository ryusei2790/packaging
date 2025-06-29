"use client";
import { useState } from "react";
import { db } from "../../../lib/firebase";
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion, addDoc, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function FriendAddForm() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const handleAddFriend = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!session?.user?.email || !email) return;

        setIsLoading(true);
        try {
            // ユーザーを検索
            const q = query(collection(db, "users"), where("email", "==", email));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                alert("ユーザーが見つかりません");
                return;
            }

            const friendDoc = snapshot.docs[0];
            const friendId = friendDoc.id;
            const currentUserEmail = session.user.email;

            // 現在のユーザーのドキュメントを取得または作成
            const currentUserRef = doc(db, "users", currentUserEmail);
            await updateDoc(currentUserRef, {
                friends: arrayUnion(friendId),
                updatedAt: serverTimestamp(),
            });

            // 友達のドキュメントを更新
            const friendRef = doc(db, "users", friendId);
            await updateDoc(friendRef, {
                friends: arrayUnion(currentUserEmail),
                updatedAt: serverTimestamp(),
            });

            // 既存のチャットを確認
            const chatsQ = query(collection(db, "chats"));
            const chatsSnap = await getDocs(chatsQ);
            const existingChat = chatsSnap.docs.find(doc => {
                const data = doc.data();
                return data.members && data.members.includes(currentUserEmail) && data.members.includes(email);
            });

            if (existingChat) {
                router.push(`/chat/${existingChat.id}`);
            } else {
                // 新しいチャットを作成
                const newChatRef = await addDoc(collection(db, "chats"), {
                    members: [currentUserEmail, email],
                    createdAt: serverTimestamp(),
                });
                router.push(`/chat/${newChatRef.id}`);
            }

            setEmail("");
            alert("友達を追加しました！");
        } catch (error) {
            console.error("友達追加エラー:", error);
            alert("友達の追加に失敗しました");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h3>メールで友達を追加</h3>
            <form onSubmit={handleAddFriend}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="友達のメールアドレス"
                    required
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !email}>
                    {isLoading ? "追加中..." : "追加"}
                </button>
            </form>
        </div>
    );
}