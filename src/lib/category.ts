import { Category } from "@/models/Category";
import { mongooseConnect } from "./mongoose";

const serializeCategory = (category: Category): Category => ({
  ...category,
  _id: category._id.toString(),
  parent: category.parent
    ? {
        ...category.parent,
        _id: category.parent._id.toString(),
        properties: category?.parent?.properties
          ? category.parent.properties.map((prop) => ({
              ...prop,
              _id: prop._id.toString(),
            }))
          : null,
      }
    : null,
  properties: category.properties.map((prop) => ({
    ...prop,
    _id: prop._id.toString(),
  })),
});

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    await mongooseConnect();

    const categories: Category[] = await Category.find({})
      .select("-createdAt -updatedAt -__v")
      .populate({ path: "parent", select: "_id name properties" })
      .lean();

    if (!categories.length) {
      throw new Error("No categories found.");
    }

    const serializedCategories = categories.map(serializeCategory);

    return serializedCategories;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error("Could not get categories by vendor.");
  }
};

export const getCategoryById = async (id: string) => {
  try {
    await mongooseConnect();
    const category: Category | null = await Category.findById(id)
      .select("-createdAt -updatedAt -__v")
      .populate({ path: "parent", select: "_id name properties" })
      .lean();

    if (!category) {
      throw new Error(`Category with id ${id} not found.`);
    }

    const serializedCategory = serializeCategory(category);

    return serializedCategory;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(`Could not get category wiht id ${id}.`);
  }
};

export const deleteCategoryById = async (id: string) => {
  try {
    await mongooseConnect();

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      throw new Error(`Category with id ${id} not found.`);
    }

    return category;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(`Could not delete category with id ${id}.`);
  }
};

interface UpdatedCategory {
  name?: string;
  parent?: string | null;
  properties?: {
    name: string;
    values: string[];
  }[];
}

export const updateCategoryById = async (
  id: string,
  { name, parent, properties }: UpdatedCategory
) => {
  try {
    await mongooseConnect();

    const category = await Category.findOneAndUpdate(
      { _id: id },
      { name, parent, properties },
      { new: true }
    );

    if (!category) {
      throw new Error(`Could not update category with id ${id}.`);
    }

    return category;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(`Could not update category with id ${id}.`);
  }
};

interface NewProduct {
  name: string;
  parent: string | null;
  properties: {
    name: string;
    values: string[];
  }[];
}

export const createNewCategory = async ({
  name,
  parent,
  properties,
}: NewProduct) => {
  try {
    await mongooseConnect();

    const category = await Category.create({
      name,
      parent,
      properties,
    });

    if (!category) {
      throw new Error("Could not create category.");
    }

    return category;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error("Could not create category.");
  }
};
