"use client";

import Link from "next/link";

interface Props {
  onDelete: () => void;
  to: string;
}

export default function DeleteResource({ onDelete, to }: Props) {
  return (
    <form action={onDelete} className="flex gap-4 mt-8 justify-center">
      <button className="btn-delete-filled px-2 py-1 font-bold text-lg">
        Yes
      </button>
      <Link
        className="btn-primary-outline px-2 py-1 font-bold text-lg"
        href={to}
      >
        No
      </Link>
    </form>
  );
}
