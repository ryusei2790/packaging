"use client";
import { signIn, signOut } from "next-auth/react";

type Session = {
  user?: {
    name?: string | null;
    email?: string | null;
  };
} | null;

type LoginButtonProps = {
  session: Session;
};

export default function LoginButton({ session }: LoginButtonProps) {
    if (session) {
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

