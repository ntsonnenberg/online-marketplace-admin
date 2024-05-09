"use client";

import Button from "./Button";
import Input from "./Input";
import { useActionState } from "react";
import { signup } from "@/app/actions/auth";
import { useFormStatus } from "react-dom";

export default function SignupForm() {
  const [state, action] = useActionState(signup, undefined);
  const { pending } = useFormStatus();

  return (
    <form className="flex flex-col gap-10 w-1/4">
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <Input id="email" name="email" placeholder="Enter email..." />
      </div>
      {/* {state?.errors?.email && <p>{state.errors.email}</p>} */}
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter password..."
        />
      </div>
      {/* {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}> - {error}</li>
            ))}
          </ul>
        </div>
      )} */}
      <div className="flex flex-col gap-2">
        <label htmlFor="confirm-password">Confirm Password</label>
        <Input
          id="confirm-password"
          name="confirm-password"
          type="password"
          placeholder="Confirm password..."
        />
      </div>
      <Button
        color="red"
        theme="filled"
        className="font-bold"
        aria-disabled={pending}
        type="submit"
      >
        {pending ? "Submitting..." : "Sign Up"}
      </Button>
    </form>
  );
}
