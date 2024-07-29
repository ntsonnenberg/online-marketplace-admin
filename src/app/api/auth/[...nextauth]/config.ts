import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";

interface Session {
  user: {
    name?: string;
    email: string;
    image?: string;
    id: string;
  };
}

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
            return await User.findOne({ email: credentials.email }).lean();
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
      await mongooseConnect();

      if (account?.provider === "google") {
        const existingUser = await User.findOne({ email: user.email });

        // TODO: only register with my email
        if (user.email !== "ntsonnenberg@gmail.com") {
          return false;
        }

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
