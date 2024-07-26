"use client";

import Link from "next/link";
import SubmitButton from "./SubmitButton";

interface Props {
  backTo: string;
}

export default function FormButtons({ backTo }: Props) {
  return (
    <div className="fixed bottom-0 left-56 right-0 bg-background/50 backdrop-blur-md flex justify-end gap-4 p-4">
      <Link
        href={backTo}
        className="btn-primary-outline p-2 w-32 flex justify-center"
      >
        Cancel
      </Link>
      <SubmitButton>Save</SubmitButton>
    </div>
  );
}
