"use client";

import { useFormState } from "react-dom";
import { login } from "@/actions/auth";
import SubmitButton from "./SubmitButton";

export default function LoginForm() {
  const [state, action] = useFormState(login, undefined);

  return (
    <form
      action={action}
      className="flex flex-col gap-4 w-9/12 md:w-1/3 lg:w-1/4"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="Enter email..." />
      </div>
      {state?.errors?.email && (
        <p className="text-red-700">{state.errors.email}</p>
      )}
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input
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
      <SubmitButton className="w-full">Log In</SubmitButton>
    </form>
  );
}
