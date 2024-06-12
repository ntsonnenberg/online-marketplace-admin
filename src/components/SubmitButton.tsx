"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary-filled p-2 w-32"
    >
      {pending ? (
        <div className="flex justify-center items-center gap-3">
          <span className="loader"></span>Save
        </div>
      ) : (
        "Save"
      )}
    </button>
  );
}
