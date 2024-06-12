"use server";

import { authConfig } from "@/app/api/auth/[...nextauth]/config";
import {
  createNewCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
} from "@/lib/category";
import { CategoryFormSchema, CategoryFormState } from "@/lib/definitions";
import { getUserByEmail } from "@/lib/user";
import { Category } from "@/models/Category";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateCategory = async (
  formState: CategoryFormState,
  formData: FormData
) => {
  // Validate form fields
  const propertyNames = formData.getAll("property-name");

  const validatedFields = CategoryFormSchema.safeParse({
    name: formData.get("name"),
    properties: propertyNames.map((propName, index) => ({
      name: propName,
      values: formData.getAll(`property-${index}-value`),
    })),
  });

  // If any form fields are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Update Category
  const { name, properties } = validatedFields.data;
  const parent = formData.get("parent")?.toString() || null;
  const _id = formData.get("_id") || "";
  const session = await getServerSession(authConfig);

  try {
    await updateCategoryById(_id.toString(), {
      name,
      parent,
      properties,
    });
  } catch (error) {
    console.error(error);

    return {
      message: "Could not create category.",
    };
  }

  revalidatePath("/categories");
  redirect("/categories");
};

export const createCategory = async (
  formState: CategoryFormState,
  formData: FormData
) => {
  // Validate form fields
  const propertyNames = formData.getAll("property-name");

  const validatedFields = CategoryFormSchema.safeParse({
    name: formData.get("name"),
    properties: propertyNames.map((propName, index) => ({
      name: propName,
      values: formData.getAll(`property-${index}-value`),
    })),
  });

  // If any form fields are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Create Category
  const { name, properties } = validatedFields.data;
  const parent = formData.get("parent")?.toString() || null;

  try {
    await createNewCategory({ name, parent, properties });
  } catch (error) {
    console.error(error);

    return {
      message: "Could not create category.",
    };
  }

  revalidatePath("/categories");
  redirect("/categories");
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const categories = await getAllCategories();

    return categories;
  } catch (error) {
    console.error(error);

    return [];
  }
};

export const getCategory = async (id: string): Promise<Category | null> => {
  const session = await getServerSession(authConfig);

  try {
    if (!session?.user?.email) {
      throw new Error("Session email not found.");
    }
    const category = await getCategoryById(id);

    return category;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const deleteCategory = async (id: string) => {
  const session = await getServerSession(authConfig);

  try {
    if (!session?.user?.email) {
      throw new Error("Session email not found.");
    }

    const category = await deleteCategoryById(id);

    if (!category) {
      throw new Error("Category not deleted.");
    }
  } catch (error) {
    console.error(error);

    return { message: "Could not delete category." };
  }

  revalidatePath("/categories");
  redirect("/categories");
};
