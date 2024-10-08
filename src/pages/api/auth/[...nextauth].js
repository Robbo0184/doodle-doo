import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../db/mongodb";
import User from "../../../../db/models/User";

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

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

        })
    ],
    adapter: MongoDBAdapter(clientPromise),

    callbacks: {
        async session({ session, user }) {
            const dbUser = await User.findOne({ email: session.user.email });

            session.user.userId = user.id;
            session.user.isAdmin = dbUser.isAdmin;
            return session;
        },
    },
};

export default NextAuth(authOptions)