import { Product } from "@/models/Product";
import { mongooseConnect } from "./mongoose";
import { getUserByEmail } from "./user";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/config";
import { getCategoryById } from "./category";

export const serializeProduct = (product: Product): Product => ({
  ...product,
  _id: product._id.toString(),
  category: product?.category ? product.category.toString() : null,
  vendor: product.vendor.toString(),
});

interface QueryOptions {
  title?: string;
  description?: string;
  price?: number;
  images?: string[];
  category?: string;
  properties?: {};
  vendor?: string;
}

export const getProducts = async (query: QueryOptions) => {
  try {
    await mongooseConnect();
    if (Object.keys(query).length) {
      const products = await Product.find(query);
      if (!products.length) {
        throw new Error(`Products with query ${Object.keys(query)} not found.`);
      }

      return products;
    }

    const products = await Product.find({}).populate("category");
    if (!products.length) {
      throw new Error("Products not found.");
    }

    return products;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    await mongooseConnect();
    const product: Product | null = await Product.findById(id)
      .select("-createdAt -updatedAt -__v")
      .lean();

    if (!product) {
      throw new Error(`Product with id ${id} not found.`);
    }

    const serializedProduct = serializeProduct(product);

    return serializedProduct;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(`Could not get Product with id ${id}`);
  }
};

export const deleteProductById = async (id: string) => {
  try {
    await mongooseConnect();

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw new Error(`Product with id ${id} not found.`);
    }

    const imageKeys = product.images.map((image: string) =>
      image.split("product-images/").pop()
    );

    for (const key of imageKeys) {
      const response = await axios.delete(`/upload/product/${key}`);
      if (response.status !== 200) {
        throw new Error(`Failed to delete object with key ${key}.`);
      }
    }

    return product;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error("Could not delete product.");
  }
};

export const getProductsByVendor = async (
  email: string
): Promise<Product[]> => {
  try {
    await mongooseConnect();
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error(`User with email ${email} not found.`);
    }

    const products: Product[] = await Product.find({ vendor: user._id })
      .select("-createdAt -updatedAt -__v")
      .lean();
    if (!products.length) {
      throw new Error(`Products for vendor with id ${user._id} not found.`);
    }

    const serializedProducts = products.map(serializeProduct);

    return serializedProducts;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error("Could not get products by vendor.");
  }
};

interface UpdatedProduct {
  title?: string;
  description?: string;
  price?: number;
  images?: string[];
  category?: string | null;
  properties?: any;
}

export const updateProductById = async (
  id: string,
  { title, description, price, images, category, properties }: UpdatedProduct
) => {
  try {
    await mongooseConnect();

    if (!properties) {
      const product = await Product.findOneAndUpdate(
        { _id: id },
        {
          title,
          description,
          price,
          images,
          category,
          $unset: { properties: 1 },
        },
        { new: true }
      );

      if (!product) {
        throw new Error(`Could not update product with id ${id}.`);
      }

      return product;
    }

    const product = await Product.findOneAndUpdate(
      { _id: id },
      { title, description, price, images, category, properties },
      { new: true }
    );

    if (!product) {
      throw new Error(`Could not update product with id ${id}.`);
    }

    return product;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(`Could not update product with id ${id}.`);
  }
};

interface NewProduct {
  title: string;
  description: string;
  price: number;
  images?: string[];
  category: string | null;
  properties?: any;
  vendor: string;
}

export const createNewProduct = async ({
  title,
  description,
  price,
  images,
  category,
  properties,
  vendor,
}: NewProduct) => {
  try {
    await mongooseConnect();

    const product = await Product.create({
      title,
      description,
      price,
      images,
      category,
      properties,
      vendor,
    });

    if (!product) {
      throw new Error("Could not create product.");
    }

    return product;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error("Could not create product.");
  }
};

export const getVendorId = async () => {
  try {
    const session = await getServerSession(authConfig);
    if (!session?.user?.email) {
      throw new Error("Session email not found.");
    }
    const user = await getUserByEmail(session.user.email);
    if (!user) {
      throw new Error("Could not found user.");
    }

    return user._id;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error("Could not get vendor id.");
  }
};

export const createPropertiesObject = async (
  categoryId: string | undefined,
  formData: FormData
) => {
  let properties: any = {};

  if (categoryId) {
    const selectedCategory = await getCategoryById(categoryId);

    selectedCategory.properties.forEach((prop) => {
      const value = formData.get(`property-${prop.name}`);
      properties[prop.name] = value;
    });

    if (
      selectedCategory?.parent &&
      selectedCategory.parent?.properties?.length
    ) {
      selectedCategory.parent.properties.forEach((prop) => {
        const value = formData.get(`property-${prop.name}`);
        properties[prop.name] = value;
      });
    }
  }

  return properties;
};
