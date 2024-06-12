import { z } from "zod";

export type SignUpFormState =
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

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

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

export type ProductFormState =
  | {
      errors?: {
        title?: string[];
        description?: string[];
        price?: string[];
      };
      message?: string;
    }
  | undefined;

export const ProductFormSchema = z.object({
  title: z.string().min(1, { message: "Product title is required." }),
  description: z
    .string()
    .min(1, { message: "Product description is required." }),
  price: z.number().min(1, { message: "Product price is required." }),
  category: z.string().optional(),
});

export type CategoryFormState =
  | {
      errors?: {
        name?: string[];
        properties?: string[];
      };
      message?: string;
    }
  | undefined;

export const CategoryFormSchema = z.object({
  name: z.string().min(1, { message: "Category name is required." }),
  properties: z.array(
    z.object({
      name: z.string().min(1, { message: "Property name is required." }),
      values: z
        .array(z.string().min(1, { message: "Property values are required." }))
        .nonempty({ message: "Property must have at least one value." }),
    })
  ),
});
