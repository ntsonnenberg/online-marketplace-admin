import { getCategory, getCategories } from "@/actions/categories";
import CategoryForm from "@/components/CategoryForm";

interface Props {
  params: { id: string };
}

export default async function UpdateCategoryPage({ params }: Props) {
  const category = await getCategory(params.id);
  const parent = category?.parent?._id
    ? { _id: category.parent._id.toString(), name: category.parent.name }
    : null;
  const properties = category?.properties.map(({ name, values }) => ({
    name,
    values,
  }));

  const categories = await getCategories();
  const categoryOptions = categories.map(({ _id, name }) => ({
    _id: _id.toString(),
    name,
  }));

  return (
    <div>
      <h1>Edit Category</h1>
      {category && (
        <CategoryForm
          _id={category._id.toString()}
          name={category.name}
          parent={parent}
          properties={properties}
          categoryOptions={categoryOptions}
        />
      )}
    </div>
  );
}
