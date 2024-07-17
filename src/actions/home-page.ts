"use server";

import { authConfig } from "@/app/api/auth/[...nextauth]/config";
import { HomePageFormSchema, HomePageFormState } from "@/lib/definitions";
import {
  createNewHomePage,
  getHomePageById,
  getHomePageByVendor,
  updateHomePageById,
} from "@/lib/home-page";
import { getVendorId } from "@/lib/product";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateHomePage = async (
  formState: HomePageFormState,
  formData: FormData
) => {
  // Validate form fields
  const validatedFields = HomePageFormSchema.safeParse({
    about: formData.get("about"),
    mission: formData.get("mission"),
  });

  // If any for fields are invalid
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  // Update Home Page
  const { about, mission } = validatedFields.data;
  const _id = formData.get("_id") || "";
  const featured = formData.getAll("featured") as string[];
  let video = formData.get("company-video") as string;

  if (!video) {
    video = formData.get("youtube-link") as string;
  }

  try {
    await updateHomePageById(_id.toString(), {
      about,
      mission,
      featured,
      video: video || null,
    });
  } catch (error) {
    console.error(error);

    return { message: "Could not update home page." };
  }

  revalidatePath("/home-page");
  redirect("/home-page");
};

export const createHomePage = async (
  formState: HomePageFormState,
  formData: FormData
) => {
  // Validate form fields
  const validatedFields = HomePageFormSchema.safeParse({
    about: formData.get("about"),
    mission: formData.get("mission"),
  });

  // If any for fields are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Create Home Page
  const { about, mission } = validatedFields.data;
  const featured = formData.getAll("featured") as string[];
  let video = formData.get("company-video") as string;

  if (!video) {
    video = formData.get("youtube-link") as string;
  }

  try {
    const vendor = await getVendorId();

    await createNewHomePage({
      about,
      mission,
      featured,
      video: video || null,
      vendor,
    });
  } catch (error) {
    console.error(error);

    return { message: "Could not create Home Page" };
  }

  revalidatePath("/home-page");
  redirect("/home-page");
};

export const getHomePage = async (id?: string) => {
  const session = await getServerSession(authConfig);

  try {
    if (!session?.user?.email) {
      throw new Error("Session email not found");
    }

    if (id) {
      const homePage = await getHomePageById(id);

      return homePage;
    }

    const homePage = await getHomePageByVendor(session.user.email);

    return homePage;
  } catch (error) {
    console.error(error);

    return null;
  }
};
