"use client";
import { QRCodeSVG } from "qrcode.react";

type Session = {
  user?: {
    name?: string | null;
    email?: string | null;
  };
} | null;

type MyQRCodeProps = {
  session: Session;
};

export default function MyQRCode({ session }: MyQRCodeProps) {
    if (!session?.user?.email) return null;

    return (
        <div>
            <h3>自分のQRコード</h3>
            <QRCodeSVG value={session.user.email} size={128} />
        </div>
    );
}