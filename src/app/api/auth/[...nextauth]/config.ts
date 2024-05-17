import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Session, TokenSet } from "next-auth";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import type { NextAuthOptions } from "next-auth";
import { mongooseConnect } from "@/lib/mongoose";
import User from "@/models/User";

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "email",
          placeholder: "Enter your email...",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password...",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        await mongooseConnect();
        const user = await User.findOne({ email: credentials.email });

        if (user) {
          const match = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (match) {
            const { password, createdAt, ...rest } = user;
            return rest;
          }
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    newUser: "/signup",
  },
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      // console.log("User", user);
      // console.log("Account", account);
      // console.log("Profile", profile);

      await mongooseConnect();

      if (account?.provider === "google") {
        console.log("got here");
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            source: account.provider,
          });
        }
      }

      return true;
    },
  },
};
