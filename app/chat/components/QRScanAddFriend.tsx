"use client";
import { useEffect, useRef, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { db } from "../../../lib/firebase";
import { collection, addDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function QRScanAddFriend() {
  const qrRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const handleQRScan = useCallback(async (decodedText: string) => {
    if (!session?.user?.email) return;

    console.log("QRコード内容:", decodedText);

    const friendEmail = decodedText;

    try {
      // ① 友達登録
      const usersQuery = query(collection(db, "users"), where("email", "==", friendEmail));
      const usersSnapshot = await getDocs(usersQuery);

      if (usersSnapshot.empty) {
        alert("ユーザーが見つかりませんでした。");
        return;
      }

      // ② チャットルーム作成または既存取得
      const chatsQuery = query(collection(db, "chats"));
      const chatsSnapshot = await getDocs(chatsQuery);
      const existingChat = chatsSnapshot.docs.find(doc => {
        const data = doc.data();
        return data.members && data.members.includes(session.user!.email) && data.members.includes(friendEmail);
      });

      let chatId;

      if (existingChat) {
        chatId = existingChat.id;
      } else {
        const newChatRef = await addDoc(collection(db, "chats"), {
          members: [session.user!.email, friendEmail],
          createdAt: serverTimestamp(),
        });
        chatId = newChatRef.id;
      }

      router.push(`/chat/${chatId}`);
    } catch (error) {
      console.error("QRスキャン処理エラー:", error);
      alert("処理中にエラーが発生しました");
    }
  }, [session?.user?.email, router]);

  useEffect(() => {
    if (!qrRef.current || !session?.user?.email) return;

    const html5QrCode = new Html5Qrcode(qrRef.current.id);

    html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      handleQRScan,
      (errorMessage) => {
        console.warn("QRコード読み取りエラー:", errorMessage);
      }
    );

    return () => {
      html5QrCode.stop().catch(err => console.log("停止エラー:", err));
    };
  }, [session?.user?.email, handleQRScan]);

  return (
    <div>
      <h3>QRコードスキャンで友達追加</h3>
      <div id="qr-reader" ref={qrRef} style={{ width: "300px", height: "300px" }} />
    </div>
  );
}

