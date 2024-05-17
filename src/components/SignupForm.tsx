"use client";

import Button from "./Button";
import Input from "./Input";
import { useFormState } from "react-dom";
import { signup } from "@/actions/auth";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [state, action] = useFormState(signup, undefined);

  const router = useRouter();

  if (state?.message === "Success") {
    router.push("/");
  }

  return (
    <form action={action} className="flex flex-col gap-4 w-1/4">
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <Input id="email" name="email" placeholder="Enter email..." />
      </div>
      {state?.errors?.email && (
        <p className="text-red-700">{state.errors.email}</p>
      )}
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter password..."
        />
      </div>
      {state?.errors?.password && (
        <div className="text-red-700">
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}> - {error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <label htmlFor="confirm">Confirm Password</label>
        <Input
          id="confirm"
          name="confirm"
          type="password"
          placeholder="Confirm password..."
        />
      </div>
      {state?.errors?.confirm && (
        <p className="text-red-700">{state.errors.confirm}</p>
      )}
      <Button color="primary" theme="filled" type="submit">
        Sign Up
      </Button>
      {state?.message && state.message !== "Success" && (
        <p className="text-red-700">{state.message}</p>
      )}
    </form>
  );
}
