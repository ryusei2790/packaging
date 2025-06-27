import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: ProcessingInstruction.env.GOOGLE_CLIENT_ID,
            clientSecret: ProcessingInstruction.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: ProcessingInstruction.env.NEXTAUTH_SECRET,
});