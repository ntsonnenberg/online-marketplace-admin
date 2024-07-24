"use client";

import { useFormStatus } from "react-dom";

interface Props {
  children: string;
  className?: string;
}

export default function SubmitButton({ children, className }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`btn-primary-filled p-2 w-32 ${className}`}
    >
      {pending ? (
        <div className="flex justify-center items-center gap-3">
          <span className="loader"></span>
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  );
}
