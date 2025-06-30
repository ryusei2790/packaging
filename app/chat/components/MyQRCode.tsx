"use client";
import { QRCodeSVG } from "qrcode.react";
import { useSession } from "next-auth/react";

export default function MyQRCode() {
    const { data: session } = useSession();
    if (!session?.user?.email) return null;

    return (
        <div>
            <h3>自分のQRコード</h3>
            <QRCodeSVG value={session.user.email} size={128} />
        </div>
    );
}