import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SessionWrapper from "./components/SessionWrapper";
import AuthGuard from "./components/AuthGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "packaging",
  description: "share your time with pack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <SessionWrapper>
          <AuthGuard>
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </AuthGuard>
        </SessionWrapper>
      </body>
    </html>
  );
}
