"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type SessionWrapperProps = {
  children: ReactNode;
};

export default function SessionWrapper({ children }: SessionWrapperProps) {
  return (
    <SessionProvider 
      refetchInterval={0}
      refetchOnWindowFocus={false}
      refetchWhenOffline={false}
    >
      {children}
    </SessionProvider>
  );
} 