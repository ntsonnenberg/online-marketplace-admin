import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { getServerSession } from "next-auth";
import { authConfig } from "./api/auth/[...nextauth]/config";
import Nav from "@/components/Nav";
import axios from "axios";

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

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen">
            <div className="bg-primary text-on-primary p-4 flex items-center justify-between shadow-lg">
              <div className="flex gap-4">
                <button className="w-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                    />
                  </svg>
                </button>
                <h2>Vendor Name</h2>
              </div>
              <h2>Welcome {session?.user?.email}!</h2>
            </div>
            <div className="flex">
              <Nav />
              <div className="flex-grow p-6">{children}</div>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
