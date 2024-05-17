import axios from "axios";
import { SignupFormSchema, LoginFormSchema } from "../lib/definitions";
import { FormState } from "../lib/definitions";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export const signup = async (formState: FormState, formData: FormData) => {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  });

  // If any form fields are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Sign Up
  const { email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const response = await axios.post("/api/register", {
      email,
      password: hashedPassword,
    });

    if (response.status === 201) {
      return { message: "Success" };
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      console.error(error);
    }

    return {
      message: "An account with this email already exists.",
    };
  }
};

export const login = async (formState: FormState, formData: FormData) => {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Login In
  const { email, password } = validatedFields.data;
  const res = await signIn("credentials", {
    email,
    password,
  });

  if (res && !res.error) {
    redirect("/");
  }
};
