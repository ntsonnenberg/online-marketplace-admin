import { getCategories } from "@/actions/categories";
import ProductForm from "@/components/ProductForm";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="mb-10">New Product</h1>
      <ProductForm categoryOptions={categories} />
    </div>
  );
}
