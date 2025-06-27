import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
    const {data: session } = useSession();

    if (session) {
        return (
            <div className="flex items-center gap-2">
                <span>{session.user.name}</span>
                <button onClick={() => signOut()} className="bg-red-500 text-white px-2 py-1 rouded">
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