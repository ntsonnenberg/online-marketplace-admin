import GoogleButton from "@/components/GoogleButton";
import LoginForm from "@/components/LoginForm";
import { authConfig } from "@/app/api/auth/[...nextauth]/config";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function HomePage() {
  const session = await getServerSession(authConfig);

  console.log("SESSION - LOGIN PAGE:", session);

  if (!session) {
    return (
      <div className="flex flex-col gap-20 justify-center items-center h-screen my-16">
        <div className="text-center w-1/3">
          <h1 className="font-bold text-4xl mb-10">
            Welcome to Online Marketplace Vendor Portal
          </h1>
          <h3 className="font-bold text-2xl">Login to your account</h3>
        </div>
        <GoogleButton />
        <LoginForm />
        <p className="text-on-background">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-bold text-primary">
            Sign up
          </Link>
        </p>
      </div>
    );
  }

  return <div>Dashboard Page</div>;
}
