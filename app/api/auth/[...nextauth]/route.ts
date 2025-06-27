import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // 他のプロバイダーもここに追加可能
  ],
  // 必要に応じてコールバックやDB設定も
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };