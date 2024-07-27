"use client";

import React from "react";

interface Props {
  children: any;
  close: () => void;
}

export default function Modal({ children, close }: Props) {
  return (
    <div>
      <div className="fixed inset-0 bg-neutral-500/50 backdrop-blur-sm"></div>
      <dialog
        className="bg-background border border-on-background shadow-2xl backdrop-blur-3xl p-4 rounded-lg w-5/6"
        open
      >
        <div className="flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 cursor-pointer"
            onClick={close}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {children}
      </dialog>
    </div>
  );
}
