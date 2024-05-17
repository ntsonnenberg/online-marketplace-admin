import { z } from "zod";

export type FormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
        confirm?: string[];
      };
      message?: string;
    }
  | undefined;

export const SignupFormSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[a-zA-Z]/, {
        message: "Password must contain at least one letter.",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number.",
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character.",
      })
      .trim(),
    confirm: z.string(),
  })
  .refine(
    ({ confirm, password }) => {
      return confirm === password;
    },
    { message: "Passwords must match.", path: ["confirm"] }
  );

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[a-zA-Z]/, {
      message: "Password must contain at least one letter.",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number.",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .trim(),
});
