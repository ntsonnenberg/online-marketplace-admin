import { getCategories } from "@/actions/categories";
import CategoryForm from "@/components/CategoryForm";

export default async function NewCategoryPage() {
  const categories = await getCategories();
  const categoryOptions = categories.map(({ _id, name }) => ({
    _id: _id.toString(),
    name,
  }));

  return (
    <div>
      <h1 className="mb-10">New Category</h1>
      <CategoryForm categoryOptions={categoryOptions} />
    </div>
  );
}
