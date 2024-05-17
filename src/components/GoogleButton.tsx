"use client";

import { signIn } from "next-auth/react";
import googleLogo from "../../public/Logo-google-icon-PNG.png";
import Image from "next/image";

export default function GoogleButton() {
  return (
    <button
      className="bg-gray-200 p-2 px-4 rounded-lg font-bold flex gap-6 items-center"
      onClick={() => signIn("google")}
    >
      <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
      Continue with Google
    </button>
  );
}
