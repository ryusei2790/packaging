"use client";
import { useState } from "react";
import { db } from "../../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";

type Friend = {
  name: string;
  email: string;
};

type FriendAddFormProps = {
  onFriendAdded: () => void;
};

export default function FriendAddForm({ onFriendAdded }: FriendAddFormProps) {
  const [friend, setFriend] = useState<Friend>({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const { data: session } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFriend({ ...friend, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!friend.name || !friend.email || !session?.user?.email) {
      setMessage("全ての項目を入力してください");
      return;
    }
    try {
      await addDoc(collection(db, "users"), {
        name: friend.name,
        email: friend.email,
        addedBy: session.user.email,
        createdAt: serverTimestamp(),
      });
      setMessage("友達を追加しました");
      setFriend({ name: "", email: "" });
      onFriendAdded();
    } catch (error) {
      setMessage("追加に失敗しました");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={friend.name}
        onChange={handleChange}
        placeholder="名前"
      />
      <input
        type="email"
        name="email"
        value={friend.email}
        onChange={handleChange}
        placeholder="メールアドレス"
      />
      <button type="submit">追加</button>
      {message && <p>{message}</p>}
    </form>
  );
}