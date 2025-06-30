"use client";
import { useState } from "react";
import { db } from "../../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";

type QRScanAddFriendProps = {
  onFriendAdded: () => void;
};

export default function QRScanAddFriend({ onFriendAdded }: QRScanAddFriendProps) {
  const [scannedEmail, setScannedEmail] = useState("");
  const [message, setMessage] = useState("");
  const { data: session } = useSession();

  const handleScan = (email: string) => {
    setScannedEmail(email);
  };

  const handleAdd = async () => {
    if (!scannedEmail || !session?.user?.email) {
      setMessage("QRコードをスキャンしてください");
      return;
    }
    try {
      await addDoc(collection(db, "users"), {
        email: scannedEmail,
        addedBy: session.user.email,
        createdAt: serverTimestamp(),
      });
      setMessage("友達を追加しました");
      setScannedEmail("");
      onFriendAdded();
    } catch (error) {
      setMessage("追加に失敗しました");
    }
  };

  return (
    <div>
      {/* QRコードスキャンUIをここに実装 */}
      <button onClick={handleAdd}>友達追加</button>
      {message && <p>{message}</p>}
    </div>
  );
}

