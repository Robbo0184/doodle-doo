import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../db/mongodb";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            profile(data) {
                return {
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    image: data.avatar_url,
                    admin: false,
                    
                };
            },
        }),
        // ...add more providers here
    ],
    adapter: MongoDBAdapter(clientPromise),

    callbacks: {
        async session({ session, user }) {
            session.user.userId = user.id;
           
            return session;
        },
    },
};

export default NextAuth(authOptions)