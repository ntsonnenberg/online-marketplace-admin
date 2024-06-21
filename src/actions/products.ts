"use server";

import { authConfig } from "@/app/api/auth/[...nextauth]/config";
import { ProductFormSchema, ProductFormState } from "@/lib/definitions";
import {
  createNewProduct,
  deleteProductById,
  getProductById,
  getProductsByVendor,
  updateProductById,
  getVendorId,
  createPropertiesObject,
} from "@/lib/product";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateProduct = async (
  formState: ProductFormState,
  formData: FormData
) => {
  // Validate form fields
  const validatedFields = ProductFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    category: formData.get("category"),
    properties: formData.get("properties"),
  });

  // If any form fields are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Update Product
  const { title, description, price, category } = validatedFields.data;
  const _id = formData.get("_id") || "";
  const images = formData.getAll("images") as string[];

  let properties = await createPropertiesObject(category, formData);

  if (!Object.keys(properties).length) {
    properties = undefined;
  }

  try {
    await updateProductById(_id.toString(), {
      title,
      description,
      price,
      images,
      category: category || null,
      properties,
    });
  } catch (error) {
    console.error(error);

    return {
      message: "Could not update product.",
    };
  }

  revalidatePath("/products");
  redirect("/products");
};

export const createProduct = async (
  formState: ProductFormState,
  formData: FormData
) => {
  // Validate form fields
  const validatedFields = ProductFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    category: formData.get("category"),
  });

  // If any form fields are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Create Product
  const { title, description, price, category } = validatedFields.data;
  const images = formData.getAll("images") as string[];

  let properties = await createPropertiesObject(category, formData);

  if (!Object.keys(properties).length) {
    properties = undefined;
  }

  try {
    const vendor = await getVendorId();

    await createNewProduct({
      title,
      description,
      price,
      images,
      category: category || null,
      properties,
      vendor,
    });
  } catch (error) {
    console.error(error);

    return {
      message: "Could not create product.",
    };
  }

  revalidatePath("/products");
  redirect("/products");
};

export const getProducts = async (): Promise<Product[]> => {
  const session = await getServerSession(authConfig);

  try {
    if (!session?.user?.email) {
      throw new Error("Session email not found");
    }
    const products = await getProductsByVendor(session.user.email);

    return products;
  } catch (error) {
    console.error(error);

    return [];
  }
};

export const getProduct = async (id: string): Promise<Product | null> => {
  const session = await getServerSession(authConfig);

  try {
    if (!session?.user?.email) {
      throw new Error("Session email not found");
    }
    const product = await getProductById(id);

    return product;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const deleteProduct = async (id: string) => {
  const session = await getServerSession(authConfig);

  try {
    if (!session?.user?.email) {
      throw new Error("Session email not found.");
    }

    const product = await deleteProductById(id);

    if (!product) {
      throw new Error("Product not deleted.");
    }
  } catch (error) {
    console.error(error);

    return { message: "Could not delete product." };
  }

  revalidatePath("/products");
  redirect("/products");
};
