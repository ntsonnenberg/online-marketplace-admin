import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-20 justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="font-bold text-4xl mb-10">
          Welcome to Online Marketplace Vendor Portal
        </h1>
        <h3 className="font-bold text-2xl">Login to your account</h3>
      </div>
      <LoginForm />
      <Link href="/signup" className="font-bold text-red-500">
        Don&apos;t have an account? Sign up here!
      </Link>
    </div>
  );
}
