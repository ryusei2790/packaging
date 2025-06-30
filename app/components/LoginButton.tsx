"use client";
import { signIn, signOut } from "next-auth/react";

// next-auth標準のSession型に揃える
export type Session = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires?: string;
} | null;

type LoginButtonProps = {
  session: Session;
};

export default function LoginButton({ session }: LoginButtonProps) {
    if (session?.user) {
        return (
            <div className="flex items-center gap-2">
                <span>{session.user?.name}さん</span>
                <button onClick={() => signOut()} className="bg-red-500 text-white px-2 py-1 rounded">
                    ログアウト
                </button>
            </div>
        );
    }
    return (
        <button onClick={() => signIn("google")} className="bg-blue-500 text-white px-2 py-1 rounded">
            Googleでログイン
        </button>
    );
}

