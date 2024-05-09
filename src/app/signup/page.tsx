import SignupForm from "@/components/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex flex-col gap-20 justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="font-bold text-4xl mb-10">
          Welcome to Online Marketplace Vendor Portal
        </h1>
        <h3 className="font-bold text-2xl">Sign up for your account</h3>
      </div>
      <SignupForm />
      <Link href="/" className="font-bold text-red-500">
        Already have an account? Login here!
      </Link>
    </div>
  );
}
