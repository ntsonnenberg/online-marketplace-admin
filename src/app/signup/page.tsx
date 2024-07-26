import GoogleButton from "@/components/GoogleButton";
import SignupForm from "@/components/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex flex-col gap-20 justify-center items-center h-screen my-16">
      <div className="text-center md:w-2/3 lg:w-1/3">
        <h1 className="font-bold text-4xl mb-10">
          Welcome to Online Marketplace Vendor Portal
        </h1>
        <h3 className="font-bold text-2xl">Sign up for your account</h3>
      </div>
      <GoogleButton />
      <SignupForm />
      <p className="text-on-background">
        Already have an account?{" "}
        <Link href="/" className="font-bold text-primary">
          Login
        </Link>
      </p>
    </div>
  );
}
