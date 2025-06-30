"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/api/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>読み込み中...</div>;
  }

  if (!session?.user) {
    // すぐリダイレクトするので何も表示しない
    return null;
  }

  return <>{children}</>;
} 