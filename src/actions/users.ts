"use server";

import { authConfig } from "@/app/api/auth/[...nextauth]/config";
import { getServerSession } from "next-auth";
import { getUserByEmail, updateUserById } from "../lib/user";
import { UserFormState, UserFormStateSchema } from "@/lib/definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateUser = async (
  formState: UserFormState,
  formData: FormData
) => {
  // Validate form fields
  const validatedFields = UserFormStateSchema.safeParse({
    name: formData.get("name"),
    phoneNumber: formData.get("phone-number"),
  });

  // If any for fields are invalid
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  // Update User
  const { name, phoneNumber } = validatedFields.data;
  const _id = formData.get("_id") || "";
  const images = formData.getAll("images") as string[];

  try {
    await updateUserById(_id.toString(), {
      name,
      phoneNumber,
      image: images.length ? images[0] : null,
    });
  } catch (error) {
    console.error(error);

    return { message: "Could not update home page." };
  }

  revalidatePath("/account");
  redirect("/account");
};

export const getUser = async () => {
  const session = await getServerSession(authConfig);

  try {
    if (!session?.user?.email) {
      throw new Error("Session email not found");
    }
    const user = await getUserByEmail(session.user.email);

    return user;
  } catch (error) {
    console.error(error);

    return null;
  }
};
