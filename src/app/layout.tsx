import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { getServerSession } from "next-auth";
import { authConfig } from "./api/auth/[...nextauth]/config";
import Nav from "@/components/Nav";
import axios from "axios";
import { getUser } from "@/actions/users";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Marketplace Admin",
  description:
    "This is an online marketplace for vendors of 'Online Marketplace' to sell their products.",
};

axios.defaults.baseURL = "http://localhost:3000/api";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authConfig);

  if (!session) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <AuthProvider>{children}</AuthProvider>
        </body>
      </html>
    );
  }

  const user = await getUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen">
            <div className="relative">
              <Nav user={user} />
              <div className="flex-grow p-6 lg:ml-56">{children}</div>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
