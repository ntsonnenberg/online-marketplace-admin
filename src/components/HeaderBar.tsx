"use client";

import { User } from "@/models/User";
import Image from "next/image";
import Link from "next/link";

interface Props {
  user: User | null;
  showNav: boolean;
  toggleNav: () => void;
}

export default function HeaderBar({ user, showNav, toggleNav }: Props) {
  const hamburgerMenu = (
    <div
      onClick={toggleNav}
      className="flex flex-col gap-1 justify-center items-center cursor-pointer lg:hidden"
    >
      <span
        className={`bg-on-primary rounded-full h-0.5 w-7 ${
          showNav ? "animate-spin-top-in" : "animate-spin-top-out"
        }`}
      ></span>
      <span
        className={`bg-on-primary self-start rounded-full h-0.5 transition-all ease-in-out
          ${showNav ? "w-0" : "delay-500 w-4"}`}
      ></span>
      <span
        className={`bg-on-primary rounded-full h-0.5 w-7 ${
          showNav ? "animate-spin-bottom-in" : "animate-spin-bottom-out"
        }`}
      ></span>
    </div>
  );

  return (
    <div className="bg-primary text-on-primary p-4 flex items-center justify-between shadow-lg">
      <Link href="/" className="w-auto flex gap-4 items-center cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
            clipRule="evenodd"
          />
        </svg>
        <Image
          src={
            user?.image ||
            "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
          }
          alt="Vendor Logo"
          width={40}
          height={40}
        />
      </Link>
      <h2 className="hidden lg:block">
        Welcome {user?.name || "<No Vendor Name>"}!
      </h2>
      {hamburgerMenu}
    </div>
  );
}
