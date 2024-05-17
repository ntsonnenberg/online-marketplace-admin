"use client";

import { signIn } from "next-auth/react";
import googleLogo from "../../public/google-logo.svg";
import Image from "next/image";

export default function GoogleButton() {
  return (
    <button
      className="bg-gray-200 p-2 px-4 rounded-lg font-bold text-lg flex justify-center gap-6 items-center w-1/4"
      onClick={() => signIn("google")}
    >
      <Image src={googleLogo} alt="Google Logo" width={50} height={50} />
      Continue with Google
    </button>
  );
}
