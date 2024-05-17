import NextAuth from "next-auth/next";
import { authConfig } from "@/app/api/auth/[...nextauth]/config";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
